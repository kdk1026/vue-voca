<template>
    <form @submit="onSubmit">
        <div class="input_area">
            <label>Eng</label>
            <input type="text" placeholder="computer" v-model="engModel" />
        </div>
        <div class="input_area">
            <label>Kor</label>
            <input type="text" placeholder="컴퓨터" v-model="korModel" />
        </div>
        <div class="input_area">
            <label>Day</label>
            <select v-model="dayModel">
                <option v-for="day in days" :key="day.id" :value="day.day">
                    {{day.day}}
                </option>
            </select>
        </div>
        <button :style="{opacity: isLoading ? 0.3 : 1}">
            {{isLoading ? "Saving..." : "저장"}}
        </button>
    </form>
</template>

<script setup>
    import { inject, ref } from "vue";
    import { useRouter } from "vue-router";

    const axios = inject('$axios');

    const days = ref([]);
    const isLoading = ref(false);

    const engModel = defineModel('engModel');
    const korModel = defineModel('korModel');
    const dayModel = defineModel('dayModel');

    const router = useRouter();

    const fetchDays = async () => {
        const response = await axios.get('http://localhost:3001/days');
        days.value = response.data;
    };
    fetchDays();

    function onSubmit(e) {
        e.preventDefault();

        if ( !isLoading.value ) {
            isLoading.value = true;

            axios.post('http://localhost:3001/words', {
                day: dayModel.value,
                eng: engModel.value,
                kor: korModel.value,
                isDone: false                
            })
            .then(res => {
                if (res.status === 201) {
                    alert('생성이 완료 되었습니다.');
                    router.push(`/day/${dayModel.value}`);
                    isLoading.value = false;
                }
            });
        }
    }
</script>

<style scoped>

</style>