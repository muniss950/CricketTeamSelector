import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your Flask server URL

export const getTeams = () => axios.get(`${API_URL}/teams`);
export const getPlayers = () => axios.get(`${API_URL}/players`);
export const getMatches = () => axios.get(`${API_URL}/matches`);
export const getTournaments = () => axios.get(`${API_URL}/tournaments`);

