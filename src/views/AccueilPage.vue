<template>
    <v-app id="inspire">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Accueil</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tab @click="logout" class="text-red-lighten-1">Déconnecter</v-tab>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" temporary>
        <v-sheet height="50" width="50">
          <v-img src="../assets/profil.png"></v-img>
        </v-sheet>
      </v-navigation-drawer>
  
      <v-main class="bg-grey-lighten-2">
        <v-container>
          <v-row>
            <v-col>
              <strong><u>Category</u></strong>
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="6" md="2">
              <v-sheet height="95" width="100">
                <v-img src="../assets/transfert.png" @click="transfert"></v-img>
                <b class="align-center justify-center">TRANSFERT</b>
              </v-sheet>
            </v-col>
  
            <v-col cols="6" md="2">
              <v-sheet height="95" width="100">
                <v-img src="../assets/prepa.png" @click="prepa"></v-img>
                <b class="align-center justify-center">PREPARATION</b>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { ref,defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import swal from 'sweetalert2';
  
  export default defineComponent({
    name:'accueilpage',
    setup() {
      const drawer = ref(null);
      const router = useRouter();

  
      const transfert = () => {
        router.push('/transfert');
      };
  
      const prepa = () => {
        router.push('/PageAttePrepa');
      };
  
      const logout = () => {
        swal
          .fire({
            title: 'Voulez-vous vraiment Déconnecter ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Oui',
            denyButtonText: `Non`,
          })
          .then((result) => {
            if (result.isConfirmed) {
              router.push('/LoginPage');
            } else if (result.isDenied) {
              // swal.fire('Transfert annuler', '', 'info');
            }
          });
      };
  
      return {
        drawer,
        transfert,
        prepa,
        logout,
      };
    },
  });
  </script>
  