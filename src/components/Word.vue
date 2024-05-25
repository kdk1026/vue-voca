<template>
    <tr :class="isDone ? 'off' : ''" v-if="word.id != 0">
        <td>
            <input type="checkbox" :checked="isDone" @change="toggleDone()" />
        </td>
        <td>{{word.eng}}</td>
        <td v-if="isShow">{{word.kor}}</td>
        <td v-else></td>
        <td>
            <button @click="toggleShow">
                뜻 {{isShow ? '숨기기' : '보기'}}
            </button>
            <button @click="del" class="btn_del">삭제</button>
        </td>
    </tr>
</template>

<script setup>
    import { inject, ref } from 'vue';

    const props = defineProps({
        word: Object
    });
    const { word } = props;

    const axios = inject('$axios');

    const isShow = ref(false);
    const isDone = ref(word.isDone);

    function toggleShow() {
        isShow.value = !isShow.value;
    }

    function toggleDone() {
        axios.put(`http://localhost:3001/words/${word.id}`, {
            ...word,
            isDone: !isDone.value,
        })
        .then(res => {
            if (res.status === 200) {
                isDone.value = !isDone.value;
            }
        })
    }

    function del() {
        if ( confirm('삭제 하시겠습니까?') ) {
            axios.delete(`http://localhost:3001/words/${word.id}`)
            .then(res => {
                if (res.status === 200) {
                    word.id = 0;
                }
            });
        }
    }
</script>

<style scoped>

</style>