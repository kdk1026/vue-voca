<template>
    <div>
        <h3>현재 일수 : {{days.length}}</h3>
        <button @click="addDay">Day 추가</button>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { getDays, createDay } from "../apis/days";

    const days = ref([]);

    const router = useRouter();

    const fetchDays = async () => {
        const response = await getDays();
        days.value = response.data;
    };
    fetchDays();

    function addDay() {
        createDay(days.value.length)
        .then(res => {
            if (res.status === 201) {
                alert("생성이 완료 되었습니다");
                router.push('/');
            }
        });
    }
</script>

<style scoped>

</style>