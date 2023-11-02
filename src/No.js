import React from "react";
import "./App.css";
import useWebSocket from "react-use-websocket";

function No() {
	const { sendMessage } = useWebSocket("ws://172.20.10.10:60001/");
	const handleClick = () => {
		// empty click handler
		sendMessage("OPTIONB");
	};

	return <button onClick={handleClick}>NO</button>;
}

export default No;
