<template >
  <v-card density="compact" >
    <v-tabs v-model="tabs" bg-color="#d7ead5" color="deep-purple-accent-4" align-tabs="center" density="compact" >
      <v-tab to="/PageAttePrepa">A préparer<v-badge color="red-darken-4" :content="storeEtape.etapes.attePrep"
          inline></v-badge></v-tab>
      <v-tab to="/PageEnCoursPrepa">En préparation <v-badge color="indigo" :content="storeEtape.etapes.encoursPrep"
          inline></v-badge></v-tab>
      <v-tab to="/PageAtteCtrl">Attente Ctrl <v-badge color="teal" :content="storeEtape.etapes.atteCtrl" inline></v-badge>
      </v-tab>
      <v-tab to="/PageEnCoursCtrl">EnCours Ctrl <v-badge color="lime" :content="storeEtape.etapes.encoursCtrl"
          inline></v-badge></v-tab>
      <v-tab to="/PageEmballage">Emballage <v-badge color="orange" :content="storeEtape.etapes.emballage"
          inline></v-badge></v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <router-view />
  </v-card>
</template>
  
<style></style>
  
<script>
import { useEtapeStore } from "@/store/utils/etape.js"
import { ref, onMounted, onBeforeMount, computed, defineComponent } from 'vue';
export default defineComponent({
    props: {
        storeEtape: Object,
    },
    setup() {
        const storeEtape = useEtapeStore();
        onMounted(() => {
            fetchEtaps();

        })
        const fetchEtaps = async () => {
            await storeEtape.fetchEtape();
        }
        return {
            storeEtape, fetchEtaps, onMounted
        }
    }

});
</script>