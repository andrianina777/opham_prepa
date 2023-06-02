import { defineStore } from 'pinia'
import Config  from "@/utils/config.js"
import axios from "axios"
export const useEtapeStore = defineStore("etape", {
  state: () => ({
    etapes: [],
    loading: false,
    params:{
      code:'',
    },
  }),

  actions: {
    async fetchEtape() {
      this.loading = true
      try {
        const data = await axios.get(Config.SERVER_URL + 'api/etape')
        this.etapes = data.data
        this.loading = false
      }
      catch (error) {
        alert(error)
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    setCode(code) {
      this.params.code = code;
    },
  },
 
})