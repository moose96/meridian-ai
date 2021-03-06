import api from '../api';

export const getSets = async () => await api.get('sets');
export const getSet = async (id) => await api.get(`sets/${id}`);