<template>
    <v-select  :items="items" :label="comb_lab"  density="compact" 
        ></v-select>
</template>
<script>
export default ({
    props: {
        items: Object,
        comb_lab: String,
        
    },
})

</script>