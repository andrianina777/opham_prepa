import { defineStore } from 'pinia'
import Config  from "@/utils/config.js"
import axios from "axios"
export const useDetailPrepStore = defineStore("detailPrep", {
  state: () => ({
    detailPreps: [],
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
    async fetchDetailPrep() {
      this.loading = true
      try {
        const data = await axios.get(Config.SERVER_URL + 'api/listDetailPrepa',{ params: this.params })
        this.detailPreps = data.data
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
//export const piniaPlugin = createPiniaPlugin()