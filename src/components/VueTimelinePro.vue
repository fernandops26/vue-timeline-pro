<template>
    <div class="timeline_pro">
        <br>
        <br>
        <br>
        <FirstPlus @onDraft="createDraft(0, 'left')" v-if="!readOnly"/>
        <div
            :key="item.timelineId"
            v-for="(item, i) in updateList"
        >
        <UpdateForm
            v-if="!readOnly && (item.mode == 'draft' || item.mode == 'edit') && draftDirection == 'left'"
            :key="item.timelineId"
            :title="item.title"
            :description="item.description"
            :date="item.date"
            :icon="item.icon"
            :url="item.url"
            :index="item.timelineId"
            :iconList="iconList"
            :isLast="i == updateList.length - 1"
            :accept="onAcceptUpdate"
            @cancel="cancelUpdate"
        />
        <Update
            v-if="item.mode == 'normal'"
            :key="item.timelineId"
            :title="item.title"
            :description="item.description"
            :date="item.date"
            :icon="item.icon"
            :url="item.url"
            :index="item.timelineId"
            @onEdit="editUpdate(item.timelineId)"
            @onRemove="removeUpdate(item.timelineId)"
            @onDraft="createDraft"
            :readOnly="readOnly"
            :isLast="i == updateList.length - 1"
        />
        <UpdateForm
            v-if="!readOnly && (item.mode == 'draft' || item.mode == 'edit') && draftDirection == 'right'"
            :key="item.timelineId"
            :title="item.title"
            :description="item.description"
            :date="item.date"
            :icon="item.icon"
            :url="item.url"
            :index="item.timelineId"
            :iconList="iconList"
            :isLast="i == updateList.length - 1"
            :accept="onAcceptUpdate"
            @cancel="cancelUpdate"
        />
        </div>
    </div>
</template>

<script>
import Update from './Update.vue';
import UpdateForm from './UpdateForm.vue';
import FirstPlus from './FirstPlus.vue';

export default {
    name: 'VueTimelinePro',
    props: {
        iconList: {
            type: Array,
            default: () => [
                'https://image.flaticon.com/icons/svg/2200/2200787.svg',
                'https://www.flaticon.com/premium-icon/icons/svg/2200/2200815.svg',
                'https://image.flaticon.com/icons/svg/2200/2200791.svg',
                'https://image.flaticon.com/icons/svg/1684/1684439.svg',
                'https://image.flaticon.com/icons/svg/1373/1373259.svg',
                'https://image.flaticon.com/icons/svg/1373/1373276.svg',
                'https://image.flaticon.com/icons/svg/1373/1373294.svg',
                'https://image.flaticon.com/icons/svg/1373/1373288.svg',
                'https://image.flaticon.com/icons/svg/1006/1006106.svg',
                'https://image.flaticon.com/icons/svg/1006/1006124.svg',
                'https://image.flaticon.com/icons/svg/1006/1006636.svg',
                'https://image.flaticon.com/icons/svg/124/124754.svg',
                'https://image.flaticon.com/icons/svg/124/124764.svg',
                'https://image.flaticon.com/icons/svg/124/124790.svg',
                'https://image.flaticon.com/icons/svg/1140/1140033.svg',
                'https://image.flaticon.com/icons/svg/897/897066.svg',
                'https://image.flaticon.com/icons/svg/1027/1027567.svg',
                'https://image.flaticon.com/icons/svg/924/924514.svg',
                'https://image.flaticon.com/icons/svg/1029/1029132.svg'
            ]
        },
        modelItem: {
            default: () => (
                {
                    index: 'index',
                    title: 'title',
                    description: 'description',
                    date: 'date',
                    icon: 'icon',
                    url: 'url'
                }
            )
        },
        items: {
            type: Array,
            default: () => [
                {
                    icon: 'https://image.flaticon.com/icons/svg/2200/2200787.svg',
                    title: 'Primero titulo',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum aliquam porro sunt quis molestiae voluptates reiciendis pariatur eveniet, enim illo. Deserunt fuga accusamus soluta eaque veritatis et quo aliquam sed.',
                    date: new Date(),
                    url: '#'
                },
                {
                    icon: 'https://image.flaticon.com/icons/svg/2200/2200787.svg',
                    title: 'Segundo titulo',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum aliquam porro sunt quis molestiae voluptates reiciendis pariatur eveniet, enim illo. Deserunt fuga accusamus soluta eaque veritatis et quo aliquam sed.',
                    date: new Date(),
                    url: '#'
                }
            ]
        },
        readOnly: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    },
    data() {
        return {
            updateList: [],
            draftDirection: 'right',
            updateToForm: {},
            workingIndex: -1,
            workingTimelineId: null
        }
    },
    components: {
        Update,
        UpdateForm,
        FirstPlus
    },
    created() {
        this.loadData()
    },
    methods: {
        loadData() {
            this.updateList = this.items.map(this.fillObject)
        },
        editUpdate(timelineId) {
            // another new approach
            this.resetWorkingItem();
            const item = this.updateList.find(item => item.timelineId == timelineId);
            item.mode = 'edit';
            this.workingTimelineId = timelineId;
        },
        removeUpdate(timelineId) {
            if (confirm("Sure to remove?")) {
                const indexToRemove = this.updateList.findIndex((item) => item.timelineId == timelineId);

                this.updateList.splice(indexToRemove, 1);
                this.resetWorkingItem();
            }
        },
        fillObject(item, index) {
            const { title, description, date, icon, url } = this.$props.modelItem;

            return {
                timelineId: this.generateId(),
                title: item[title],
                description: item[description],
                date: item[date],
                icon: item[icon],
                url: item[url],
                mode: 'normal'
            }
        },
        resetWorkingItem() {
            const workingTimelineId = this.workingTimelineId;
            if (workingTimelineId) {
                const itemWorking = this.updateList.find(item => item.timelineId == workingTimelineId);
                if (itemWorking.mode == 'draft') {
                    this.updateList = this.updateList.filter(item => item.timelineId != workingTimelineId)
                }

                if (itemWorking.mode == 'edit') {
                    this.updateList = this.updateList.map(item => {
                        if (item.timelineId == workingTimelineId) {
                            item.mode = 'normal';
                        }

                        return item;
                    })
                }

                this.workingTimelineId = null;
            }
        },
        createDraft(index, direction) {
            // another new approach
            this.resetWorkingItem();
            const timelineId = this.generateId();
            this.draftDirection = direction;
            this.workingTimelineId = timelineId;
            const newItem = {
                timelineId,
                mode: 'draft',
                date: new Date()
            }

            if (index != 0) {
                index = this.updateList.findIndex(item => item.timelineId == index)
                console.log(index)
            }

            this.updateList.splice(index, 0, newItem);
        },
        generateId() {
            return `${Math.round(Math.random()*1000)}${Math.round(Math.random()*1000)}`;
        },
        sortList(items) {
            return items.sort((firstItem, secondItem) => secondItem.date - firstItem.date);
        },
        onAcceptUpdate(receivedItem) {
            const workingTimelineId = this.workingTimelineId;
            const newList = this.updateList.map(item => {
                if (item.timelineId == workingTimelineId) {
                    item = Object.assign(item, receivedItem);
                    item.mode = 'normal';
                }

                return item
            });

            this.updateList = this.sortList(newList);

            this.resetWorkingItem();
        },
        cancelUpdate() {
            this.resetWorkingItem();
        }
    }
}
</script>

<style lang="scss">
@mixin border-gradient($from, $to, $weight: 0) {
  $mix-main: mix($from, $to);
  $mix-sub-from: mix($mix-main, $from);
  $mix-sub-to: mix($mix-main, $to);
  
  box-shadow: 0 1px 0 $weight rgba($mix-sub-to, .25),
              0 -1px 0 $weight rgba($mix-sub-from, .25),
              1px 0 0 $weight rgba($mix-sub-to, .25),
              -1px 0 0 $weight  rgba($mix-sub-from, .25),
              1px -1px 0 $weight rgba($mix-main, .5),
              -1px 1px 0 $weight rgba($mix-main, .5),
              1px 1px 0 $weight rgba($to, .75),
              -1px -1px 0 $weight rgba($from, .75);
}

.timeline_pro {
    &_date_selector {
        margin-bottom: 7px;
        &-month {

        }

        &-day{

        }

        &-year{

        }

    }

    &_update {
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        display: flex;
        //overflow: hidden;
        max-width: 600px;
        padding-bottom: 2em;
        //color: #fff;

        &_left {
            display: none;
            flex: 0 0 auto;
            //width: 120px;
            text-align: right;
        }

        &_center{
            margin-right: 40px;
            margin-left: 40px;
            position: relative;
            width: 3px;

            &_bullet {
                position: absolute;
                top: 2px;
                left: 50%;
                transform: translateX(-50%);
                height: 40px;
                width: 40px;
                background: #fff;
                // border:solid 1px;

                &_empty {
                    width: 35px;
                    height: 35px;
                    left: 10px;
                    border-radius: 50%;
                    background: #ddd;
                }

                &_circle {
                    cursor: pointer;
                    position: absolute;
                    display: block;
                    height: 40px;
                    right: 5%;
                    width: 40px;
                    border-radius: 50%;
                    animation: rotateThis 1s linear infinite;
                    @include border-gradient(#000, #ddd);
                }

                > img {
                    max-width: 35px;
                    margin: auto;
                    height: auto;
                }
            }

            &_iconlist{
                border-radius: 3px;
                position: absolute;
                left: 0;
                display: none;
                justify-content: center;
                flex-wrap: wrap;
                width: 200px;
                z-index: 100;
                background: #ddd;
                left: 25px;
                padding: 5px 0;
                max-height: 400px;
                overflow-y: scroll;

                &.is-visible {
                    display: flex;
                }

                &-item {
                    cursor: pointer;
                    transform: scale(1);
                    transition: all .1s;
                    width: 35px;

                    &:hover {
                        transform: scale(1.05);
                    }
                    > img {
                        max-width: 100%;
                        height: auto;
                    }
                }
            }

            &_line {
                display: inline-block;
                margin-top: 32px;
                width: 1px;
                height: 100%;
                background-color: #313d4f;

                &.is-last {
                    display: none;
                }
            }

            &_new {
                border-radius: 50%;
                background: #dddd;
                color: #fff;
                font-size: 1em;

                height: 30px;
                width: 30px;
                align-items: center;
                background-image: linear-gradient(to right,#e052a0,#f15c41);
                border-radius: 9999px;
                cursor: pointer;
                flex: 0 0 auto;
                justify-content: center;
                transition: transform 160ms;
                transform: translateX(-50%);
                display: none;
                position: absolute;
                top: 0;
                z-index: 900;
                left: 50%;

                &:before, &:after {
                    content: '';
                    width: 20px;
                    height: 3px;
                    background: #fff;
                    position: absolute;
                    top: 14px;
                }

                &:before {
                    left: 5px;
                }

                &:after {
                    left: 5px;
                    transform: rotate(90deg);
                }

                .icon {
                    font-size: 30px;
                    position: absolute;
                    top: -5px;
                    left: 6.5px;
                }

                &.is-visible {
                    display: block;
                }

                &.is-last {
                    display: none;
                }
            }
        }

        &_right {
            flex: 1;
            &_head {
                display: flex;
                flex-direction: column;
                margin-top: 4px;
                position: relative;

                &_date {
                    line-height: 24px;
                    font-size: .8em;
                    color: rgba(#000, 0.6);
                    font-weight: bolder;
                }

                &_title {
                    flex: 1;
                    margin: 0 0 4px;
                    text-transform: uppercase;
                    font-weight: 700;
                    font-size: 1.4em;
                    color: #f15c41;
                    text-decoration: none;

                    &:hover {
                        color: rgba(#000, 0.96);
                    }

                    &-editable {
                        font-size: 1.2em;
                        margin-bottom: 1em;
                    }
                }

                &_url {
                    display: block;
                    font-size: .8em;
                    max-width: 300px;
                    outline: 0;
                    border: none;
                    border-bottom: solid 1px rgba(#000, 0.96);
                }
            }

            &_image {
                box-sizing: border-box;
                margin: 6px 0 12px;
                max-width: 100%;
                border: 1px solid #a8c6df;
                border-radius: 6px;
                box-shadow: 0 1px 5px 0 rgba(23,24,25,.6);
                transition: all 250ms linear;
                animation: float 3.5s ease-in-out infinite;
                user-select: none;
            }

            &_content {
                font-size: .95em;
                margin: 0;
                max-width: calc(100% - 50px);
            }

            &_buttons {
                display: flex;
                margin-top: 5px;

                &_button {
                    border-radius: 2px;
                    cursor: pointer;
                    padding: 5px 7px;
                    background: rgba(#ddd, .5);

                    &.acept {
                        // background: blue;
                    }

                    &.cancel {
                        margin-left: 5px;
                        // background: red;
                    }
                }
            }
        }

        &_textarea {
            width: 90%;
            overflow: hidden;
            border: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            margin: 0;
            outline: 0;
            padding: 0;
            resize: none;
            cursor: text;
            writing-mode: horizontal-tb !important;
            resize: none;
            margin-bottom: 1em;

            &.title {
                font-size: 1.2em;
                font-weight: bold;
                margin-bottom: 0;
            }
        }

    }
}

// circle

.timelime-pro-bullet-circle {
  //@include size(100px 100px);
  
    border-radius: 100%;
    animation: rotateThis 1s linear infinite;
}


@keyframes rotateThis {
  from {
    transform: rotate(0deg) scale(1);
  }
  
  to {
    transform: rotate(360deg) scale(1);
  }
}

</style>