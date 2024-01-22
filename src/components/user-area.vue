<template>
    <main class="home-p w-100 c-1" v-if="user">
        <section class="align-items-center card d-flex flex-column h-75 justify-content-around  w-50">
            <div class="d-flex flex-column justify-content-between align-items-center text-center w-75 gap-2">
                <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <el-form :model="user" label-width="120px" style="direction: rtl">
                    <el-form-item label="שם מלא" class="ddd">
                        <el-input v-model="user.fullName" />
                    </el-form-item>
                    <el-form-item label="מספר פלאפון" class="ddd">
                        <el-input v-model="user.phoneNumber" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="w-75">
                <div class="my-2"></div>
                <div class="d-flex flex-column align-items-center">

                    <p>כאן אתה יכול לערוך את סט הכישורים</p>
                    <div class="tags-container">
                        <el-tag v-for="skill in user.fieldOfInterest" :key="itemIterator.next().value?.label" class="mx-1"
                            closable :disable-transitions="false" @close="handleClose(skill)">
                            {{ skill }}
                        </el-tag>
                        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
                            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                            + New Tag
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center flex-column">

                <p>כאן אתה בוחר האם להעלים את עצמך מהאתר</p>
                <el-switch v-model="user.isHidden" size="large" active-text="נסתר" inactive-text="נראה" />
            </div>
            <el-button type="priamry" @click="save">שמור</el-button>
            <el-button type="danger" @click="open">מחק את כל המודעות שפרסמת בלוח</el-button>
        </section>
    </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { nextTick, ref } from 'vue'
import { ElInput } from 'element-plus'

import { getLocalStorage } from "../services/localStorage.service"
import { putUser  } from "../services/user.service"
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const open = () => {
  ElMessageBox.alert('מרגע שתאשר את המחיקה לא תוכל לשחזר את המודעות שפרסמת', 'שים לב!', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'מחק',
    callback: (action: Action) => {
      ElMessage({

        type: 'success',
        message: `המודעות נמחקו!`,
      });
      console.log("delete");
      

    },
  })
}

const save = () => {
  ElMessageBox.alert('אתה בטוח שברצונך לשמור', 'אישור שמירה', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'כן',
    callback: (action: Action) => {
      ElMessage({

        type: 'success',
        message: `הפרטים נשמרו`,
      });
      OnputUser();
      

    },
  })
}
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (skill: string) => {
    user.fieldOfInterest = user.fieldOfInterest.filter(f => f !== skill)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        user.fieldOfInterest.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
const formRef = ref<FormInstance>()
const user = reactive(getLocalStorage("linkedin8132user")?.cleanUser)


const submitForm = (formEl: FormInstance | undefined) => {
    const data = `${newInterest.data}`
    user.fieldOfInterest = [...user.fieldOfInterest, data]
    newInterest.data = ""
}

const OnputUser = async () => {
    await putUser(user)
}

const newInterest = reactive({ data: "" })

const items = [
    { type: '', label: 'Tag 1' },
    { type: 'success', label: 'Tag 2' },
    { type: 'info', label: 'Tag 3' },
    { type: 'danger', label: 'Tag 4' },
    { type: 'warning', label: 'Tag 5' },
]

function* iterateItems() {
    let index = 0;
    const length = items.length;

    while (true) {
        yield items[index];
        index = (index + 1) % length;
    }
}

const itemIterator = iterateItems();
</script>

<style lang="scss" scoped>
input {
    text-align: center
}

.home-p section .input-20 {}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-block: 12px;
}
</style>