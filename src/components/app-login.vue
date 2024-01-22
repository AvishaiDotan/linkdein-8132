<template>
    <main class="w-100 d-flex flex-column">
        <section class="login-layout flex-column">
            <div class=" my-2">בכניסה הראשונה לאתר שם המשתמש הוא המספר האישי והסיסמא היא מספר הפלאפון</div>
            <p class="home-p mb-5" style="direction: rtl;">
                <strong>שימו לב</strong>
                <span>&nbsp;</span>
                <span>מיד לאחר הכניסה תדרשו לשנות את הסיסמא</span>
            </p>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm centered-div" style="direction: rtl">
                <el-form-item label="שם משתמש" prop="userId">
                    <el-input v-model="ruleForm.userId" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="סיסמא" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                </el-form-item>
            </el-form>
            <div>
            </div>
            <div>
                <p class="home-p p-1 p-5" style="direction: rtl;">
                    <span>בעיות בהרשמה?</span>
                    <span>&nbsp;</span>
                    <span @click="() => callNumber('0502202483')">
                        <el-button type="primary">צרו קשר</el-button>
                    </span>
                </p>
            </div>
            <styled-login-text></styled-login-text>
        </section>
    </main>
</template>
  
<script lang="ts" setup>
import styledLoginText from './styled-login-text.vue';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"

import {login} from '../services/user.service';
// const authenticateUser = () => {}
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const isFirstTimeEntering = true
const validateUserId = (rule: any, value: any, callback: any) => {
    if (ruleForm.userId === '') return callback(new Error("חסר שם משתמש"))

    const regexPattern = /^-?\d+$/;
    var isValid = regexPattern.test(value)

    return isValid ? callback() : callback(new Error('שם המשתמש אינו תקין'))
}
const validatePass = (rule: any, value: any, callback: any) => {
    if (ruleForm.userId === "") return
    if (ruleForm.pass === '') return callback(new Error("חסרה סיסמא"))

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^-?\d+$/;
    const isValid = (isFirstTimeEntering) ? phoneRegex.test(value) : passwordRegex.test(value);

    return (isValid) ? callback() : callback(new Error('הסיסמא אינה תקינה נסה שנית'))

}

const ruleForm = reactive({
    pass: '',
    userId: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    userId: [{ validator: validateUserId, trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    try {

        if (!formEl) return
        formEl.validate(async (valid) => {
            if (valid) {
                try {
                    await backendValidation(ruleForm.pass, ruleForm.userId)
                    router.push("/")
                } catch (e) {
                    console.log("invalid");
                return false
                }

            } else {
                console.log("invalid");
                return false
            }
        })
    } catch {

    }
}

const backendValidation = async (pass, userId, cb) => {
    try {
        await login(userId, pass)
        return true
    } catch {
        return false;
    }
}
</script>

<style lang="scss">
.login-layout {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
}

.centered-div {
    background-color: #ffffff;
    padding: 20px;
    text-align: center;
    border: 1px solid #6fa6dc;
    direction: rtl;

    label {
        direction: ltr;
    }
}
</style>