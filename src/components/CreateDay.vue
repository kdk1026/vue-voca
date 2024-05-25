<template>
    <div>
        <h3>현재 일수 : {{days.length}}</h3>
        <button @click="addDay">Day 추가</button>
    </div>
</template>

<script setup>
    import { inject, ref } from "vue";
    import { useRouter } from "vue-router";

    const axios = inject('$axios');

    const days = ref([]);

    const router = useRouter();

    const fetchDays = async () => {
        const response = await axios.get('http://localhost:3001/days');
        days.value = response.data;
    };
    fetchDays();

    function addDay() {
        axios.post('http://localhost:3001/days', {
            day: days.value.length + 1
        })
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