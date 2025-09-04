import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Lobby from "./Lobby/Lobby";
import Login from "./Login/Login";
import Register from "./Login/Register"
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

	const [tool, setTool] = useState("pen");
	const [size, setSize] = useState(5);
	const [color, setColor] = useState("#000000");


	return (
		<>
			<Header 
				locate={locate} 
				moveLocate={moveLocate} 
				tool={tool}
				setTool={setTool} 
				size={size} 
				setSize={setSize}
				color={color}
				setColor={setColor}
			/>

			<Routes>
				<Route path="*" element={<Lobby locate={locate}/>} />
				<Route path="/draw" element={<Lobby tool={tool} size={size} color={color.hex}/>} />
				<Route path="/login" element={<Login moveLocate={moveLocate}/>}/>
				<Route path="/register" element={<Register moveLocate={moveLocate}/>}/>
			</Routes>
		</>
	);
}

export default App;
