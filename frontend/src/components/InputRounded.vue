<script setup>
const modelValue = defineModel({ type: String, default: '' })
const props = defineProps({ placeholder: { type: String, default: 'Name this list...' } })
</script>

<template>
    <input v-model="modelValue" type="text" class="form-control border-0 rounded-0 rounded-top fw-bolder py-2 fs-5 shadow-none"
        :placeholder="props.placeholder">
</template>