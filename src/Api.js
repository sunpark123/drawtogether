import axios from 'axios';
import pako from 'pako';


const API_BASE_URL = 'http://localhost:1112/'; 
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  
});

export const GET_SERVER_URL = () => {
	return API_BASE_URL;
}

export const userSessionCheck = async () => {
    try {
        const response = await api.get('/userSessionCheck');
        const data = response.data;
		return { 
			success: data.success, 
			userId: data.userId 
		};
        
		
    } catch (error) {
        return { success: false };
    }
};

export const userLogout = async () => {
    try {
        await api.get('/userLogout');
		return { 
			success: true
		};
		
    } catch (error) {
        return { success: false };
    }
};

export const userLogin = async ( userId, userPassword ) => {
	try {
		await api.post('/login', {
			userId: userId,
			userPassword: userPassword
		});
		return { success: true }
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};
export const userRegister = async ( userId, userPassword, userName ) => {
	try {
		await api.post('/register', {
			userId: userId,
			userPassword: userPassword,
			userName: userName
		});
		return { success: true }
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};

export const saveDrawImage = async ( drawImg, drawNumber ) => {
	try {
		const res = await fetch(drawImg);
        const blob = await res.blob();
		const formData = new FormData();

		formData.append("drawImage", blob);
		formData.append("drawNumber", drawNumber);

		await api.post("/saveDrawImage", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

		return { success: true }

	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};
export const saveDrawHistory = async ( drawHistory, drawNumber ) => {
	try {
		const jsonStr = JSON.stringify(drawHistory);
		const compressed = pako.gzip(jsonStr);

		const compressedBase64 = btoa(String.fromCharCode(...compressed));
		
		await api.post('/saveHistory', {
			drawHistory: compressedBase64,
			drawNumber: drawNumber,
		});
		return { success: true }
		
	} catch (error) {
		console.log(error.message);
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};
export const getDrawHistory = async ( userId ) => {
	try {
		const result = await api.get('/getHistory', {
			params: { userId }
		});

		const binarys = atob(result.data.drawHistory);
		const compresseds = new Uint8Array(binarys.split("").map(c => c.charCodeAt(0)));

		const jsonStrs = pako.ungzip(compresseds, { to: "string" });
		const data = JSON.parse(jsonStrs);
		return { 
			success: true,
			drawHistory: data
		}
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};
export const getAllDraw = async ( userId ) => {
	try {
		const result = await api.get('/getAllHistory', {
			params: { userId }
		});
		return { 
			success: true,
			allDraw: result.data
		}
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};

export const saveUserProfileImage = async ( profileImage ) => {
	try {
		const res = await fetch(profileImage);
        const blob = await res.blob();
		const formData = new FormData();

		formData.append("userImage", blob);

		await api.post("/saveUserProfileImage", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
		return { success: true }
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};

export const getUserProfileImage = async ( userId ) => {
	try {
		const result = await api.get('/getUserProfileImage', {
			params: { userId }
		});
		
		return { 
			success: true,
			userProfileImage: result.data
		}
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};


export const getUserName = async ( userId ) => {
	try {
		const result = await api.get('/getUserName', {
			params: { userId }
		});
		
		return { 
			success: true,
			userName: result.data
		}
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};

export const changeUserName = async (userName ) => {
	try {
		await api.post('/changeUserName', {
			userName: userName
		});
		
		return { 
			success: true,
		}
		
	} catch (error) {
		return {
			success: false,
			error: error.response?.data || error.message
		}
	}
};