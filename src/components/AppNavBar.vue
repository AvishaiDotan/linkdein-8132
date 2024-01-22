<template>
    
    <nav class="position-relative">
        <div  v-on:click='toggleCollapse' class="toggle-button">
            <el-icon v-if="isCollapse.valueOf()"><ArrowRightBold /></el-icon>
            <el-icon v-else><ArrowLeftBold /></el-icon>
        </div>
        <el-menu default-active="2" class="el-menu-vertical-demo h-100" :collapse="isCollapse"
        @select="handleSelect"
            active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff">
        <el-menu-item index="1">
                <el-icon><House /></el-icon>
                <template #title>בית</template>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon><Notebook /></el-icon>
                <template #title>לוח קשרים</template>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon>
                    <document />
                </el-icon>
                <template #title>לוח משרות</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <User/>
                </el-icon>
                <template #title>איזור אישי</template>
            </el-menu-item>
        </el-menu>
    </nav>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    if (key === '1') {
        router.push('/')
    }
    else if (key === "2") {
        router.push('/connections')
    }
    else if (key === "3") {
        router.push('/jobs')
    }
    else if (key === "4") {
        router.push('/user')
    }

}

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value 
    
}


import {
  Document,
  Menu as IconMenu,
  Notebook,
  ArrowRightBold,
  User,
  House,
  ArrowLeftBold
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
  
<style lang="scss">
.flex-grow {
    flex-grow: 1;
}

.logo-style {
    text-decoration: none;
    font-size: 3rem !important;
}

.links li {
    height: 100%;
    font-size: 2rem;
}

nav ul {
    height: 80px;
}

.user-style {
    flex-basis: 60px;
    font-size: 36px;
    background-color: #0d6efd;
    color: white;
}

.toggle-button {
    position: absolute;
    inset-block-end: 50%;
    inset-inline-end: 0;
    z-index: 10;
    transform: translate(37%, -50%);
    background: #545c64;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: white;
    border: 1px solid white;
    cursor: pointer;
    &.transform-180 {
        transform: rotate(180);
    }
}

nav {
    transition: 0.3s;
}


.el-popper.is-dark {
        color: #ffffff !important;
        background: #545c64 !important;
        border: 1px solid #ffffff !important;
    }
</style>
  