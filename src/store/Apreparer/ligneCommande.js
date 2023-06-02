import { defineStore } from 'pinia'
import Config  from "@/utils/config.js"
import axios from "axios"
export const useLigneCommandeStore = defineStore("ligneCommande", {
  state: () => ({
    ligneCommandes: [],
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
    async fetchLigneCommande() {
      this.loading = true
      try {
        const data = await axios.get(Config.SERVER_URL +'api/lignecmd',{ params: this.params })
        this.ligneCommandes = data.data
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