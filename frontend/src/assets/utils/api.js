import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await api.post('/register', { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logout = async () => {
    try {
        const response = await api.get('/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};