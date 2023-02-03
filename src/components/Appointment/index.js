import React from "react";
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);
		props.bookInterview(props.id, interview)
			.then(() => transition(SHOW));
	}

	function onDelete() {
		transition(DELETE);
		props.cancelInterview(props.id)
			.then(() => transition(EMPTY));
	}

	function confirm() {
		transition(CONFIRM);
	}

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY &&
				<Empty
					onAdd={() => transition(CREATE)}
				/>}
			{mode === CREATE &&
				<Form
					interviewers={props.interviewers}
					onCancel={back}
					onSave={save}
				/>}
			{mode === SHOW &&
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onDelete={() => transition(CONFIRM)}
				/>}
			{mode === SAVING &&
				<Status
					message="Saving"
				/>}
			{mode === DELETE &&
				<Status
					message="Deleting"
				/>}
			{mode === CONFIRM &&
				<Confirm
					onCancel={back}
					onConfirm={onDelete}
				/>}

		</article>
	);
}