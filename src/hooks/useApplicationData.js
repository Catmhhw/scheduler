import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: []
	});

	const setDay = day => setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
			axios.get('/api/interviewers')
		]).then((all) => {
			setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
		})
	}, [])


	// Where is the value of "spots" stored for each day?
	// 		state.days
	// How can we calculate how many spots should be available?
	//		the number of appointments that are null
	// When should that value change?
	// 		when you book or cancel an interview

	function spotsRemaining(id, available) {
		state.days.forEach((day) => {
			if (day.appointments.includes(id)) {
				if (available) {
					day.spots += 1;
				} else {
					day.spots -= 1;
				}
			}
		})
	}


	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};

		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		return axios.put(`/api/appointments/${id}`, { interview })
			.then(() => {
				spotsRemaining(id, false)
				setState({ ...state, appointments });
			})
			
	}


	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null
		};

		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		return axios.delete(`/api/appointments/${id}`)
		.then(() => {
			spotsRemaining(id, true)
			setState({ ...state, appointments })
		})
	}

	return { state, setDay, bookInterview, cancelInterview }
}

