import axios from "axios";

export const getDays = () => {
    return axios.get(`${process.env.VUE_APP_API_URL}/days`);
}

export const createDay = (daysLength) => {
    return axios.post(`${process.env.VUE_APP_API_URL}/days`, {
        day: daysLength + 1
    });
}

export const deleteDay = (id) => {
    return axios.delete(`${process.env.VUE_APP_API_URL}/days/${id}`);
}

export const getDay = (day) => {
    return axios.get(`${process.env.VUE_APP_API_URL}/days?day=${day}`);
}