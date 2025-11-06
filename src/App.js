import { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login/Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import Lobby from "./Lobby/Lobby";
import Logout from "./Login/Logined";


function App() {
	
  return (
		<Router>
			<AppContent />
		</Router>
	);
}

function AppContent() {
	return (
		<>	
			{/* 헤더 */}
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/lobby" element={<Lobby/>} />
			</Routes>
		</>
	);
}

export const DrawContext = createContext(null);
export default App;
