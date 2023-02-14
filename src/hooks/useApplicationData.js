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

  const updateSpots = (newAppointments ) => {
    let results = []
      state.days.forEach((day) => {
        let freeSpots = 0
        for (let appointmentID of day.appointments ) {
          if (newAppointments[appointmentID].interview === null){
            freeSpots ++
          }
        }
        results.push({...day, spots: freeSpots})
        // console.log("DAY", day)
      });
      return results;
  };


	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};

		const appointments = {
			...state.appointments,
			[id]: appointment
		};
    let days = updateSpots(appointments)
		return axios.put(`/api/appointments/${id}`, { interview })

			.then(() => {
				setState({ ...state, appointments, days });
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
    let days = updateSpots(appointments)
		return axios.delete(`/api/appointments/${id}`)
		.then(() => {
			setState({ ...state, appointments, days })
		})
	}

	return { state, setDay, bookInterview, cancelInterview }
}

