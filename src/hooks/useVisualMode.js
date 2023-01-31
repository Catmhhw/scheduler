import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	//takes in a new mode and updates the mode state with a new value
	function transition(newMode, replace = false) {
		if (!replace) {
			setHistory((prev) => [...prev, newMode])
		}
		setMode(newMode)
	}


	function back() {
		//history array length > 1 -does not allow user to go past initial mode
		if (history.length > 1) {
			history.pop()
			setMode(history[history.length - 1])
		}
	}

	return { mode, transition, back };
}