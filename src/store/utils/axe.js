import { defineStore } from 'pinia'
import Config  from "@/utils/config.js"
import axios from "axios"
export const useAxeStore = defineStore("axe", {
  state: () => ({
    axes: [],
    loading: false,
  }),
  getters: {
    getAxes(state) {
      return state.axes
    }
  },
  actions: {
    async fetchAxe() {
      this.loading = true
      try {
        const data = await axios.get(Config.SERVER_URL + 'api/axe')
        this.axes = data.data
        this.loading = false
      }
      catch (error) {
        alert(error)
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
 
})
//export const piniaPlugin = createPiniaPlugin()