import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Yes from "./Yes";
import No from "./No";
import Umixo from "./Umixo";

function App() {
	return (
		<Router basename="/">
			<Routes>
				<Route path="/" element={<Umixo />} />
				<Route path="/yes" element={<Yes interactive={true} />} />
				<Route path="/no" element={<No interactive={true} />} />
			</Routes>
		</Router>
	);
}

export default App;
