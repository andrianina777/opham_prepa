<template>
   
        <v-text-field :label="name_lab_text" :hint="hint_text" :type="type_text" variant="underlined"  density="compact"
            :rules="rules_text" />

</template>
<script>
export default ({
    props: {
        name_lab_text: String,
        hint_text: String,
        type_text: String,
        rules_text: String,
    },
})

</script>  