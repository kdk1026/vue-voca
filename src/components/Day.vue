<template>
    <h1>Day {{day}}</h1>
    <span v-if="words.length === 0">Loading...</span>
    <table>
        <tbody>
            <Word v-for="word in words" :key="word.id" :word="word" />
        </tbody>
    </table>
    <div>
        <button @click="prev" :disabled="day === 1 ? true : false">이전</button>
        <button @click="next" :disabled="day === days.length ? true : false">다음</button>
    </div>
    <div>
        <button @click="dayDel">Day 삭제</button>
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { inject, ref } from 'vue';
    import Word from "./Word.vue";

    const axios = inject('$axios');
    const route = useRoute();

    const words = ref([]);
    const days = ref([]);
    const currentDay = ref([]);

    const router = useRouter();

    const { day } = route.params;

    const fetchWords = async () => {
        const response = await axios.get(`http://localhost:3001/words?day=${day}`);
        words.value = response.data;
    };
    fetchWords();

    const fetchDays = async () => {
        const response = await axios.get('http://localhost:3001/days');
        days.value = response.data;
    };
    fetchDays();

    const fetchCurrentDay = async () => {
        const response = await axios.get(`http://localhost:3001/days?day=${day}`);
        currentDay.value = response.data;
    };
    fetchCurrentDay();

    function prev() {
        router.push(`/day/${Number(day) - 1}`);
    }

    function next() {
        router.push(`/day/${Number(day) + 1}`);
    }

    function dayDel() {
        const msg = '단어들도 모두 삭제됩니다.\n삭제 하시겠습니까?';

        if ( confirm(msg) ) {
            if ( words.value.length === 0 ) {
                axios.delete(`http://localhost:3001/days/${currentDay.value[0].id}`)
                .then(res => {
                    if ( res.status == 200 ) {
                        router.push('/');
                    }
                });

            } else {
                words.value.forEach(async (word) => {
                    await axios.delete(`http://localhost:3001/words/${word.id}`)
                    .then(res => {
                        if ( res.status == 200 ) {
                            axios.delete(`http://localhost:3001/days/${currentDay.value[0].id}`)
                            .then(res => {
                                if ( res.status == 200 ) {
                                    router.push('/');
                                }
                            })
                        }
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>