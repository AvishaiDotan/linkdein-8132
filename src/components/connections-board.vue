<template>
    <section class="d-flex flex-column w-100">
        <styled-thin-row></styled-thin-row>
        <p class="home-p p-3" style="direction: rtl;">
            <span>חיילי הגדוד מחכים שתרימו אליהם צלצול - אז למה אתם מחכים?</span>
        </p>

        <div class="table-wrapper">

            <el-table :data="tableData" table-layout="auto">
                <el-table-column fixed prop="fullName" label="שם" sortable />
                <el-table-column prop="job" label="מקצוע" sortable />
                <el-table-column prop="canHelpWith" label="יכול לעזור ב"
                    :filters="[...extractCanHelpWithValues(tableData)]" :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template #default="scope">
                        <el-tag v-for="skill in tableData[scope.$index].canHelpWith.split(',').map(str => str.trim())"
                            :key="itemIterator.next().value?.label" class="mx-1" :type="itemIterator.next().value?.type"
                            effect="plain">
                            {{ skill }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="phoneNumber" label="מספר" />
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

const tableData = [
    {
        fullName: "אבי כהן",
        phoneNumber: "050-1112233",
        job: "מתכנת",
        canHelpWith: "תכנות, בעיות מחשבים, לימוד אנגלית"
    },
    {
        fullName: "שרה לוי",
        phoneNumber: "054-5556677",
        job: "כותבת עיתון",
        canHelpWith: "כתיבה יצירתית, תרגום, ייעוץ עיתונאי"
    },
    {
        fullName: "דני כהן",
        phoneNumber: "052-9876543",
        job: "סוכן נדל''ן",
        canHelpWith: "שוק הנדל''ן, ייעוץ רכישה, שיפוצים"
    },
    {
        fullName: "רבקה כהנא",
        phoneNumber: "053-1112233",
        job: "דודקטיב",
        canHelpWith: "חקיקה, חקירות, אבחון פלילי"
    },
    {
        fullName: "אורי כהן",
        phoneNumber: "050-3334455",
        job: "מנהל פרויקטים",
        canHelpWith: "ניהול פרויקטים, תכנון ארגוני, אוטומציה"
    },
    // הוסף עוד 15 דוגמאות...
];

const filterTag = (value, row) => {
    return row?.canHelpWith?.includes(value)
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

    data.forEach(item => {
        const helpWithArray = item.canHelpWith.split(', ');

        helpWithArray.forEach(helpWith => {
            result.push({ text: helpWith, value: helpWith });
        });
    });

    return result;
}
</script>

<style>
.table-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 49px;
}
</style>