<script setup>
import { nextTick, ref, watch, onMounted } from 'vue'

const modelValue = defineModel({ type: String, default: '' })
const props = defineProps({ placeholder: { type: String, default: 'Add extra details...' } })
const el = ref(null)

function adjustHeight() {
    const ta = el.value
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = ta.scrollHeight + 'px'
}

watch(modelValue, async () => {
    await nextTick()
    adjustHeight()
})

onMounted(() => adjustHeight())
</script>

<template>
    <textarea ref="el" v-model="modelValue"
        class="form-control border-0 rounded-0 rounded-bottom shadow-none auto-expand" :placeholder="props.placeholder"
        rows="1"></textarea>
</template>

<style scoped>
textarea {
    resize: none;
}

.auto-expand {
    resize: none;
    overflow: hidden;
    min-height: 38px;
}
</style>