import axios from 'axios';
import pako from 'pako';


const API_BASE_URL = 'http://localhost:1111/'; 
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  
});

export const userSessionCheck = async () => {
    try{
        const response = await api.get('/userSessionCheck');
        
        return {
            success: true,
            userId: response.data
        }
		
    } catch (error) {
        return {success: false}
    }
    
}


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

export const saveDrawHistory = async ( userId, drawHistory ) => {
	try {
		const jsonStr = JSON.stringify(drawHistory);
		const compressed = pako.gzip(jsonStr);

		const compressedBase64 = btoa(String.fromCharCode(...compressed));
		
		await api.post('/saveHistory', {
			userId: userId,
			drawHistory: compressedBase64,
		});
		return { success: true }
		
	} catch (error) {
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


// 불러와서 압축 해제 