import React from "react";
import "./App.css";
import useWebSocket from "react-use-websocket";

function Yes() {
	const { sendMessage } = useWebSocket("ws://172.20.10.10:60001/");
	const handleClick = (a) => {
		// empty click handler
		if (a === 1) sendMessage("OPTIONB");
		else sendMessage("OPTIONA");
	};

	return (
		<div className="yesNoButtonContainer">
			<div
				onTouchStart={() => {
					handleClick(0);
				}}
			>
				<div className="button">
					<a>Option A</a>
				</div>
			</div>
			<div
				onTouchStart={() => {
					handleClick(1);
				}}
			>
				<div className="button">
					<a>Option B</a>
				</div>
			</div>
		</div>
	);
}

export default Yes;
