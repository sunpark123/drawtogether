import axios from 'axios';

const API_BASE_URL = 'http://localhost:1111/'; 
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  
});

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
			body: error
		}
	}
};