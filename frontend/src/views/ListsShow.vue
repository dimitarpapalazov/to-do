<script setup>
import { computed, onMounted, ref } from 'vue';
import ButtonPill from '@/components/ButtonPill.vue';
import InputRounded from '@/components/InputRounded.vue';
import TextareaRounded from '@/components/TextareaRounded.vue';
import { listApi, taskApi } from '@/services/api';
import { useRoute } from 'vue-router';

const route = useRoute();
const listId = Number(route.params.id);

const list = ref(null);
const tasks = ref([]);
const loading = ref(true);
const error = ref('');

const newTaskTitle = ref('');
const newTaskNotes = ref(''); // reserved for future notes field

const completedCount = computed(() => tasks.value.filter(t => t.completed).length);

async function load() {
    loading.value = true;
    try {
        list.value = await listApi.getById(listId);
        tasks.value = Array.isArray(list.value?.tasks) ? list.value.tasks : await taskApi.getByList(listId);
    } catch (e) {
        error.value = 'Failed to load list';
    } finally {
        loading.value = false;
    }
}

async function addTask() {
    const title = newTaskTitle.value.trim();
    if (!title) return;
    try {
        const created = await taskApi.create(listId, { title });
        tasks.value.push(created);
        newTaskTitle.value = '';
        newTaskNotes.value = '';
    } catch (e) {
        // noop: minimal error handling for MVP
    }
}

async function toggleTask(task) {
    try {
        const updated = await taskApi.update(task.id, { completed: !task.completed });
        task.completed = updated.completed;
    } catch (e) {
        // noop
    }
}

onMounted(load);
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-11 offset-1">
                <span v-if="list">{{ completedCount }}/{{ tasks.length }} Completed</span>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-8 border mx-auto p-0 rounded-top">
                <InputRounded v-model="newTaskTitle" placeholder="Add a to-do..." />
            </div>
            <div class="col-8 border border-top-0 mx-auto p-0 rounded-bottom">
                <TextareaRounded v-model="newTaskNotes" placeholder="Add extra details..." />
                <div class="d-flex justify-content-end align-items-center">
                    <ButtonPill label="Add this to-do" @click="addTask" />
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-8 mx-auto">
                <div v-if="loading">Loading…</div>
                <div v-else-if="error" class="text-danger">{{ error }}</div>
                <ul v-else class="list-group">
                    <li v-for="t in tasks" :key="t.id" class="list-group-item d-flex align-items-center">
                        <input class="form-check-input me-2" type="checkbox" :checked="t.completed"
                            @change="toggleTask(t)">
                        <span :class="{ 'text-decoration-line-through text-muted': t.completed }">{{ t.title }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped></style>