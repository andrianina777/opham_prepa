import { defineStore } from 'pinia'
import Config  from "@/utils/config.js"
import axios from "axios"
export const useCommandeStore = defineStore("commande", {
  state: () => ({
    commandes: [],
    loading: false,
    params:{
      groupe:'',
      dateliv:null,
    },
  }),
  // getters: {
  //   getCommande(state) {
  //     return state.commandes
  //   }
  // },
  actions: {
    async fetchCommande() {
      this.loading = true
      try {
        const data = await axios.get(Config.SERVER_URL+ 'api/prep',{ params: this.params })
        this.commandes = data.data
        this.loading = false
      }
      catch (error) {
        alert(error)
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // setGroupe(groupe) {
    //   this.params.groupe = groupe;
    // },
    // setDateliv(dateliv) {
    //   this.params.dateliv = dateliv;
    // }
  },
 
})
//export const piniaPlugin = createPiniaPlugin()