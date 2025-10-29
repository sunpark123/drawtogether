import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from "./Login/Login";
import Register from "./Register/Register";
import Logined from "./Login/Logined";
import Lobby from "./Lobby/Lobby";
import Canvas from "./Canvas/Canvas";


function App() {
	
  return (
		<Router>
			<AppContent />
		</Router>
	);
}

function AppContent() {
	
	const [userId, setUserId] = useState(null);

	

	

	const setUserIdRequest = (userId) => {
		setUserId(userId);
	}
	return (
		<>	
			{/* 헤더 */}
			<DrawContext.Provider value={{ userId }}>
				<Routes>
					<Route path="/" element={<Login />} />
  					<Route path="/login" element={<Login />} />
  					<Route path="/register" element={<Register />} />
					<Route path="/logined" element={<Logined setUserIdRequest={setUserIdRequest}/>} />
					<Route path="/lobby" element={<Lobby/>} />
				</Routes>
			</DrawContext.Provider>

		</>
	);
}

export const DrawContext = createContext(null);
export default App;
