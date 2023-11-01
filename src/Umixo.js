import React from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";

function Umixo() {
	const questions = [
		{
			groupName: "Childhood",
			ageGroup: "0-8",
			optionA: "Play",
			optionB: "Study",
			optionAWeight: {
				ss: 3,
				ps: 7,
			},
			optionBWeight: {
				ss: 8,
				ps: 2,
			},
		},
		{
			groupName: "Adolescence",
			ageGroup: "9-12",
			optionA: "Peer Approval",
			optionB: "Self Growth",
			optionAWeight: {
				ss: 3,
				ps: 7,
			},
			optionBWeight: {
				ss: 8,
				ps: 2,
			},
		},
		{
			groupName: "Teenage",
			ageGroup: "13-19",
			optionA: "Freedom",
			optionB: "Responsibility",
			optionAWeight: {
				ss: 3,
				ps: 7,
			},
			optionBWeight: {
				ss: 8,
				ps: 2,
			},
		},
		{
			groupName: "Bachelor",
			ageGroup: "20-29",
			optionA: "Follow Aspirations",
			optionB: "Get Married",
			optionAWeight: {
				ss: 3,
				ps: 7,
			},
			optionBWeight: {
				ss: 8,
				ps: 2,
			},
		},
		{
			groupName: "Late Adulthood",
			ageGroup: "30-60",
			optionA: "Support Family",
			optionB: "Fulfill self Aspirations",
			optionAWeight: {
				ss: 3,
				ps: 7,
			},
			optionBWeight: {
				ss: 8,
				ps: 2,
			},
		},
		{
			groupName: "Old Age",
			ageGroup: "61-☠️",
			optionA: "Save for your child",
			optionB: "Complete your bucketlist",
			optionAWeight: {
				ss: 3,
				ps: 7,
			},
			optionBWeight: {
				ss: 8,
				ps: 2,
			},
		},
	];
	const { lastMessage } = useWebSocket(
		"wss://192.46.211.58:60001/"
	);

	const [ssps, setSSPS] = React.useState(-1);

	const [currentCount, setCurrentCount] = React.useState(0);

	const handleChangeQuestion = () => {
		if (currentCount === questions.length - 1) {
			setCurrentCount(-1);
			setSSPS(-1);
		} else {
			setCurrentCount((prvCount) => prvCount + 1);
		}
	};
	const handleQuestionAnswered = (firstOptionChosen = false) => {
		const { optionAWeight, optionBWeight } = questions?.[currentCount] ?? {};
		let currentSocialWeight = ssps === -1 ? 0.5 : ssps;
		const currentSelected = firstOptionChosen ? optionAWeight : optionBWeight;
		currentSocialWeight =
			(currentSocialWeight * 10 + currentSelected.ss) /
			((currentCount + 1) * 1.0);
		setSSPS(currentSocialWeight / 10.0);
		handleChangeQuestion();
	};

	React.useEffect(() => {
		if (lastMessage != null) {
			const response = JSON.parse(lastMessage.data);
			const { success, msg } = response ?? {};
			if (success && msg === "OPTIONA" && currentCount >= 0) {
				handleQuestionAnswered(true);
			} else if (success && msg === "OPTIONB" && currentCount >= 0) {
				handleQuestionAnswered();
			}
		}
	}, [lastMessage]);
	return (
		<div className="root">
			<div className="questionContainer">
				<h1>{questions[currentCount]?.groupName}</h1>
				<h1>{questions[currentCount]?.ageGroup}</h1>
				<h2>A: {questions[currentCount]?.optionA}</h2>
				<h2>B: {questions[currentCount]?.optionB}</h2>
			</div>
			<div className="scoreSlider">
				<h1>{ssps}</h1>
			</div>
		</div>
	);
}

export default Umixo;
