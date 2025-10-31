import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
});

export const listApi = {
    async getAll() {
        const { data } = await api.get('/lists');
        return data;
    },
    async create(payload) {
        const { data } = await api.post('/lists', payload);
        return data;
    },
    async getById(id) {
        const { data } = await api.get(`/lists/${id}`);
        return data;
    },
};

export const taskApi = {
    async getByList(listId) {
        const { data } = await api.get(`/lists/${listId}/tasks`);
        return data;
    },
    async create(listId, payload) {
        const { data } = await api.post(`/lists/${listId}/tasks`, payload);
        return data;
    },
    async update(id, payload) {
        const { data } = await api.patch(`/tasks/${id}`, payload);
        return data;
    },
};

export default api;


