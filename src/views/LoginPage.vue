<template>
   <div class="py-4">
      <v-img class="mx-auto mb-10" max-width="100" src="../assets/opham.png"></v-img>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
         <div class="text-subtitle-1 text-medium-emphasis">Nom d'utilisateur</div>

         <v-text-field v-model="authStore.username" density="compact" placeholder="Nom d'utilisateur"
            prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

         <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Mot de passe
         </div>

         <v-text-field v-model="authStore.password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'" density="compact" placeholder="Entrer votre mot de passe"
            prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible">
         </v-text-field>

         <v-select variant="underlined" label="Serveurs" :items="['OPHAM', 'SIMUL221', 'SIMUL220']"></v-select>

         <v-btn block class="mb-8" color="cyan-darken-4" size="large" variant="tonal" @click="onLogin">
            Se connecter
         </v-btn>
      </v-card>
   </div>
</template>
 
<script>
import { ref, defineComponent } from 'vue';
import { useAuthStore } from '@/store/utils/login'
import { useRouter } from 'vue-router'
//import loginApi from '../plugins/config.js';

export default defineComponent({
   name: 'login',
   setup() {
      const visible = ref(false);
      const authStore = useAuthStore();
      const router = useRouter();
      const onLogin = () => {
         authStore.login()
            .then(response => {
               router.push('/AccueilPage');
               // Gérez la réponse du backend
               console.log(response.data);
            })
            .catch(error => {
               // Gérez les erreurs
               console.error(error);
            });
      };

      return {
         visible,
         authStore,
         onLogin,
      };
   },
});
</script>
 