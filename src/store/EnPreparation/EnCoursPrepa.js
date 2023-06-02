import { defineStore } from 'pinia'
import Config from "@/utils/config.js"
import axios from "axios"
export const useEnCoursCmdStore = defineStore("encoursCmd", {
    state: () => ({
        encoursCmds: [],
        loading: false,
        params:{
          prepspecif:'',
          isVisible:'',
          dateliv:'',
        },
    }),
    actions: {
        async fetchEnCoursCmd(prepspecif, isVisible, dateliv) {
            this.loading = true
            try {
                const data = await axios.get(Config.SERVER_URL + 'api/encoursprep', {
                    params: {
                        prepspecif,
                        isVisible,
                        dateliv
                    }
                })
                this.encoursCmds = data.data
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
