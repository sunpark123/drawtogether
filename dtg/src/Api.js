import axios from 'axios';

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