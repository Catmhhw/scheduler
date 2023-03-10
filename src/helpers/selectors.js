export function getAppointmentsForDay(state, day) {
    //finds object in state.days where the name matches the provided day (acesses specific days appointment array)
    const filteredDays = state.days.find(days => days.name === day);
    if (!filteredDays) {
        return [];
    }
    const appointmentArray = filteredDays.appointments.map(id => state.appointments[id]);
    return appointmentArray
  }

export function getInterview(state, interview) {
    if (!interview) {
        return null;
    }
    const interviewer = state.interviewers[interview.interviewer];
    return {...interview, interviewer};
}

export function getInterviewersForDay(state, day) {
    const filteredDays = state.days.find(days => days.name === day);
    if (!filteredDays) {
        return [];
    }
    const appointmentArray = filteredDays.interviewers.map(id => state.interviewers[id]);
    return appointmentArray
}