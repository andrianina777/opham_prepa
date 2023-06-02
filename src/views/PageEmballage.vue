<template >
    <PageCommunPrep etape="Emb   " prepspecif="3" isVisible="1" ></PageCommunPrep>

</template>
<script>
import PageCommunPrep from './PageCommunPrep.vue';
import { ref, reactive, onMounted, computed, onBeforeMount, defineComponent, watch } from "vue";
export default defineComponent({
    components: {
        PageCommunPrep,
    },
    name: "emballage"
});
</script>