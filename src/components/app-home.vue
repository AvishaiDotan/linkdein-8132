<template>
    <main class="app-home d-flex flex-column">
        <p class="home-p  p-3 c-1 f-4">
            <strong> גדוד 8132</strong>
            <span>&nbsp;</span>
            <span>
                אפליקציית הקשרים של
            </span>
        </p>
        <AppHero />
        <p class="home-p p-1 f-3  c-2" style="direction: rtl;">
            <span>כאן תוכלו</span>
            <span>&nbsp;</span>
            <span>למצוא עזרה</span>
            <span>&nbsp;</span>
            <strong>בכל נושא</strong>
            <span>&nbsp;</span>
            <span>שרק תרצו</span>
        </p>
        <nav class="d-flex align-items-center justify-content-center flex-wrap">
            <el-button @click='() => router.push("/user")'>איזור אישי</el-button>
            <el-button @click='() => router.push("/connections")' type="primary">לוח הקשרים</el-button>
            <el-button @click='() => router.push("/jobs")' type="success">לוח המשרות</el-button>
        </nav>
    </main>
</template>

<script setup>
import AppHero from './AppHero.vue';
import { useRouter } from "vue-router"

var router = useRouter();
</script>

<style lang="scss" scoped>
.app-home {
    flex-grow: 1;

    & strong {
        font-weight: 900;
    }

    nav {
        flex-grow: 1;
    background: #e0e0e0;
    }
}



</style>