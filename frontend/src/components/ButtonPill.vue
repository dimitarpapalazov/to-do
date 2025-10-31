<script setup>
const props = defineProps({
    label: { type: String, default: 'Add' },
    disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['click'])
function onClick(e) { emit('click', e) }
</script>

<template>
    <button class="btn btn-success rounded-pill m-2" :disabled="disabled" @click="onClick">{{ props.label }}</button>
</template>