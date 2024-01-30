<template>
    <main class="app-home d-flex flex-column flex-grow-1">
        <transition name="fade" mode="out-in">
            <div class="image-con">
                <!-- <div v-for="i in 13"></div> -->
                <div v-for="i in 13" :key="i - 1 + counter" class="divi" :class="getClass(i - 1)">
                    <img
                        :src="i - 1 + counter === 0 ? `/src/assets/hero/${i - 1 + counter}.gif` : `/src/assets/hero/${i - 1 + counter}.jpg`" />
                </div>
            </div>
        </transition>
        <!-- <p class="home-p  f-4 p-2">

            <strong> גדוד 8132</strong>
            <span>&nbsp;</span>
            <span>
                אפליקציית הקשרים של
            </span>
        </p>
        <AppHero />
         -->
        <!-- <p class="home-p p-1 f-3  c-2" style="direction: rtl;">
            <span>כאן תוכלו</span>
            <span>&nbsp;</span>
            <span>למצוא עזרה</span>
            <span>&nbsp;</span>
            <span>בכל נושא</span>
            <span>&nbsp;</span>
            <span>שרק תרצו</span>
            <span>&nbsp;</span>
            <strong>,פרסום משרות</strong>
            <span>&nbsp;</span>
            <strong>שירותים</strong>
            <span>&nbsp;</span>
            <span>ויצירת קשר עם</span>
            <span>&nbsp;</span>
            <strong>כל חיילי הגדוד</strong>
        </p> -->

        <p style="font-family: `Amatic SC`;font-size: 1.5rem;
    text-align: center;
    color: white;" class="align-items-center d-flex f-1 justify-content-center p-4">
            ברוכים הבאים לאפליקציית הקשרים של גדוד 8132, כאן תוכלו להיעזר בחברי הגדוד, לחפש משרות ושירותים
        </p>
        <nav class="d-flex align-items-center justify-content-center flex-wrap flex-grow-1">
            <el-button size="large" @click='() => router.push("/user")'>איזור אישי</el-button>
            <el-button size="large" @click='() => router.push("/connections")' type="primary">לוח הקשרים</el-button>
            <el-button size="large" @click='() => router.push("/jobs")' type="success">לוח המשרות</el-button>
        </nav>
    </main>
</template>

<script setup>
import AppHero from './AppHero.vue';
import { useRouter } from "vue-router"
import { ref, onMounted } from 'vue'
var router = useRouter();

const counter = ref(0)

const getClass = (i) => {
    if (i === 1) {
        return 'video';
    } else if (i === 10) {
        return 'video-2';
    } else {
        return '';
    }
}
onMounted(() => {
    setInterval(updateCounter, 3000);
})

const updateCounter = () => {
    // Increment the counter
    counter.value = counter.value + 1;

    // If the counter reaches 24, reset it to 0
    if (counter.value + 13 > 37) {
        counter.value = 0;
    }

    // Update the HTML element with the new counter value

}

// Set an interval to call the updateCounter function every 3 seconds

</script>

<style lang="scss" scoped>
.home-p {
    border-block-end: 7px solid #6fa6dc;

}

.app-home {
    background-color: #6fa6dc;
}

.image-con {
    height: 250px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
        ". video-2 video-2 . ."
        ". . . . ."
        ". . video video .";

}

.divi {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.video {
    grid-column: 2/4;
    grid-row: 1;
}

.video-2 {
    grid-column: 3/5;
    grid-row: 3;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}</style>