import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3333', // switch localhost to you IP. example: 123.456.7.891
});
