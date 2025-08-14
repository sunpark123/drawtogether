import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Lobby from "./Lobby/Lobby";

function App() {
  return (
		<Router>
			<AppContent />
		</Router>
	);
}

// 여기서 useNavigate를 사용
function AppContent() {
	const navigate = useNavigate();
	const [locate, setLocate] = useState("lobby");

	const moveLocate = (loc) => {
		navigate("/" + loc);
		setLocate(loc);
	};

	return (
		<>
			<Header locate={locate} moveLocate={moveLocate} />

			<Routes>
				<Route path="*" element={<Lobby locate={locate}/>} />
				<Route path="/draw" element={<Lobby />} />
			</Routes>
		</>
	);
}

export default App;
