import React from "react";
import "./App.css";
import useWebSocket from "react-use-websocket";

function Yes() {
	const { sendMessage } = useWebSocket("ws://192.46.211.58:60001/");
	const handleClick = () => {
		// empty click handler
		sendMessage("OPTIONA");
	};

	return <button onClick={handleClick}>Yes</button>;
}

export default Yes;
