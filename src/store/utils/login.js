import { defineStore } from 'pinia'
import Config from "@/utils/config.js"
import axios from "axios"
export const useAuthStore = defineStore('login', {
    state: () => ({
        username: '',
        password: ''
    }),
    actions: {
        async login() {
            const credentials = {
                username: this.username,
                password: this.password
            };
            return await axios.post(Config.SERVER_URL + 'api/login', credentials, { withCredentials: true });
        }
    }
});