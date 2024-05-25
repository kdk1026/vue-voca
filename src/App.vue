<template>
    <Header />
    <router-view :key="$route.fullPath"></router-view>
</template>

<script setup>
    import Header from "./components/Header.vue";
</script>

<style>
    @import "./assets/css/index.css";
</style>
