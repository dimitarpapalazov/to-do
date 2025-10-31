<script setup>
import { onMounted, ref } from 'vue';
import { listApi } from '@/services/api';

const lists = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
    try {
        lists.value = await listApi.getAll();
    } catch (e) {
        error.value = 'Failed to load lists';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12 border-bottom">
                <div class="text-center p-2">
                    <h1><b>To-dos</b></h1>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-10 mx-auto">
                <div v-if="loading">Loading…</div>
                <div v-else-if="error" class="text-danger">{{ error }}</div>
                <div v-else>
                    <div class="d-flex justify-content-end mb-2">
                        <router-link to="/lists/new" class="btn btn-success btn-sm">New list</router-link>
                    </div>
                    <ul class="list-group">
                        <li v-for="l in lists" :key="l.id"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            <router-link :to="`/lists/${l.id}`" class="text-decoration-none">{{ l.name }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
