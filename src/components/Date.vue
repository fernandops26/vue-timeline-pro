<template>
    <div class="timeline_pro_date_selector">
        <select class="timeline_pro_date_selector-month" v-model="month" @change="emitChange">
            <option :value="item.value" v-for="item of getMonths()">{{item.label}}</option>
        </select>
    
        <select class="timeline_pro_date_selector-day" v-model="day" @change="emitChange">
            <option :value="item" v-for="item of getDays()">{{item}}</option>
        </select>
        
        <select class="timeline_pro_date_selector-year" v-model="year" @change="emitChange">
            <option :value="item" v-for="item of getYears()">{{item}}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        date: {
            type: Date
        }
    },
    name: 'date',
    data() {
        return {
            months: [],
            days: [],
            years: [],
            day: null,
            month: null,
            year: null,
            usableDate: new Date()
        }
    },
    created() {
        this.setInitialDate();
        this.splitDate();
    },
    methods: {
        getMonths() {
            const months = [
                'January',
                'Febuary',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            return months.map((item, index) => ({label: item, value: (index + 1)}));
        },
        getDays() {
            let days = this.getDaysInMonth(this.month, this.year);
            days = new Array(days).fill(0);

            return days.map((x, i) => i + 1);
        },
        getYears() {
            const currentYear = new Date().getFullYear();
            const numberOfYears = currentYear - (currentYear - 90);

            let years = new Array(numberOfYears).fill(0);

            return years.map((x, i) => (currentYear - i));
        },
        setInitialDate() {
            this.usableDate = this.date;
        },
        splitDate() {
            this.day = this.usableDate.getDate();
            this.month = this.usableDate.getMonth() + 1;
            this.year = this.usableDate.getFullYear();
        },
        getDaysInMonth(month,year) {
            return new Date(year, month, 0).getDate();
        },
        getCompleteDate() {
            return new Date(this.year, this.month - 1, this.day);
        },
        emitChange() {
            this.$emit('changeDate', this.getCompleteDate());
        }
    }
}
</script>

<style>

</style>