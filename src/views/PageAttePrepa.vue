<template >
    <v-card>
        <v-app >
            <v-app-bar :elevation="1"  density="compact" color="#d7ead5" app>
                <v-card density="compact">
                    <MyTabs :storeEtape="storeEtape"></MyTabs>
                </v-card>
                <v-spacer></v-spacer>

                <div class="ma-3">
                    <p class="font-weight-thin">
                        Delai Normal :<b>{{ valApre }} </b>
                    </p>

                    <p class="font-weight-thin">
                        Début Alerte : <b>{{ alertApre }}</b>
                    </p>
                </div>
            </v-app-bar>
            <v-container fluid>
                <v-main style="--v-layout-top: 40px" app>
                    <v-card-actions density="compact">
                        <span density="compact"><b>Date Livraison</b></span>
                        <v-card-title>
                            <v-text-field v-model="store.params.dateliv" type="date" label="Date Livraison" single-line
                                hide-details density="compact" clearable></v-text-field>
                        </v-card-title>
                        <v-spacer/>
                            <v-row>
                                <v-col>
                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u>Priorité</u></b><br>
                                    <v-card  max-width="390">
                                        <div>
                                        <v-btn size="x-small" class="red--text text--darken-4" variant="tonal">Urgent + A Prendre
                                            <v-badge :content="1" color="#5D4037"  inline class="large">
                                            
                                            </v-badge>
                                        </v-btn>
                                        <v-btn size="x-small" class="aprendre--text text--aprendre" variant="tonal">A prendre
                                        </v-btn>
                                    </div>
                                    <div>
                                        <v-btn size="x-small" class="green--text text--teal-darken-4" variant="tonal">Urgent</v-btn>
                                        <v-btn size="x-small" class="normal--text text--normal black--text" variant="tonal">Normal</v-btn>
                                    </div>
                                    <div>
                                        <v-btn size="x-small" class="grade--text text--grade" variant="tonal">Grade</v-btn>
                                    </div>

                                    </v-card>
                                    <!-- <MyList titre_list="Priorité" :items_list="list_priorite"></MyList> -->
                                   

                                </v-col>
                                <v-col>
                                    <!-- <MyList titre_list="Valeur Client " :items_list="list_valeur"></MyList> -->
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u>Clients</u></b><br>
                                    <v-card max-width="390">
                                        <div>
                                            <v-btn size="x-small" class="or--text text--or" variant="tonal">OR</v-btn>
                                            <v-btn size="x-small" class="bronze--text text--bronze" variant="tonal">Bronze</v-btn>
                                        </div>
                                        <div>
                                            <v-btn size="x-small" class="argent--text text--argent" variant="tonal">Argent</v-btn>
                                            <v-btn size="x-small" class="fer--text text--fer" variant="tonal">Fer</v-btn>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        <v-spacer />
                        <v-btn variant="tonal" color="primary" @click="searchEvent" :disabled="loading"
                            density="compact">Rechercher</v-btn>
                    </v-card-actions>
                    <div class="pa-2">
                        <v-progress-linear v-if="loading" color="primary" rounded indeterminate height="5"
                            density="compact">

                        </v-progress-linear>
                        <MyTable v-else :headers="headers" :items="store.commandes" action1="preparer"
                            @action1Item="showPreparer" action2="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;voir&nbsp;&nbsp;&nbsp;&nbsp;"
                            @action2Item="showDialog" @my-alert="alertValue" @my-val="valValue" height="690"
                            etape="attePrep" :showAction1="true">
                        </MyTable>
                    </div>
                    <!-- <MyLoading :loading="loading" @close="loading = false"></MyLoading> -->
                    <!-- <router-view></router-view> -->
                </v-main>
                <!-- <v-footer app class="bg-grey-lighten-1 ">
                    <v-row justify="start" no-gutters>
                        <MyList titre_list="Priorité" :items_list="list_priorite"></MyList>
                    </v-row>
                    <v-row justify="end" no-gutters>
                        <MyList titre_list="Valeur Client " :items_list="list_valeur"></MyList>
                    </v-row>
                </v-footer> -->
            </v-container>
        </v-app>
    </v-card>
</template>

<script>
import MyTable from '@/components/MyTable.vue';
import MyTabs from '@/components/MyTabs.vue';
import MyList from '@/components/MyList.vue';
import MyLoading from '@/components/Loading.vue';
import MyToolbars from '@/components/MyToolbars.vue';
import {
    VApp,
    VAppBar,
    VMain,
    VFooter
} from 'vuetify/lib/components';
import { useCommandeStore } from "@/store/Apreparer/commande.js";
import { ref, reactive, onMounted, computed, onBeforeMount, defineComponent, watch } from "vue";
import { useRouter } from 'vue-router'
import voirCmd from "@/views/VoirCmd.vue"
import prepareCmd from "@/views/PreparerCmd.vue"
import { useformatDate } from '@/composables/useformatDate';
import { useEtapeStore } from "@/store/utils/etape.js";
export default defineComponent({
    components: {
        MyTable,
        MyTabs,
        MyList,
        MyLoading,
        MyToolbars,
        voirCmd,
        prepareCmd
    },
    name: 'attePrepa',
    setup() {
        const store = useCommandeStore();
        // const loading = store.loading;
        const storeEtape = useEtapeStore();
        const loading = computed(() => store.loading)
        const dialogVisible = ref(false);
        let selectedItem = ref(null);
        const alertApre = ref('');
        const router = useRouter();
        const valApre = ref('');

        function showDialog(item) {
            selectedItem.value = item;
            dialogVisible.value = true;
            const CC = selectedItem.value.value.code;
            router.push({ name: 'voirCmd', params: { CC } });
            history.pushState(null, null, window.location.href);

        }

        function showPreparer(item) {
            selectedItem.value = item;
            dialogVisible.value = true;
            const CC = selectedItem.value.value.code;
            router.push({ name: 'preparerCmd', params: { CC } });
            history.pushState(null, null, window.location.href);
        }

        const headers = [
            { title: 'commande', align: 'start', key: 'code', sortable: true },
            { title: 'Date', align: 'center', key: 'date_com', sortable: true },
            { title: 'Livraison', align: 'center', key: 'date_prevue_liv' },
            { title: 'plus info', align: 'start', key: 'nom_client' },
            { title: 'Commentaire', align: 'start', key: 'commentaire' },
            { title: 'Axe', align: 'center', key: 'axe' },
            { title: 'Depuis', align: 'end', key: 'duree_atte_prep' },
            { title: 'partie', align: 'center', key: 'resume' },
            { title: 'Nb Ligne', align: 'end', key: 'nbLigne' },
            { title: 'Situation Mag', align: 'end', key: 'situation_mag' },
            { title: 'Actions', align: 'start', key: 'actions', value: 'actions' },
        ]



        const list_priorite = [
            { text: 'Urgent + A Prendre', color: '#FF0000' },
            { text: 'Urgent', color: '#008000' },
            { text: 'Grade', color: '#ff9933' },
            { text: 'A Prendre', color: '#0000FF' },
            { text: 'Normal' },
        ]
        const list_valeur = [
            { text: 'Or', color: '#ff66ff' },
            { text: 'Argent', color: '#ffff00' },
            { text: 'Bronze', color: '#99ffff' },
            { text: 'Fer', color: '#c0c0c0' },
        ]


        const searchEvent = async () => {
            run_list_prepa();
            await storeEtape.fetchEtape();

        }


        onMounted(() => {

            run_list_prepa();
            //    fetchAlerte();

            //   setInterval(run_list_prepa, 30000);
        })
        const alertValue = (value) => {
            alertApre.value = value;
        }
        const valValue = (value) => {
            valApre.value = value;
        }

        function run_list_prepa() {
            const params = {
                groupe: '',
                dateliv: store.params.dateliv,
            }
            store.fetchCommande(params);
        }
        return {
            store, headers, searchEvent, loading, list_priorite, list_valeur, showDialog, valApre, alertApre, alertValue, valValue, showPreparer

        }
    },



});

</script>

<style>
.alert_class {
    text-align: left;

}
</style>


