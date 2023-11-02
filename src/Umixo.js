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
				ss: 2,
				ps: 8,
			},
			optionBWeight: {
				ss: 7,
				ps: 3,
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
				ss: 6,
				ps: 4,
			},
		},
		{
			groupName: "Teenage",
			ageGroup: "13-19",
			optionA: "Freedom",
			optionB: "Responsibility",
			optionAWeight: {
				ss: 1,
				ps: 9,
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
				ss: 1,
				ps: 9,
			},
			optionBWeight: {
				ss: 7,
				ps: 3,
			},
		},
		{
			groupName: "Late Adulthood",
			ageGroup: "30-60",
			optionA: "Support Family",
			optionB: "Fulfill Self Goals",
			optionAWeight: {
				ss: 7,
				ps: 3,
			},
			optionBWeight: {
				ss: 2,
				ps: 8,
			},
		},
		{
			groupName: "Old Age",
			ageGroup: "61-☠️",
			optionA: "Save for your Child",
			optionB: "Complete your Bucketlist",
			optionAWeight: {
				ss: 7,
				ps: 3,
			},
			optionBWeight: {
				ss: 1,
				ps: 9,
			},
		},
	];
	const { lastMessage } = useWebSocket("ws://172.20.10.10:60001/");

	const [transformMithun, setTransformMithun] = React.useState(false);

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setTransformMithun((prev) => !prev);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const [ssps, setSSPS] = React.useState(0);

	const [currentCount, setCurrentCount] = React.useState(-1);

	const [gameEnd, setGameEnd] = React.useState(false);

	const handleChangeQuestion = () => {
		if (currentCount === questions.length - 1) {
			setGameEnd(true);
		} else {
			setCurrentCount((prvCount) => prvCount + 1);
		}
	};
	const handleQuestionAnswered = (firstOptionChosen = false) => {
		const { optionAWeight, optionBWeight } = questions?.[currentCount] ?? {};
		let currentSocialWeight = ssps;
		const currentSelected = firstOptionChosen ? optionAWeight : optionBWeight;
		currentSocialWeight = currentSocialWeight + currentSelected.ss;
		if (gameEnd) {
			setGameEnd(false);
			setSSPS(0);
			setCurrentCount(-1);
		} else {
			setSSPS(currentSocialWeight);
			handleChangeQuestion();
		}
	};

	React.useEffect(() => {
		if (lastMessage != null) {
			const response = JSON.parse(lastMessage.data);
			const { success, msg } = response ?? {};
			if (success && msg === "OPTIONA" && currentCount >= 0) {
				handleQuestionAnswered(true);
			} else if (success && msg === "OPTIONB" && currentCount >= 0) {
				handleQuestionAnswered();
			} else if (success && (msg === "OPTIONB" || msg === "OPTIONA")) {
				setCurrentCount(0);
			}
		}
	}, [lastMessage]);

	const finalScore = 100 - (ssps / currentCount) * 10;
	return (
		<div className="root">
			<div className="filler" />
			{currentCount !== -1 ? (
				<>
					<div className="sliderContainer">
						<div className="SSC">Social Satisfaction</div>
						<div className="slider">
							<div
								className="mithun"
								style={
									transformMithun
										? {
												transform: "scaleX(-1)",
												left: `${
													ssps === 0 ? "50" : 100 - (ssps / currentCount) * 10
												}%`,
										  }
										: {
												left: `${
													ssps === 0 ? "50" : 100 - (ssps / currentCount) * 10
												}%`,
										  }
								}
							/>
						</div>
						<div className="PSC">Personal Satisfaction</div>
					</div>
					<div className="filler" />
					<div className="optionContainer">
						{!gameEnd ? (
							<>
								<div className="AgeGroup">
									{questions[currentCount].groupName}
								</div>
								<div className="Options">
									<div
										className="OptionA"
										onClick={() => handleQuestionAnswered(true)}
									>
										{questions[currentCount].optionA}
									</div>
									<div
										className="OptionB"
										onClick={() => {
											handleQuestionAnswered();
										}}
									>
										{questions[currentCount].optionB}
									</div>
								</div>
							</>
						) : (
							<div className="endgameScreen">
								<div className="mithunDP" />
								<div className="textInputs">{`The SSPS Score is ${
									100 - (ssps / currentCount) * 10
								}. This means that ${
									finalScore > 70
										? "Mithun strongly believes in his personal satisfaction"
										: finalScore > 40
										? "Mithun keeps a balance between his personal and social satisfaction"
										: "Mithun likes to stick with the tried and tested methods of society"
								}`}</div>
							</div>
						)}
					</div>
				</>
			) : (
				<>
					<div className="filler" />
					<div className="filler" />
					<div className="landingPage">
						<div className="mithunDP1" />
						<div className="textInputs">
							Lets Start 
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Umixo;
