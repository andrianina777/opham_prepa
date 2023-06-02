<template>
    <MyDialog :titre_toolbar=titre_detail btn_valide="Valider" @save="saveItem" @close="closeDialog"
        v-model="dialogVisible">
        <!-- <div>

            <v-card-text>
                <b> {{ storeInfoCmd.infoCmds.nom_client }}</b>
                <v-spacer />
                Adresses: {{ storeInfoCmd.infoCmds.adresse }}
                <v-spacer />
                Contacts: {{ storeInfoCmd.infoCmds.contact }}
            </v-card-text>
        </div> -->
        <div>
            <v-form>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="3">
                            <MyTextarea name_lab_area="Commentaires Client" v-model="storeInfoCmd.infoCmds.coms_client">
                            </MyTextarea>
                        </v-col>
                        <v-col cols="12" md="3">
                            <MyTextarea name_lab_area="Commentaires Magasin" v-model="storeInfoCmd.infoCmds.coms_mag">
                            </MyTextarea>
                        </v-col>
                        <v-col cols="12" md="3">
                            <MySelect comb_lab="Commentaire changement Date Livaison"
                                v-model="storeInfoCmd.infoCmds.raisonDateLiv" :items="storeEnum.enumerations">
                            </MySelect>
                            <v-card-actions>
                                <MyTextField name_lab_text="Date Livraison sohaitée" v-model="storeInfoCmd.infoCmds.date_l"
                                    type_text="date" clearable>
                                </MyTextField>
                                <v-spacer></v-spacer>
                                <MyTextField name_lab_text="Heure Livraison sohaitée"
                                    v-model="storeInfoCmd.infoCmds.heure_l" type_text="time" clearable>
                                </MyTextField>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="12" md="3">
                            <MySelect comb_lab="Axe" :items="storeAxe.axes" v-model="storeInfoCmd.infoCmds.axe">
                            </MySelect>

                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
        <div>
            <div class="container fluid">
                <div class="left pa-2">
                    <h2><u>Articles en préparations</u></h2>
                    <MyTable :headers="headersLigne" :items="storeLigne.ligneCommandes" v-if="!loading" height="600">
                    </MyTable>
                </div>
                <div class="right pa-2">
                    <h2><u>Préparation</u></h2>
                    <MyTable :headers="headersSecondtable" :items="storePrep.detailPreps" v-if="!loading" height="600"
                        action2="Imprimer" @action2Item="imprimer" :showAction1="false">
                    </MyTable>

                    <!-- <v-list density="comfortable">
                        <v-list-item v-for="(item, index) in storePrep.detailPreps" :key="index" v-if="!loading">
                            <v-list-item-content>
                                <v-list-item-title class="pb-0.5"
                                    v-text="`${item.code_BP} - ${item.depot}`"></v-list-item-title>
                                <v-list-item-subtitle class="pb-0.5"
                                    v-text="`Date Creation: ${item.datecre_BP} | Stade: ${item.stade}`">
                                </v-list-item-subtitle>
                                <v-list-item-subtitle class="pb-0.5"
                                    v-text="`Bacs: ${item.listBac} | Emplacement: ${item.empl} | Nb Colis: ${item.nbColis}`">
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action @click="imprimer(item)">
                                <v-icon size="large" color="blue">mdi-printer</v-icon>
                            </v-list-item-action>
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-list> -->

                </div>
            </div>
        </div>


    </MyDialog>
</template>

<script>
import MyDialog from '@/components/DialogFullScreen.vue';
import MyTable from '@/components/MyTable.vue';
import MyList from '@/components/MyList.vue';
import MyTextarea from '@/components/MyTextarea.vue';
import MyTextField from '@/components/MyTextField.vue';
import MySelect from '@/components/MySelect.vue';
import Alert from '@/components/Alert.vue';
import { useLigneCommandeStore } from "@/store/Apreparer/ligneCommande.js";
import { useDetailPrepStore } from "@/store/Apreparer/detailPrep.js";
import { useInfoCmdStore } from "@/store/Apreparer/infoCmd.js";
import { useAxeStore } from "@/store/utils/axe.js";
import { useEnumerationStore } from "@/store/utils/enumeration.js";
import { useRoute, useRouter } from 'vue-router'
import { useReportBPStore } from '@/store/report/printBP';
import { ref, reactive, onMounted, computed, defineEmits, defineComponent, watch, onBeforeMount } from "vue";
import useDateTime from '@/composables/useDateTime';

export default defineComponent({
    components: {
        MyDialog,
        MyTable,
        MyList,
        MyTextarea,
        MyTextField,
        MySelect,
        Alert,
    },
    name: 'voirCmd',
    setup() {

        const route = useRoute();
        const CC = route.params.CC;
        const router = useRouter();

        const storeLigne = useLigneCommandeStore();
        const storePrep = useDetailPrepStore();
        const storeInfoCmd = useInfoCmdStore();
        const storeEnum = useEnumerationStore();
        const storeAxe = useAxeStore();
        const loading = ref(false);
        const dialogVisible = ref(false);
        const success = ref(false);

        let titre_detail = ref("");
        const date_liv = ref(null);

        const storePrint = useReportBPStore();

        function closeDialog() {
            dialogVisible.value = false;
            // router.push({ name: 'attePrepa' });
            history.back();
        }



        onBeforeMount(() => {
            dialogVisible.value = true;
            titre_detail.value = "Details du Commande " + CC;
            fetchligneCommande();
            fetchDetailPreps();
            fetchInfoCmd();
            fetchAxes();
            fetchEnumCom();
        })




        const headersLigne = [
            { title: 'article', align: 'start', key: 'code_article', sortable: true },
            { title: 'Libellé', align: 'start', key: 'libelle', sortable: true },
            { title: 'Quantité Commandée', align: 'center', key: 'qte_cmd' },
            // { title: 'Quantité Restée', align: 'end', key: 'qte_reste' },
            // { title: 'Quantité Expediée', align: 'end', key: 'qte_expedie' },
            { title: 'Transfert', align: 'center', key: 'coms' },

        ]

        const headersSecondtable = [
            { title: 'BP', align: 'start', key: 'code_BP', sortable: true },
            { title: 'DEPOT', align: 'start', key: 'depot' },
            { title: 'DATE', align: 'start', key: 'datecre_BP', sortable: true },
            { title: 'STADE', align: 'start', key: 'stade' },
            { title: 'BACS', align: 'start', key: 'listBac' },
            { title: 'EMPLACEMENT', align: 'start', key: 'empl' },
            { title: 'NB COLIS', align: 'center', key: 'nbColis' },
            { title: 'Actions', align: 'start', key: 'actions', value: 'actions' },
        ]

        const fetchligneCommande = async () => {
            loading.value = true;
            storeLigne.params.code = CC;
            console.log(storeLigne.params.code)
            storeLigne.fetchLigneCommande();
            loading.value = false;
        }

        const fetchDetailPreps = async () => {
            loading.value = true;
            storePrep.params.code = CC;
            console.log(storePrep.params.code)
            storePrep.fetchDetailPrep();
            loading.value = false;
        }
        const fetchInfoCmd = async () => {
            loading.value = true;
            storeInfoCmd.params.code = CC;
            storeInfoCmd.fetchInfoCommande();
            const { dateTime } = useDateTime(storeInfoCmd.infoCmds.date_liv);
            date_liv.value = dateTime.value
            loading.value = false;
            console.log(storeInfoCmd);

        }

        const fetchAxes = async () => {
            loading.value = true;
            storeAxe.fetchAxe();
            loading.value = false;
        }

        const fetchEnumCom = async () => {
            loading.value = true;
            storeEnum.params.code = "COM_DATELIV";
            console.log(storeEnum.params.code);
            storeEnum.fetchEnums();
            loading.value = false;
        }


        function saveItem() {
            const infoCmd = {
                coms_mag: storeInfoCmd.infoCmds.coms_mag,
                axe: storeInfoCmd.infoCmds.axe,
                date_liv: new Date(storeInfoCmd.infoCmds.date_l + 'T' + storeInfoCmd.infoCmds.heure_l),
                raisonDateLiv: storeInfoCmd.infoCmds.raisonDateLiv,
                code_cc: CC
            }
            console.log(infoCmd);
            storeInfoCmd.updateInfoCommande(infoCmd);
            closeDialog();
        }



        const imprimer = async (item) => {
            try {
                console.log(item.value.code_BP);
                const response = await storePrint.generateReport(item.value.code_BP, 1);
                //     const blob = new Blob([response.data], { type: 'application/pdf' });
                //     const url = URL.createObjectURL(blob);
                //     const link = document.createElement('a');
                //     link.href = url;
                //     link.setAttribute('download', 'prepaA5.pdf');
                //     document.body.appendChild(link);
                //     link.click();
                //     document.body.removeChild(link);
                //     URL.revokeObjectURL(url);
                // } catch (error) {
                //     console.error(error);
                // }
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                window.open(url, '_blank');

                URL.revokeObjectURL(url);
            } catch (error) {
                console.error(error);
            }
        };



        // const selectedDateTimeFormatted = computed(() => {
        //     if (storeInfoCmd.infoCmds.date_liv != null) {
        //         const { dateTime } = useDateTime(storeInfoCmd.infoCmds.date_liv);
        //         return dateTime.value;
        //     } else {
        //         return "";
        //     }
        // });

        return {
            dialogVisible,
            headersLigne, headersSecondtable, titre_detail, storeLigne, fetchligneCommande,
            fetchDetailPreps, storePrep, storeInfoCmd, fetchInfoCmd, fetchAxes, storeAxe, fetchEnumCom, storeEnum
            , closeDialog,
            saveItem, onMounted, CC, success, imprimer

        }
    }
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;

    justify-content: space-between;

    overflow-y: auto;
}

.left {
    flex-basis: 70%;
}

.right {
    flex-basis: 30%;
}
</style>