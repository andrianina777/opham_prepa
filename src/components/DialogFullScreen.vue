<template  >
    <v-dialog v-model="dialogVisible" fullscreen :scrim="false" transition="dialog-bottom-transition" density="compact">
        <v-card>
            <v-toolbar dark color="primary" density="compact">
                <v-btn icon dark @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ titre_toolbar }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn variant="text" @click="saveItem">
                        {{ btn_valide }}
                    </v-btn>
                </v-toolbar-items>
       
            </v-toolbar>
            <slot></slot>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref } from 'vue';
export default ({
    props: {
        titre_toolbar: String,
        btn_valide: String,
        // item: {
        //     type: Object,
        //     required: true,
        // },
        dialogVisible: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        saveItem() {
            this.$emit('save');
        },
        closeDialog() {
            this.$emit('close');
        },
    },

    setup(props) {
        const dialogVisible = ref(props.dialogVisible)
        return {
            dialogVisible
        };
    },
})
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>