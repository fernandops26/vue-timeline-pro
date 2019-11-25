<template>
    <div ref="updateItem" class="timeline_pro_update">
        <div class="timeline_pro_update_left">
            <input type="date" v-model="dateItem" placeholder="date">
        </div>
        <div class="timeline_pro_update_center">
            <span class="timeline_pro_update_center_bullet">
                <span class="timeline_pro_update_center_bullet_circle" @mousedown="toggleMenuIconList"></span>
                <img :src="iconItem" alt="">
            </span>
            <div v-if="iconList" :class="'timeline_pro_update_center_iconlist ' + (iconListVisible ? 'is-visible' : '')" @blur.native="blurMenuIconList">
                <div class="timeline_pro_update_center_iconlist-item" :key="indexItem" v-for="(item, indexItem) of iconList">
                    <img :src="item" alt="icon" @click="selectIcon(item)">
                </div>
            </div>
            <span :class="'timeline_pro_update_center_line ' + (isLast ? 'is-last' : '')"></span>
        </div>

        <div class="timeline_pro_update_right">
            <div class="timeline_pro_update_right_head">
                <span class="timeline_pro_update_right_head_date">
                    <Date :date="dateItem" @changeDate="setDate"/>
                </span>
                <div class="timeline_pro_update_right_head_title timeline_pro_update_right_head_title-editable">
                    <textarea class="timeline_pro_update_textarea title" maxlength="50" type="text" v-model="titleItem" placeholder="Add title" @input="autoGrowTextarea('titleArea')" ref="titleArea"></textarea>
                    <input type="text" class="timeline_pro_update_right_head_url" style="width: 100%;" v-model="urlItem" placeholder="URL">
                </div>
            </div>
            <div class="timeline_pro_update_right_content">
                <textarea class="timeline_pro_update_textarea" v-model="descriptionItem" placeholder="Add description" @input="autoGrowTextarea('descriptionArea')" ref="descriptionArea"></textarea>
            </div>

            <div class="timeline_pro_update_right_buttons">
                <div class="timeline_pro_update_right_buttons_button acept" @click="saveItem">Aceptar</div>
                <div class="timeline_pro_update_right_buttons_button cancel" @click="$emit('cancel')">Cancelar</div>
            </div>
        </div>
    </div>
</template>

<script>
import Date from './Date.vue';

export default {
    name: 'UpdateForm',
    props: ['index', 'title', 'icon', 'description', 'date', 'accept', 'iconList', 'isLast', 'url'],
    data() {
        return {
            dateItem: null,
            descriptionItem: null,
            titleItem: null,
            iconItem: null,
            urlItem: null,
            iconListVisible: false
        }
    },
    created() {
        this.dateItem = this.date;
        this.descriptionItem = this.description;
        this.titleItem = this.title;
        this.urlItem = this.url;
        this.iconItem = this.icon;
    },
    mounted() {
        this.autoGrowTextarea('titleArea');
        this.autoGrowTextarea('descriptionArea');
    },
    components: {
        Date
    },
    methods: {
        saveItem() {
            const newData = {
                timelineId: this.$props.index,
                date: this.dateItem,
                description: this.descriptionItem,
                title: this.titleItem,
                url: this.urlItem,
                icon: this.iconItem
            }

            this.accept(newData, this.$props.index)
        },
        autoGrowTextarea(areaName) {
            const element = this.$refs[areaName];
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        },
        toggleMenuIconList() {
            if (!this.iconList || !this.iconList.length) {
                return;
            }

            this.iconListVisible = !this.iconListVisible;
        },
        blurMenuIconList() {
            this.iconListVisible = false;
        },
        selectIcon(icon) {
            this.iconItem = icon;
        },
        setDate(date) {
            this.dateItem = date;
        }
    }
}
</script>

<style>

</style>