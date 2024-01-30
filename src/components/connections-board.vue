<template>
    <section class="d-flex flex-column w-100" v-if="tableData.value && filters.value">
        <styled-thin-row></styled-thin-row>
        <p class="home-p p-1 f-3  c-3" style="direction: rtl;">
            <span>חיילי הגדוד מחכים שתרימו אליהם צלצול - אז למה אתם מחכים?</span>
        </p>
        <div class="my-3 d-flex align-items-center justify-content-center">

            <el-input v-model="input3" placeholder="חיפוש" class="input-with-select w-50 " @change="onSearch">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
            <el-button @click="() => tableData.value = rowtableData.value">Clear</el-button>

        </div>
        <div class="tags-container d-flex justify-content-center align-items-center">
            <div class="align-items-center d-flex flex-wrap gap-1 justify-content-center text-center w-75">
                <el-tag v-for="skill in getRandomValuesFromList(filters.value)" :key="skill" :type="skill.type" class="mx-1 cursor-pointer"
                    :disable-transitions="false" @click="onSearch(skill.text)">
                    {{ skill.text }}
                </el-tag>
            </div>
        </div>
        <div class="tags-container d-flex justify-content-center align-items-center">
            <div class="align-items-center d-flex flex-wrap gap-1 justify-content-center text-center w-75">

            </div>
        </div>

        <div class="table-wrapper">

            <el-table :data="tableData.value" table-layout="auto" height="400px">
                <el-table-column fixed prop="fullName" label="שם" sortable />
                <el-table-column prop="fieldsOfInterest" label="יכול לעזור ב">
                    <template #default="scope">
                        <el-tag v-for="skill in tableData.value[scope.$index]?.fieldsOfInterest ?? []" :key="skill.key"
                            class="mx-1" :type="skill.type" effect="plain">
                            {{ skill.text }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="phoneNumber" label="מספר">
                    <template #default="scope">
                        <span style="cursor: pointer;" @click="() => callNumber(scope.row.phoneNumber)">{{scope.row.phoneNumber}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button link type="primary" size="small">העלה בדרגה</el-button>
                <el-button link type="primary" size="small">הורד בדרנה</el-button>
            </template>
        </el-table-column> -->
            </el-table>
        </div>
    </section>
</template>
  
<script lang="ts" setup>
import styledThinRow from './styled-thin-row.vue'
import { Search } from '@element-plus/icons-vue'
import { read } from "../services/board.service"
import { reactive, onMounted, ref, isProxy, toRaw } from 'vue'
import {callNumber} from '../services/util.service';
const tableData = reactive({
    value: ''
})

const rowtableData = reactive({
    value: ''
})
const filters = reactive([])
const input3 = ref("")
const onSearch = (val) => {
    tableData.value = rowtableData.value.filter(o => {
        return o.fullName.includes(val) || toRaw(o.fieldsOfInterest).some(f => f.text.includes(val))
    })

}
const getData = async () => {
    const { users } = await read();

    users.forEach(u => {
        u.fieldsOfInterest = u.fieldsOfInterest.split(",").map(f => ({
            key: itemIterator.next().value?.label,
            type: itemIterator.next().value?.type,
            text: f
        }));
    });
    
    rowtableData.value = tableData.value = users;
};


onMounted(async () => {
    await getData();
    extractCanHelpWithValues(tableData.value)
})
const filterTag = (value, row) => {

}


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

const extractCanHelpWithValues = (data) => {
    
    const result = [];

    data.forEach(i => {
                i.fieldsOfInterest.forEach(t => {
                    result.push({
                        text: t.text,
                        value: t.text,

                    })
                })
            })
        ;


    filters.value = result;
}

function getRandomValuesFromList(list) {
    if (!Array.isArray(list) || list.length < 7) {
        throw new Error('Input must be an array with at least 7 elements');
    }

    const shuffledList = [...list].sort(() => Math.random() - 0.5);
    return shuffledList.slice(0, 7);
}
</script>

<style>
.table-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 49px;
}

.cursor-pointer {
    cursor: pointer;
}
.el-table__inner-wrapper, .el-table--fit {
    height: calc(100vh - 230px) !important;
}
</style>