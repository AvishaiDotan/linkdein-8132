<template>
    <main class="w-100 d-flex flex-column">
        <section class="login-layout flex-column">
            <div class=" my-2">בכניסה הראשונה לאתר שם המשתמש והסיסמא הוא המספר האישי</div>
            <p v-if="!isChangePassword.valueOf()" class="home-p mb-5" style="direction: rtl;">
                <strong>שימו לב</strong>
                <span>&nbsp;</span>
                <span>מיד לאחר הכניסה תדרשו לשנות את הסיסמא</span>
            </p>
            <p v-else class="home-p mb-5" style="direction: rtl;">
                <strong>בחר סיסמא חדשה</strong>
            </p>
            <el-form v-if="!isChangePassword.valueOf()" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules"
                label-width="120px" class="demo-ruleForm centered-div" style="direction: rtl">
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
            <el-form v-else ref="ruleFormRef2" :model="ruleForm2" status-icon :rules="rules2" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="Password" prop="pass">
                    <el-input v-model="ruleForm2.pass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Confirm" prop="checkPass">
                    <el-input v-model="ruleForm2.checkPass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="2 X 15 = ?" prop="age">
                    <el-input v-model.number="ruleForm2.age" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm2(ruleFormRef2)">Submit</el-button>
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

import { login, changePasword, isThereUser } from '../services/user.service';
import { callNumber } from '../services/util.service';
// const authenticateUser = () => {}

const isChangePassword = ref(false)
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
    const ruleFormRef2 = ref<FormInstance>()
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

const checkAgenew = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('2 X 15 = ?'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('רק ספרות בקשה'))
    } else {
      if (value !== 30) {
        callback(new Error('טעית בחישוב'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePassnew = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm2.checkPass !== '') {
      if (!ruleFormRef2.value) return
      ruleFormRef2.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2new = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm2.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules2 = reactive<FormRules<typeof ruleForm2>>({
  pass: [{ validator: validatePassnew, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2new, trigger: 'blur' }],
  age: [{ validator: checkAgenew, trigger: 'blur' }],
})

const ruleForm = reactive({
    pass: '',
    userId: '',
})

const ruleForm2 = reactive({
  pass: '',
  checkPass: '',
  age: '',
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
                    await backendValidation(ruleForm.pass, ruleForm.userId, () => { })
                    if (!isThereUser().cleanUser.isFirstTimeEntering)
                    {
                        router.push("/")
                        return
                    }
                    isChangePassword.value = true
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

const submitForm2 = async (formEl: FormInstance | undefined) => {
    try {
        if (!formEl) return
        formEl.validate(async (valid) => {
            if (valid) {
                try {
                    await changePasword(ruleForm2.pass, ruleForm.userId)
                    
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