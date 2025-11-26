import { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login/Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import Lobby from "./Lobby/Lobby";
import Logout from "./Login/Logined";
import Draw from "./Draw/Draw";


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
				<Route path="/draw" element={<Draw/>} />
				<Route path="/room/:roomId" element={<Draw/>} />
			</Routes>
		</>
	);
}

export const DrawContext = createContext(null);
export default App;
