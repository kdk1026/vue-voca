import axios from "axios";

export const getWords = (day) => {
    return axios.get(`${process.env.VUE_APP_API_URL}/words?day=${day}`);
};

export const createWord = (day, eng, kor) => {
    return axios.post(`${process.env.VUE_APP_API_URL}/words`, {
        day: day,
        eng: eng,
        kor: kor,
        isDone: false
    });
}

export const deleteWord = (id) => {
    return axios.delete(`${process.env.VUE_APP_API_URL}/words/${id}`);
}

export const updateWord = (id, word, isDone) => {
    return axios.put(`${process.env.VUE_APP_API_URL}/words/${id}`, {
        ...word,
        isDone: isDone,
    });
}