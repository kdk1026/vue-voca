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
    import { getDays } from "../apis/days";

    const days = ref([]);
    const fetchDays = async () => {
        const response = await getDays();
        days.value = response.data;
    };
    fetchDays();
</script>

<style scoped>

</style>