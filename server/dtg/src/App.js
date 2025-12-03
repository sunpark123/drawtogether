import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Lobby from "./Lobby/Lobby";
import Login from "./Login/Login";
import Register from "./Login/Register"
import { saveDrawHistory, userSessionCheck, getUserName } from "./Api";
import Profile from "./Profile/Profile";
import Room from "./Room/Room";


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
		console.log(loc);
		setLocate(loc);
	};
	const moveLocateWithOutMoveLocate = (loc) => {
		setLocate(loc);
	};

	const [tool, setTool] = useState("pen");
	const [size, setSize] = useState(5);
	const [color, setColor] = useState("#000000");

	const [needHistory, setNeedHistory] = useState(false);
	const [loadHistroy, setLoadHistroy] = useState(false);
	const [resetHistroy, setResetHistroy] = useState(false);

	const [userId, setUserId] = useState(null);
	const [userName, setUserName] = useState(null);


	const getUserId = () => {
		if(userId === null){
			(async () => {
				const { success, userId } = await userSessionCheck();
				if (success) {
					setUserId(userId);
					return userId;
				}
			})();
		}
		else{
			return userId;
		}
	}
	const getUserNames = () => {
		if(userName === null){
			(async () => {
				const { success, userName } = await getUserName(getUserId());
				if (success) {
					setUserName(userName);
					return userName;
				}
			})();
		}
		else{
			return userName;
		}
	}
	useEffect(() => getUserNames())
	const saveHistory = (his) => {
		saveDrawHistory(getUserId(), his);
		setNeedHistory(false);
	}

	const saveHistoryRequest = () => {
		setNeedHistory(true);
	}

	const resetHistoryRequest = () => {
		setResetHistroy(true);
	}
	const resetedHistory = () => {
		setResetHistroy(false);
	}
	const loadHistoryRequest = () => {
		setLoadHistroy(true);
	}
	const loadedHistory = () => {
		setLoadHistroy(false);
	}

	return (
		<>
			<Header 
				userId={getUserId()}
				locate={locate} 
				moveLocate={moveLocate} 
				tool={tool}
				setTool={setTool} 
				size={size} 
				setSize={setSize}
				color={color}
				setColor={setColor}
				saveHistoryRequest={saveHistoryRequest}
				resetHistoryRequest={resetHistoryRequest}
				loadHistoryRequest={loadHistoryRequest}
			/>
			<DrawContext.Provider value={{ tool, size, color: color.hex ?? "#000000", saveHistory, needHistory, userId, loadHistroy, loadedHistory, resetHistroy, resetedHistory, userName }}>
				<Routes>
					<Route path="*" element={<Lobby locate={locate}/>} />
					<Route path="/lobby" element={<Lobby locate={locate}/>} />
					<Route path="/draw" element={<Lobby/>} />
					<Route path="/login" element={<Login moveLocate={moveLocate}/>}/>
					<Route path="/register" element={<Register moveLocate={moveLocate}/>}/>
					<Route path="/profile" element={<Profile moveLocate={moveLocate}/>}/>
					<Route path="/room/:roomId" element={<Room moveLocate={moveLocateWithOutMoveLocate}/>}/>
				</Routes>
			</DrawContext.Provider>

		</>
	);
}

export const DrawContext = createContext(null);
export default App;
