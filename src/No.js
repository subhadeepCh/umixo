import React from "react";
import "./App.css";
import useWebSocket from "react-use-websocket";

function No() {
	const { sendMessage } = useWebSocket("wss://192.46.211.58:60001/");
	const handleClick = () => {
		// empty click handler
		sendMessage("OPTIONB");
	};

	return <button onClick={handleClick}>NO</button>;
}

export default No;
