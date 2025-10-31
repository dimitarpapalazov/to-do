<script setup>
import { ref } from 'vue'
import ButtonPill from '@/components/ButtonPill.vue';
import InputRounded from '@/components/InputRounded.vue';
import TextareaRounded from '@/components/TextareaRounded.vue';
import { listApi } from '@/services/api'
import { useRouter } from 'vue-router'

const name = ref('')
const description = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

async function submit() {
    if (!name.value.trim()) {
        error.value = 'Name is required'
        return
    }
    error.value = ''
    loading.value = true
    try {
        const list = await listApi.create({ name: name.value.trim(), description: description.value || null })
        router.push(`/lists/${list.id}`)
    } catch (e) {
        error.value = 'Failed to create list'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 border-bottom">
                <div class="text-center p-2">
                    <h1><b>To-dos</b></h1>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-8 border mx-auto p-0 rounded-top">
                <InputRounded v-model="name" />
            </div>
            <div class="col-8 border border-top-0 mx-auto p-0 rounded-bottom">
                <TextareaRounded v-model="description" />
                <div class="d-flex justify-content-end align-items-center">
                    <span v-if="error" class="text-danger me-2">{{ error }}</span>
                    <ButtonPill :disabled="loading" label="Add this list" @click="submit" />
                </div>
            </div>
        </div>
    </div>
</template>