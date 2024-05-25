<template>
    <div>
        <span v-if="days.length === 0">Loading...</span>

        <ul class="list_day">
            <li v-for="day in days" :key="day.id">
                <router-link :to="`/day/${day.day}`">Day {{day.day}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { inject, ref } from 'vue';

    const axios = inject('$axios');

    const days = ref([]);
    const fetchDays = async () => {
        const response = await axios.get('http://localhost:3001/days');
        days.value = response.data;
    };
    fetchDays();
</script>

<style scoped>

</style>