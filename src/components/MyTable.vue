<template >
    <v-data-table class="blue-header" :headers="headers" :items="items"  :fixed-header="true" v-if="!loading" 
        :loading="loading" density="compact" :etape="etape" :items-per-page="-1">
        <template v-slot:[`item.actions`]="{ item }">
            <template v-if="showAction1">
                <v-btn size="x-small" color="blue" @click="action1PItem(item)">
                    {{ action1 }}
                </v-btn>
                <v-spacer />
            </template>
            <v-spacer />
            <v-btn size="x-small" color="blue-grey" @click="action2PItem(item)">
                {{ action2 }}
            </v-btn>
        </template>
        <template v-slot:[`item.date_com`]="{ item }">
            <v-chip label :color="getColor(item.raw.valeur)" text-color="#000000">
                {{ item.raw.date_com }}
            </v-chip>
        </template>

        <template v-slot:[`item.code`]="{ item }">
            <span :style="{ color: getUrgent(item) }">{{ item.raw.code }}</span>
        </template>

        <template v-slot:[`item.etat`]="{ item }">
            <v-checkbox-btn v-model="item.raw.etat" color="primary" hide-details
                :disabled="item.raw.transfert === 'Transfert' || item.raw.transfert === 'Sans Empl' || item.raw.transfert === 'Porte'"
                @click="handleCheckboxClick(item)"></v-checkbox-btn>
        </template>
        <template v-slot:[`header.etat`]="{ header }">
            <v-checkbox v-model="selectAll" :indeterminate="indeterminate" :label="header.text"
                :disabled="desserts.length == 0" @click.native.stop @change="toggleAll"></v-checkbox>
        </template>
        <template #footer>
            <div class="text-center">
                This is the footer text.
            </div>
        </template>
        <!-- <template v-slot:item.date_prevue_liv="{ item }">
            {{ formatDate(item.date_prevue_liv) }}
        </template> -->
        <template v-slot:[`item.date_prevue_liv`]="{ item }">
            {{ formatDateTime(item.raw.date_prevue_liv) }}
        </template>
        <template v-slot:[`item.datecre_BP`]="{ item }">
            {{ formatDateTime(item.raw.datecre_BP) }}
        </template>
        <template v-slot:[`item.date_com`]="{ item }">
            {{ formatDate(item.raw.date_com) }}
        </template>
        <!-- <span>{{ useDateTime(value).dateTime.value.slice(1, -1) }}</span> -->


        <!-- <template #headerCell="{ header }">
            <v-checkbox v-if="header.value === 'select'" :input-value="selectAll" hide-details @click.stop></v-checkbox>
            <span v-else>{{ header.text }}</span>
        </template> -->

        <!-- <template #item="{ item }">
            <tr :style="{color : getUrgent(item)}">
                <td>
                    {{ item.raw.code }}
                </td>
                <td>
                    {{ item.raw.date_com }}
                </td>
                <td>{{ item.raw.date_prevue_liv }}</td>
                <td>{{ item.raw.nom_client }}</td>
                <td>{{ item.raw.commentaire }}</td>
                <td>{{ item.raw.axe }}</td>
                <td>{{ item.raw.duree_atte_prep }}</td>
                <td>{{ item.raw.resume }}</td>
                <td>{{ item.raw.nbLigne }}</td>
                <td>{{ item.raw.situationmag }}</td>
                <td>{{ item.raw.actions }}</td>
            </tr>
        </template> -->
        <!-- <span :style="{ color: item.raw.nbLigne > 3 ? 'green' : 'red' }">{{ item.raw.date_com }}</span> -->
    </v-data-table>
</template>
<script>
import { defineComponent } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useAlerteStore } from "@/store/utils/alerte.js"
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import dayjs from 'dayjs';
export default defineComponent({
    components: {
        VDataTable,
    },
    emits: ['action1Item', 'action2Item', 'handleCheckboxClick'],
    props: {
        headers: Object,
        items: Object,
        loading: {
            type: Boolean,
            default: false
        },
        action1: String,
        action2: String,
        titre_list: String,
        itemslist: Object,
        header_text: String,
        alerte: String,
        etape: String,
        showAction1: {
            type: Boolean,
            default: false
        },
    },
    defaults: {
        VDataTable: {
            fixedHeader: true,
            noDataText: 'Pas de resultats',
        },
    },

    setup(props, { emit }) {
        // const m_date = ref(null);
        // const useformatDate = useformatDate();
        const storeAlert = useAlerteStore();
        const loading = ref(false);
        const alerte = ref('');
        const action1PItem = (item) => {
            emit('action1Item', item);
        };
        const action2PItem = (item) => {
            emit('action2Item', item);
        };
        const handleCheckboxClick = (item) => {
            emit('handleCheckboxClick', item);
        };
        const emitEvent = () => {
            emit('my-alert', alerte);
            emit('my-val', storeAlert.alertes.val)
        };

        const fetchAlerte = async () => {
            storeAlert.params.code = props.etape;
            if (props.etape) {
                await storeAlert.fetchAlerte();
                alerte.value = storeAlert.alertes.alerte;
            }
        }


        const formatDateTime = (date) => {
            if(date!==null && date!==''){
                return dayjs(date).format('DD/MM/YYYY HH:mm');
            } else {
                return '';
            }
           
        };

        const formatDate = (date) => {
            if(date!==null && date!==''){
                return dayjs(date).format('DD/MM/YYYY');
            } else {
                return '';
            }
           
        };

        const getColor = (valeur) => {
            if (valeur.trim() == "OR") return '#ff66ff';
            else if (valeur.trim() == "ARGENT") return '#ffff00';
            else if (valeur.trim() == "BRONZE") return '#99ffff';
            else if (valeur.trim() == "FER") return '#c0c0c0';
        };
        onMounted(() => {
            fetchAlerte();
            emitEvent();

        })

        const getUrgent = (item) => {

            if (item.raw.prioritaire == 1 && item.raw.province == 1 && item.raw.duree_atte_prep >= alerte.value) {
                item.raw.urgent = 1

            }
            if ((item.raw.urgent + item.raw.aprendre) == 2) {
                return '#FF0000';
            }
            else if (item.raw.urgent == 0 && item.raw.aprendre == 0 && item.raw.garde == 1) {
                return '#ff9933';
            }
            else if (item.raw.urgent == 1 && item.raw.aprendre == 0) {
                return '#00cc00';
            }
            else if (item.raw.urgent == 0 && item.raw.aprendre == 1) {
                return '#0099ff';
            }

        };

        return { action1PItem, action2PItem, getColor, getUrgent, fetchAlerte, emitEvent, handleCheckboxClick, formatDate,formatDateTime };
    }



    // getUrgent(item) {
    //     if(item.raw.prioritaire=1 && item.raw.province==1 && item.raw.duree_atte_prep>= ){

    //     }

    // }
});
</script>
  

<style>
.v-data-table.blue-header .v-table__wrapper>table>thead>tr th,
.v-data-table.blue-header .v-table__wrapper>table tbody>tr th {
    background-color: #b8b3cc;
    white-space: nowrap;
}

/* .v-table > .v-table__wrapper > table > tbody > tr:nth-child(-n+2) td{
      background: #e1eed7;
    } */
</style>
