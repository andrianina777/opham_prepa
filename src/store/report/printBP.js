import { defineStore } from 'pinia';
import axios from 'axios';
import Config  from "@/utils/config.js";
// const api = axios.create({
//   baseURL: 'http://localhost:3000', // Remplacez par l'URL de votre API
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
export const useReportBPStore = defineStore('report', {
  state: () => ({
    reportBytes: null,
  }),
  actions: {
    async generateReport(codeBP, isDouble) {
      try {
        const response = await axios.get(Config.SERVER_URL + 'api/printPrepa', {
          params: {
            codeBP,
            isDouble,
          },
          responseType: 'arraybuffer',
        });
        return response;
       // this.reportBytes = response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to generate report.');
      }
    },
  },
});
