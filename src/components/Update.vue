<template>
    <div ref="updateItem" class="timeline_pro_update" @mousemove="updatePosition" @mouseleave="reset">
        <div class="timeline_pro_update_center">
            <span class="timeline_pro_update_center_bullet">
                <img :src="icon" alt="" v-if="icon">
                <div v-if="!icon" class="timeline_pro_update_center_bullet_empty"></div>
            </span>
            <span :class="'timeline_pro_update_center_line ' + (isLast ? 'is-last' : '')"></span>
            <span v-if="!readOnly" ref="plus" :class="'timeline_pro_update_center_new'  + (isLast ? 'is-last' : '')" @click="createDraft">
            </span>
        </div>

        <div class="timeline_pro_update_right">
            <div class="timeline_pro_update_right_head">
                <span class="timeline_pro_update_right_head_date">
                    {{onFormatDate(date)}}
                </span>
                <a :href="url" class="timeline_pro_update_right_head_title" v-bind="linkProps">
                    {{title}}
                </a>
                <div class="timeline_menu" v-if="!readOnly">
                    <button :class="'timeline_menu_dots dots ' + (isOpenMenu ? 'on' : '')" @click="openMenu">
                        <span></span>
                    </button>
                    <div :class="'timeline_menu_buttons ' + (isOpenMenu ? 'active' : '')" @blur="blurMenu">
                        <div class="timeline_menu_buttons_button" @click="$emit('onEdit', index)">Edit</div>
                        <div class="timeline_menu_buttons_button" @click="$emit('onRemove', index)">Delete</div>
                    </div>
                </div>
            </div>
            <div class="timeline_pro_update_right_content">
                <p>{{description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Update',
    props: ['index', 'title', 'description', 'date', 'icon', 'url', 'isLast', 'readOnly', 'linkProps', 'onFormatDate'],
    data() {
        return {
            isOpenMenu: false
        }
    },
    methods: {
        updatePosition(e) {
            if (!this.readOnly) {
                this.$refs.plus.classList.add('is-visible');
                const currentPosition = this.$refs.plus.style.top.slice(0, -2);
                if (currentPosition > (this.$refs.updateItem.offsetHeight + 10) || (currentPosition < -5)) {
                    this.$refs.plus.classList.remove('is-visible');
                }

                let newPosition = (e.pageY - (this.$refs.updateItem.offsetParent == document.body ? this.$refs.updateItem.offsetTop :  this.getOffsetTop(this.$refs.updateItem)));
                newPosition = (newPosition - 5) + 'px';
                this.$refs.plus.style.top = newPosition;
            }
        },
        getOffsetTop(element) {
            let offsetTop = 0;
            while(element) {
                offsetTop += element.offsetTop;
                element = element.offsetParent;
            }

            return offsetTop;
        },
        reset(e) {
            if (!this.readOnly) {
                this.$refs.plus.classList.remove('is-visible');
            }
        },
        openMenu() {
            this.isOpenMenu = !this.isOpenMenu;
        },
        blurMenu() {
            this.isOpenMenu = false;
        },
        createDraft() {
            const direction = this.getDirection();
            this.$emit('onDraft', this.index, direction);
        },
        getDirection() {
            const currentPosition = this.$refs.plus.style.top.slice(0, -2);
            const percent = (currentPosition * 100) / this.$refs.updateItem.offsetHeight;
            
            return percent < 50 ? 'left' : 'right';
        }
    }
}
</script>

<style lang="scss">

button.dots {
  width:30px;
  height:30px;
  border:none;
  background:transparent;
  position:relative;
  cursor:pointer;
  &:focus {
    outline:none;
  }
  
  //  Menu Burger 1
  &.dots {
    &:after, &:before, span {
      width: 6px;
      height: 20%;
      border-radius: 50%;
      position:absolute;
      left:0px;
      background:#111;
      transform:rotate(0deg);
      transition: all 0.4s;

      left: 1%;
      right: 1%;
      margin: 0 auto;
    }

    &:after, &:before {
      content:"";
    }

    &:after {
      top:1%;
      margin-top:0px;
    }

    &:before {
      bottom: 8px;
      margin-bottom:0px;
    }

    span {
      top:10px;
      margin-top:-2px;
    }

    &.on {
      &:after {
        transform:rotate(135deg)translate(9px,-9px);
        width: 100%;
        top: -14%;
      }

      &:before { 
        transform:rotate(225deg);
        bottom:60%;
        margin-bottom:-2px;
        width: 100%;
      }

      span {
        transform:rotate(135deg);
      }
    }
  }
}

.timeline_menu {
    position: absolute;
    right: 10px;

    &_buttons {
        border-radius: 3px;
        position: absolute;
        width: 80px;
        border: solid 1px rgba(#000, .1);
        text-align: center;
        font-size: .8em;
        z-index: 10;
        top:100%;
        right: 0;
        display: none;
        background: #fff;

        &_button {
            padding: .4em .5em;

            &:hover {
                background: rgba(#000, .1);
            }
        }

        &.active {
            display: block
        }
    }
}


</style>