import { defineStore } from 'pinia'
import Config  from "@/utils/config.js"
import axios from "axios"
export const useInfoCmdStore = defineStore("infoCmd", {
  state: () => ({
    infoCmds: [],
    loading: false,
    params:{
      code:'',
    },
  }),
  // getters: {
  //   getCommande(state) {
  //     return state.commandes
  //   }
  // },
  actions: {
    async fetchInfoCommande() {
      this.loading = true
      try {
        const data = await axios.get(Config.SERVER_URL + 'api/infoCmd',{ params: this.params })
        this.infoCmds = data.data
        this.loading = false
      }
      catch (error) {
        alert(error)
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async updateInfoCommande(infCmd) {
      const response = await axios.patch(Config.SERVER_URL +'api/updateInfoCmd', infCmd);
      this.data = response.data;
    },
    setCode(code) {
      this.params.code = code;
    },
  },
 
})
//export const piniaPlugin = createPiniaPlugin()