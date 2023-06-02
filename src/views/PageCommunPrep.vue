<template >
    <v-card>
        <v-app>
            <v-app-bar :elevation="1" density="compact" color="#d7ead5" app>
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
                        <v-spacer />
                        <v-row>
                            <v-col>
                                <!-- <MyList titre_list="Priorité" :items_list="list_priorite"></MyList> -->
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u>Priorité</u></b><br>
                                <div>
                                    <v-btn size="x-small" class="red--text text--darken-4" variant="tonal">Urgent + A
                                        Prendre</v-btn>
                                    <v-btn size="x-small" class="aprendre--text text--aprendre" variant="tonal">A
                                        prendre</v-btn>
                                </div>
                                <div>
                                    <v-btn size="x-small" class="green--text text--teal-darken-4"
                                        variant="tonal">Urgent</v-btn>
                                    <v-btn size="x-small" class="normal--text text--normal black--text"
                                        variant="tonal">Normal</v-btn>
                                </div>
                                <div>
                                    <v-btn size="x-small" class="grade--text text--grade" variant="tonal">Grade</v-btn>
                                </div>
                            </v-col>
                            <v-col>
                                <!-- <MyList titre_list="Valeur Client " :items_list="list_valeur"></MyList> -->
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u>Clients</u></b><br>
                                <div>
                                    <v-btn size="x-small" class="or--text text--or" variant="tonal">OR</v-btn>
                                    <v-btn size="x-small" class="bronze--text text--bronze" variant="tonal">Bronze</v-btn>
                                </div>
                                <div>
                                    <v-btn size="x-small" class="argent--text text--argent" variant="tonal">Argent</v-btn>
                                    <v-btn size="x-small" class="fer--text text--fer" variant="tonal">Fer</v-btn>
                                </div>
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
                        <MyTable v-else :headers="headers" :items="store.encoursCmds"
                            action2="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;voir&nbsp;&nbsp;&nbsp;&nbsp;" @action2Item="showDialog"
                            @my-alert="alertValue" @my-val="valValue" height="690" :etape="etape" :showAction1="false">
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
import { useEnCoursCmdStore } from "@/store/EnPreparation/EnCoursPrepa";
import { ref, reactive, onMounted, computed, onBeforeMount, defineComponent, watch } from "vue";
import { useRouter } from 'vue-router'
import voirCmd from "@/views/VoirCmd.vue"
import { useEtapeStore } from "@/store/utils/etape.js";
export default defineComponent({
    components: {
        MyTable,
        MyTabs,
        MyList,
        MyLoading,
        MyToolbars,
        voirCmd
    },
    props: {
        prepspecif: Number,
        isVisible: Number,
        etape: String,
    },
    name: 'enPrepa',
    setup(props) {
        const store = useEnCoursCmdStore();
        const storeEtape = useEtapeStore();
        // const loading = store.loading;
        const loading = computed(() => store.loading)
        const dialogVisible = ref(false);
        let selectedItem = ref(null);
        const alertApre = ref('');
        const router = useRouter();
        const valApre = ref('');
        // const etape = "Prep";

        function showDialog(item) {
            selectedItem.value = item;
            dialogVisible.value = true;
            const CC = selectedItem.value.value.code;
            router.push({ name: 'voirCmd', params: { CC } });
            history.pushState(null, null, window.location.href);
        }



        const headers = [
            { title: 'commande', align: 'start', key: 'code', sortable: true },
            { title: 'Date', align: 'center', key: 'date_com', sortable: true },
            { title: 'Livraison', align: 'center', key: 'date_prevue_liv' },
            { title: 'plus info', align: 'start', key: 'nom_client' },
            { title: 'Commentaire', align: 'start', key: 'type_tana' },
            { title: 'Axe', align: 'center', key: 'axe' },
            { title: 'Depuis ADV', align: 'end', key: 'depuis_adv' },
            { title: 'Depuis Prepa', align: 'center', key: 'depuis_prepa' },
            { title: 'Depuis', align: 'end', key: 'duree_atte_prep' },
            { title: 'Situation Mag', align: 'end', key: 'mag_restant' },
            { title: 'Situation EXP', align: 'end', key: 'situation_exp' },
            { title: 'Valeur Client', align: 'end', key: 'valeur' },
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
        })
        const alertValue = (value) => {
            alertApre.value = value;
        }
        const valValue = (value) => {
            valApre.value = value;
        }

        const run_list_prepa = async () => {
            // const prepspecif = 0;
            // const isVisible = 1;
            const dateliv = store.params.dateliv;
            await store.fetchEnCoursCmd(props.prepspecif, props.isVisible, dateliv);
        }


        return {
            store, headers, searchEvent, loading, list_priorite, list_valeur, showDialog, valApre, alertApre, alertValue, valValue

        }
    },



});

</script>

<style>
.alert_class {
    text-align: left;

}

.red--text.text--darken-4 {
    background-color: #b71c1c;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}

.green--text.text--teal-darken-4 {
    background-color: #008000;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}

.grade--text.text--grade {
    background-color: #ff9933;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}

.aprendre--text.text--aprendre {
    background-color: #0000FF;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}

.normal--text.text--normal {
    background-color: #ffffff;
    color: rgb(0, 0, 0) !important;
    width: 190px;
}

.or--text.text--or {
    background-color: #ff66ff;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}

.argent--text.text--argent {
    background-color: #FFD600;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}

.bronze--text.text--bronze {
    background-color: #29B6F6;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}

.fer--text.text--fer {
    background-color: #78909C;
    color: rgb(255, 255, 255) !important;
    width: 190px;
}
</style>


