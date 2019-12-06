import { normalizeComponent, createInjector } from 'vue-runtime-helpers';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    name: 'Update',
    props: ['index', 'title', 'description', 'date', 'icon', 'url', 'isLast', 'readOnly', 'linkProps', 'onFormatDate'],
    data: function data() {
        return {
            isOpenMenu: false
        }
    },
    methods: {
        updatePosition: function updatePosition(e) {
            if (!this.readOnly) {
                this.$refs.plus.classList.add('is-visible');
                var currentPosition = this.$refs.plus.style.top.slice(0, -2);
                if (currentPosition > (this.$refs.updateItem.offsetHeight + 10) || (currentPosition < -5)) {
                    this.$refs.plus.classList.remove('is-visible');
                }

                var newPosition = (e.pageY - (this.$refs.updateItem.offsetParent == document.body ? this.$refs.updateItem.offsetTop :  this.getOffsetTop(this.$refs.updateItem)));
                newPosition = (newPosition - 5) + 'px';
                this.$refs.plus.style.top = newPosition;
            }
        },
        getOffsetTop: function getOffsetTop(element) {
            var offsetTop = 0;
            while(element) {
                offsetTop += element.offsetTop;
                element = element.offsetParent;
            }

            return offsetTop;
        },
        reset: function reset(e) {
            if (!this.readOnly) {
                this.$refs.plus.classList.remove('is-visible');
            }
        },
        openMenu: function openMenu() {
            this.isOpenMenu = !this.isOpenMenu;
        },
        blurMenu: function blurMenu() {
            this.isOpenMenu = false;
        },
        createDraft: function createDraft() {
            var direction = this.getDirection();
            this.$emit('onDraft', this.index, direction);
        },
        getDirection: function getDirection() {
            var currentPosition = this.$refs.plus.style.top.slice(0, -2);
            var percent = (currentPosition * 100) / this.$refs.updateItem.offsetHeight;
            
            return percent < 50 ? 'left' : 'right';
        }
    }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "updateItem",
      staticClass: "timeline_pro_update",
      on: { mousemove: _vm.updatePosition, mouseleave: _vm.reset }
    },
    [
      _c("div", { staticClass: "timeline_pro_update_center" }, [
        _c("span", { staticClass: "timeline_pro_update_center_bullet" }, [
          _vm.icon
            ? _c("img", { attrs: { src: _vm.icon, alt: "" } })
            : _vm._e(),
          _vm._v(" "),
          !_vm.icon
            ? _c("div", {
                staticClass: "timeline_pro_update_center_bullet_empty"
              })
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("span", {
          class:
            "timeline_pro_update_center_line " + (_vm.isLast ? "is-last" : "")
        }),
        _vm._v(" "),
        !_vm.readOnly
          ? _c("span", {
              ref: "plus",
              class:
                "timeline_pro_update_center_new" +
                (_vm.isLast ? "is-last" : ""),
              on: { click: _vm.createDraft }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "timeline_pro_update_right" }, [
        _c("div", { staticClass: "timeline_pro_update_right_head" }, [
          _c("span", { staticClass: "timeline_pro_update_right_head_date" }, [
            _vm._v(
              "\n                " +
                _vm._s(_vm.onFormatDate(_vm.date)) +
                "\n            "
            )
          ]),
          _vm._v(" "),
          _c(
            "a",
            _vm._b(
              {
                staticClass: "timeline_pro_update_right_head_title",
                attrs: { href: _vm.url }
              },
              "a",
              _vm.linkProps,
              false
            ),
            [
              _vm._v(
                "\n                " + _vm._s(_vm.title) + "\n            "
              )
            ]
          ),
          _vm._v(" "),
          !_vm.readOnly
            ? _c("div", { staticClass: "timeline_menu" }, [
                _c(
                  "button",
                  {
                    class:
                      "timeline_menu_dots dots " + (_vm.isOpenMenu ? "on" : ""),
                    on: { click: _vm.openMenu }
                  },
                  [_c("span")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    class:
                      "timeline_menu_buttons " +
                      (_vm.isOpenMenu ? "active" : ""),
                    on: { blur: _vm.blurMenu }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "timeline_menu_buttons_button",
                        on: {
                          click: function($event) {
                            return _vm.$emit("onEdit", _vm.index)
                          }
                        }
                      },
                      [_vm._v("Edit")]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "timeline_menu_buttons_button",
                        on: {
                          click: function($event) {
                            return _vm.$emit("onRemove", _vm.index)
                          }
                        }
                      },
                      [_vm._v("Delete")]
                    )
                  ]
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "timeline_pro_update_right_content" }, [
          _c("p", [_vm._v(_vm._s(_vm.description))])
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-e0199304_0", { source: "button.dots {\n  width: 30px;\n  height: 30px;\n  border: none;\n  background: transparent;\n  position: relative;\n  cursor: pointer;\n}\nbutton.dots:focus {\n  outline: none;\n}\nbutton.dots.dots:after, button.dots.dots:before, button.dots.dots span {\n  width: 6px;\n  height: 20%;\n  border-radius: 50%;\n  position: absolute;\n  left: 0px;\n  background: #111;\n  transform: rotate(0deg);\n  transition: all 0.4s;\n  left: 1%;\n  right: 1%;\n  margin: 0 auto;\n}\nbutton.dots.dots:after, button.dots.dots:before {\n  content: \"\";\n}\nbutton.dots.dots:after {\n  top: 1%;\n  margin-top: 0px;\n}\nbutton.dots.dots:before {\n  bottom: 8px;\n  margin-bottom: 0px;\n}\nbutton.dots.dots span {\n  top: 10px;\n  margin-top: -2px;\n}\nbutton.dots.dots.on:after {\n  transform: rotate(135deg) translate(9px, -9px);\n  width: 100%;\n  top: -14%;\n}\nbutton.dots.dots.on:before {\n  transform: rotate(225deg);\n  bottom: 60%;\n  margin-bottom: -2px;\n  width: 100%;\n}\nbutton.dots.dots.on span {\n  transform: rotate(135deg);\n}\n.timeline_menu {\n  position: absolute;\n  right: 10px;\n}\n.timeline_menu_buttons {\n  border-radius: 3px;\n  position: absolute;\n  width: 80px;\n  border: solid 1px rgba(0, 0, 0, 0.1);\n  text-align: center;\n  font-size: 0.8em;\n  z-index: 10;\n  top: 100%;\n  right: 0;\n  display: none;\n  background: #fff;\n}\n.timeline_menu_buttons_button {\n  padding: 0.4em 0.5em;\n}\n.timeline_menu_buttons_button:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n.timeline_menu_buttons.active {\n  display: block;\n}\n\n/*# sourceMappingURL=Update.vue.map */", map: {"version":3,"sources":["/Users/fernando/Sites/vue-timeline-pro/src/components/Update.vue","Update.vue"],"names":[],"mappings":"AAgGA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,uBAAA;EACA,kBAAA;EACA,eAAA;AC/FA;ADgGA;EACA,aAAA;AC9FA;ADmGA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;EACA,SAAA;EACA,gBAAA;EACA,uBAAA;EACA,oBAAA;EAEA,QAAA;EACA,SAAA;EACA,cAAA;AClGA;ADqGA;EACA,WAAA;ACnGA;ADsGA;EACA,OAAA;EACA,eAAA;ACpGA;ADuGA;EACA,WAAA;EACA,kBAAA;ACrGA;ADwGA;EACA,SAAA;EACA,gBAAA;ACtGA;AD0GA;EACA,8CAAA;EACA,WAAA;EACA,SAAA;ACxGA;AD2GA;EACA,yBAAA;EACA,WAAA;EACA,mBAAA;EACA,WAAA;ACzGA;AD4GA;EACA,yBAAA;AC1GA;ADgHA;EACA,kBAAA;EACA,WAAA;AC7GA;AD+GA;EACA,kBAAA;EACA,kBAAA;EACA,WAAA;EACA,oCAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;EACA,SAAA;EACA,QAAA;EACA,aAAA;EACA,gBAAA;AC7GA;AD+GA;EACA,oBAAA;AC7GA;AD+GA;EACA,8BAAA;AC7GA;ADiHA;EACA,cAAA;AC/GA;;AAEA,qCAAqC","file":"Update.vue","sourcesContent":["<template>\n    <div ref=\"updateItem\" class=\"timeline_pro_update\" @mousemove=\"updatePosition\" @mouseleave=\"reset\">\n        <div class=\"timeline_pro_update_center\">\n            <span class=\"timeline_pro_update_center_bullet\">\n                <img :src=\"icon\" alt=\"\" v-if=\"icon\">\n                <div v-if=\"!icon\" class=\"timeline_pro_update_center_bullet_empty\"></div>\n            </span>\n            <span :class=\"'timeline_pro_update_center_line ' + (isLast ? 'is-last' : '')\"></span>\n            <span v-if=\"!readOnly\" ref=\"plus\" :class=\"'timeline_pro_update_center_new'  + (isLast ? 'is-last' : '')\" @click=\"createDraft\">\n            </span>\n        </div>\n\n        <div class=\"timeline_pro_update_right\">\n            <div class=\"timeline_pro_update_right_head\">\n                <span class=\"timeline_pro_update_right_head_date\">\n                    {{onFormatDate(date)}}\n                </span>\n                <a :href=\"url\" class=\"timeline_pro_update_right_head_title\" v-bind=\"linkProps\">\n                    {{title}}\n                </a>\n                <div class=\"timeline_menu\" v-if=\"!readOnly\">\n                    <button :class=\"'timeline_menu_dots dots ' + (isOpenMenu ? 'on' : '')\" @click=\"openMenu\">\n                        <span></span>\n                    </button>\n                    <div :class=\"'timeline_menu_buttons ' + (isOpenMenu ? 'active' : '')\" @blur=\"blurMenu\">\n                        <div class=\"timeline_menu_buttons_button\" @click=\"$emit('onEdit', index)\">Edit</div>\n                        <div class=\"timeline_menu_buttons_button\" @click=\"$emit('onRemove', index)\">Delete</div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"timeline_pro_update_right_content\">\n                <p>{{description}}</p>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script>\nexport default {\n    name: 'Update',\n    props: ['index', 'title', 'description', 'date', 'icon', 'url', 'isLast', 'readOnly', 'linkProps', 'onFormatDate'],\n    data() {\n        return {\n            isOpenMenu: false\n        }\n    },\n    methods: {\n        updatePosition(e) {\n            if (!this.readOnly) {\n                this.$refs.plus.classList.add('is-visible');\n                const currentPosition = this.$refs.plus.style.top.slice(0, -2);\n                if (currentPosition > (this.$refs.updateItem.offsetHeight + 10) || (currentPosition < -5)) {\n                    this.$refs.plus.classList.remove('is-visible');\n                }\n\n                let newPosition = (e.pageY - (this.$refs.updateItem.offsetParent == document.body ? this.$refs.updateItem.offsetTop :  this.getOffsetTop(this.$refs.updateItem)));\n                newPosition = (newPosition - 5) + 'px';\n                this.$refs.plus.style.top = newPosition;\n            }\n        },\n        getOffsetTop(element) {\n            let offsetTop = 0;\n            while(element) {\n                offsetTop += element.offsetTop;\n                element = element.offsetParent;\n            }\n\n            return offsetTop;\n        },\n        reset(e) {\n            if (!this.readOnly) {\n                this.$refs.plus.classList.remove('is-visible');\n            }\n        },\n        openMenu() {\n            this.isOpenMenu = !this.isOpenMenu;\n        },\n        blurMenu() {\n            this.isOpenMenu = false;\n        },\n        createDraft() {\n            const direction = this.getDirection();\n            this.$emit('onDraft', this.index, direction);\n        },\n        getDirection() {\n            const currentPosition = this.$refs.plus.style.top.slice(0, -2);\n            const percent = (currentPosition * 100) / this.$refs.updateItem.offsetHeight;\n            \n            return percent < 50 ? 'left' : 'right';\n        }\n    }\n}\n</script>\n\n<style lang=\"scss\">\n\nbutton.dots {\n  width:30px;\n  height:30px;\n  border:none;\n  background:transparent;\n  position:relative;\n  cursor:pointer;\n  &:focus {\n    outline:none;\n  }\n  \n  //  Menu Burger 1\n  &.dots {\n    &:after, &:before, span {\n      width: 6px;\n      height: 20%;\n      border-radius: 50%;\n      position:absolute;\n      left:0px;\n      background:#111;\n      transform:rotate(0deg);\n      transition: all 0.4s;\n\n      left: 1%;\n      right: 1%;\n      margin: 0 auto;\n    }\n\n    &:after, &:before {\n      content:\"\";\n    }\n\n    &:after {\n      top:1%;\n      margin-top:0px;\n    }\n\n    &:before {\n      bottom: 8px;\n      margin-bottom:0px;\n    }\n\n    span {\n      top:10px;\n      margin-top:-2px;\n    }\n\n    &.on {\n      &:after {\n        transform:rotate(135deg)translate(9px,-9px);\n        width: 100%;\n        top: -14%;\n      }\n\n      &:before { \n        transform:rotate(225deg);\n        bottom:60%;\n        margin-bottom:-2px;\n        width: 100%;\n      }\n\n      span {\n        transform:rotate(135deg);\n      }\n    }\n  }\n}\n\n.timeline_menu {\n    position: absolute;\n    right: 10px;\n\n    &_buttons {\n        border-radius: 3px;\n        position: absolute;\n        width: 80px;\n        border: solid 1px rgba(#000, .1);\n        text-align: center;\n        font-size: .8em;\n        z-index: 10;\n        top:100%;\n        right: 0;\n        display: none;\n        background: #fff;\n\n        &_button {\n            padding: .4em .5em;\n\n            &:hover {\n                background: rgba(#000, .1);\n            }\n        }\n\n        &.active {\n            display: block\n        }\n    }\n}\n\n\n</style>","button.dots {\n  width: 30px;\n  height: 30px;\n  border: none;\n  background: transparent;\n  position: relative;\n  cursor: pointer;\n}\nbutton.dots:focus {\n  outline: none;\n}\nbutton.dots.dots:after, button.dots.dots:before, button.dots.dots span {\n  width: 6px;\n  height: 20%;\n  border-radius: 50%;\n  position: absolute;\n  left: 0px;\n  background: #111;\n  transform: rotate(0deg);\n  transition: all 0.4s;\n  left: 1%;\n  right: 1%;\n  margin: 0 auto;\n}\nbutton.dots.dots:after, button.dots.dots:before {\n  content: \"\";\n}\nbutton.dots.dots:after {\n  top: 1%;\n  margin-top: 0px;\n}\nbutton.dots.dots:before {\n  bottom: 8px;\n  margin-bottom: 0px;\n}\nbutton.dots.dots span {\n  top: 10px;\n  margin-top: -2px;\n}\nbutton.dots.dots.on:after {\n  transform: rotate(135deg) translate(9px, -9px);\n  width: 100%;\n  top: -14%;\n}\nbutton.dots.dots.on:before {\n  transform: rotate(225deg);\n  bottom: 60%;\n  margin-bottom: -2px;\n  width: 100%;\n}\nbutton.dots.dots.on span {\n  transform: rotate(135deg);\n}\n\n.timeline_menu {\n  position: absolute;\n  right: 10px;\n}\n.timeline_menu_buttons {\n  border-radius: 3px;\n  position: absolute;\n  width: 80px;\n  border: solid 1px rgba(0, 0, 0, 0.1);\n  text-align: center;\n  font-size: 0.8em;\n  z-index: 10;\n  top: 100%;\n  right: 0;\n  display: none;\n  background: #fff;\n}\n.timeline_menu_buttons_button {\n  padding: 0.4em 0.5em;\n}\n.timeline_menu_buttons_button:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n.timeline_menu_buttons.active {\n  display: block;\n}\n\n/*# sourceMappingURL=Update.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Update = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
    props: {
        date: {
            type: Date
        }
    },
    name: 'date',
    data: function data() {
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
    created: function created() {
        this.setInitialDate();
        this.splitDate();
    },
    methods: {
        getMonths: function getMonths() {
            var months = [
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

            return months.map(function (item, index) { return ({label: item, value: (index + 1)}); });
        },
        getDays: function getDays() {
            var days = this.getDaysInMonth(this.month, this.year);
            days = new Array(days).fill(0);

            return days.map(function (x, i) { return i + 1; });
        },
        getYears: function getYears() {
            var currentYear = new Date().getFullYear();
            var numberOfYears = currentYear - (currentYear - 90);

            var years = new Array(numberOfYears).fill(0);

            return years.map(function (x, i) { return (currentYear - i); });
        },
        setInitialDate: function setInitialDate() {
            this.usableDate = this.date;
        },
        splitDate: function splitDate() {
            this.day = this.usableDate.getDate();
            this.month = this.usableDate.getMonth() + 1;
            this.year = this.usableDate.getFullYear();
        },
        getDaysInMonth: function getDaysInMonth(month,year) {
            return new Date(year, month, 0).getDate();
        },
        getCompleteDate: function getCompleteDate() {
            return new Date(this.year, this.month - 1, this.day);
        },
        emitChange: function emitChange() {
            this.$emit('changeDate', this.getCompleteDate());
        }
    }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "timeline_pro_date_selector" }, [
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.month,
            expression: "month"
          }
        ],
        staticClass: "timeline_pro_date_selector-month",
        on: {
          change: [
            function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val
                });
              _vm.month = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0];
            },
            _vm.emitChange
          ]
        }
      },
      _vm._l(_vm.getMonths(), function(item) {
        return _c("option", { domProps: { value: item.value } }, [
          _vm._v(_vm._s(item.label))
        ])
      }),
      0
    ),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.day,
            expression: "day"
          }
        ],
        staticClass: "timeline_pro_date_selector-day",
        on: {
          change: [
            function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val
                });
              _vm.day = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0];
            },
            _vm.emitChange
          ]
        }
      },
      _vm._l(_vm.getDays(), function(item) {
        return _c("option", { domProps: { value: item } }, [
          _vm._v(_vm._s(item))
        ])
      }),
      0
    ),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.year,
            expression: "year"
          }
        ],
        staticClass: "timeline_pro_date_selector-year",
        on: {
          change: [
            function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val
                });
              _vm.year = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0];
            },
            _vm.emitChange
          ]
        }
      },
      _vm._l(_vm.getYears(), function(item) {
        return _c("option", { domProps: { value: item } }, [
          _vm._v(_vm._s(item))
        ])
      }),
      0
    )
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-5f69bb72_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Date.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Date$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$2 = {
    name: 'UpdateForm',
    props: ['index', 'title', 'icon', 'description', 'date', 'accept', 'iconList', 'isLast', 'url', 'acceptText', 'cancelText'],
    data: function data() {
        return {
            dateItem: null,
            descriptionItem: null,
            titleItem: null,
            iconItem: null,
            urlItem: null,
            iconListVisible: false
        }
    },
    created: function created() {
        this.dateItem = this.date;
        this.descriptionItem = this.description;
        this.titleItem = this.title;
        this.urlItem = this.url;
        this.iconItem = this.icon;
    },
    mounted: function mounted() {
        this.autoGrowTextarea('titleArea');
        this.autoGrowTextarea('descriptionArea');
    },
    components: {
        Date: Date$1
    },
    methods: {
        saveItem: function saveItem() {
            var newData = {
                timelineId: this.$props.index,
                date: this.dateItem,
                description: this.descriptionItem,
                title: this.titleItem,
                url: this.urlItem,
                icon: this.iconItem
            };

            this.accept(newData, this.$props.index);
        },
        autoGrowTextarea: function autoGrowTextarea(areaName) {
            var element = this.$refs[areaName];
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        },
        toggleMenuIconList: function toggleMenuIconList() {
            if (!this.iconList || !this.iconList.length) {
                return;
            }

            this.iconListVisible = !this.iconListVisible;
        },
        blurMenuIconList: function blurMenuIconList() {
            this.iconListVisible = false;
        },
        selectIcon: function selectIcon(icon) {
            this.iconItem = icon;
        },
        setDate: function setDate(date) {
            this.dateItem = date;
        }
    }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "updateItem", staticClass: "timeline_pro_update" }, [
    _c("div", { staticClass: "timeline_pro_update_left" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.dateItem,
            expression: "dateItem"
          }
        ],
        attrs: { type: "date", placeholder: "date" },
        domProps: { value: _vm.dateItem },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.dateItem = $event.target.value;
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "timeline_pro_update_center" }, [
      _c("span", { staticClass: "timeline_pro_update_center_bullet" }, [
        _c("span", {
          staticClass: "timeline_pro_update_center_bullet_circle",
          on: { mousedown: _vm.toggleMenuIconList }
        }),
        _vm._v(" "),
        _c("img", { attrs: { src: _vm.iconItem, alt: "" } })
      ]),
      _vm._v(" "),
      _vm.iconList
        ? _c(
            "div",
            {
              class:
                "timeline_pro_update_center_iconlist " +
                (_vm.iconListVisible ? "is-visible" : ""),
              nativeOn: {
                blur: function($event) {
                  return _vm.blurMenuIconList($event)
                }
              }
            },
            _vm._l(_vm.iconList, function(item, indexItem) {
              return _c(
                "div",
                {
                  key: indexItem,
                  staticClass: "timeline_pro_update_center_iconlist-item"
                },
                [
                  _c("img", {
                    attrs: { src: item, alt: "icon" },
                    on: {
                      click: function($event) {
                        return _vm.selectIcon(item)
                      }
                    }
                  })
                ]
              )
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      _c("span", {
        class:
          "timeline_pro_update_center_line " + (_vm.isLast ? "is-last" : "")
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "timeline_pro_update_right" }, [
      _c("div", { staticClass: "timeline_pro_update_right_head" }, [
        _c(
          "span",
          { staticClass: "timeline_pro_update_right_head_date" },
          [
            _c("Date", {
              attrs: { date: _vm.dateItem },
              on: { changeDate: _vm.setDate }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "timeline_pro_update_right_head_title timeline_pro_update_right_head_title-editable"
          },
          [
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.titleItem,
                  expression: "titleItem"
                }
              ],
              ref: "titleArea",
              staticClass: "timeline_pro_update_textarea title",
              attrs: {
                maxlength: "50",
                type: "text",
                placeholder: "Add title"
              },
              domProps: { value: _vm.titleItem },
              on: {
                input: [
                  function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.titleItem = $event.target.value;
                  },
                  function($event) {
                    return _vm.autoGrowTextarea("titleArea")
                  }
                ]
              }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.urlItem,
                  expression: "urlItem"
                }
              ],
              staticClass: "timeline_pro_update_right_head_url",
              staticStyle: { width: "100%" },
              attrs: { type: "text", placeholder: "URL" },
              domProps: { value: _vm.urlItem },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.urlItem = $event.target.value;
                }
              }
            })
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "timeline_pro_update_right_content" }, [
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.descriptionItem,
              expression: "descriptionItem"
            }
          ],
          ref: "descriptionArea",
          staticClass: "timeline_pro_update_textarea",
          attrs: { placeholder: "Add description" },
          domProps: { value: _vm.descriptionItem },
          on: {
            input: [
              function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.descriptionItem = $event.target.value;
              },
              function($event) {
                return _vm.autoGrowTextarea("descriptionArea")
              }
            ]
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "timeline_pro_update_right_buttons" }, [
        _c(
          "div",
          {
            staticClass: "timeline_pro_update_right_buttons_button acept",
            on: { click: _vm.saveItem }
          },
          [_vm._v(_vm._s(_vm.acceptText))]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "timeline_pro_update_right_buttons_button cancel",
            on: {
              click: function($event) {
                return _vm.$emit("cancel")
              }
            }
          },
          [_vm._v(_vm._s(_vm.cancelText))]
        )
      ])
    ])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-7203c069_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"UpdateForm.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var UpdateForm = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
    name: 'firstPlus',
    props: ['suggestive']
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "timeline_pro_update" }, [
    _c("div", { staticClass: "timeline_pro_update_center" }, [
      _c("span", { staticClass: "timeline_pro_update_center_line" }),
      _vm._v(" "),
      _c("span", {
        staticClass: "timeline_pro_update_center_new is-static",
        on: {
          click: function($event) {
            return _vm.$emit("onDraft")
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "timeline_pro_update_right" }, [
      _c(
        "p",
        {
          staticStyle: {
            "margin-top": "20px",
            "margin-bottom": "0",
            "font-weight": "bold",
            "font-size": "1.1em"
          }
        },
        [_vm._v(_vm._s(_vm.suggestive))]
      )
    ])
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-1b75b3fa_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FirstPlus.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var FirstPlus = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$4 = {
    name: 'VueTimelinePro',
    props: {
        imageList: {
            type: Array,
            default: function () { return []; },
        },
        modelItem: {
            type: Object,
            default: function () { return (
                {
                    title: 'title',
                    description: 'description',
                    date: 'date',
                    icon: 'icon',
                    url: 'url'
                }
            ); }
        },
        updates: {
            type: Array,
            default: function () { return []; }
        },
        readOnly: {
            type: Boolean,
            default: function () { return true; }
        },
        suggestiveText: {
            type: String,
            default: function () { return 'Add a new update'; }
        },
        linkProps: {
            type: Object,
            default: function () {}
        },
        formatDate: {
            type: Function,
            default: function (date) {
                if (!date) {
                    return '-';
                }

                return date.toLocaleString('en-US', {
                    month: 'long', // "June"
                    day: '2-digit', // "01"
                    year: 'numeric' // "2019"
                });
            }
        },
        acceptButtonText: {
            type: String,
            default: function () { return 'Accept'; }
        },
        cancelButtonText: {
            type: String,
            default: function () { return 'Cancel'; }
        }
    },
    data: function data() {
        return {
            updateList: [],
            draftDirection: 'right',
            updateToForm: {},
            workingIndex: -1,
            workingTimelineId: null
        }
    },
    components: {
        Update: Update,
        UpdateForm: UpdateForm,
        FirstPlus: FirstPlus
    },
    created: function created() {
        this.loadData();
    },
    methods: {
        loadData: function loadData() {
            this.updateList = this.updates.map(this.fillObject);
        },
        editUpdate: function editUpdate(timelineId) {
            // another new approach
            this.resetWorkingItem();
            var item = this.updateList.find(function (item) { return item.timelineId == timelineId; });
            item.mode = 'edit';
            this.workingTimelineId = timelineId;
        },
        removeUpdate: function removeUpdate(timelineId) {
            if (confirm("Sure to remove?")) {
                var indexToRemove = this.updateList.findIndex(function (item) { return item.timelineId == timelineId; });
                var item = this.updateList.find(function (item) { return item.timelineId == timelineId; });
                this.$emit('onRemoveItem', item, indexToRemove);

                this.updateList.splice(indexToRemove, 1);
                this.resetWorkingItem();
            }
        },
        fillObject: function fillObject(item, index) {
            var ref = this.$props.modelItem;
            var title = ref.title;
            var description = ref.description;
            var date = ref.date;
            var icon = ref.icon;
            var url = ref.url;

            var timelineItem = {
                timelineId: this.generateId(),
                title: item[title],
                description: item[description],
                date: item[date],
                icon: item[icon],
                url: item[url],
                mode: 'normal'
            };

            return Object.assign({}, item, timelineItem);
        },
        resetWorkingItem: function resetWorkingItem() {
            var workingTimelineId = this.workingTimelineId;
            if (workingTimelineId) {
                var itemWorking = this.updateList.find(function (item) { return item.timelineId == workingTimelineId; });
                if (itemWorking.mode == 'draft') {
                    this.updateList = this.updateList.filter(function (item) { return item.timelineId != workingTimelineId; });
                }

                if (itemWorking.mode == 'edit') {
                    this.updateList = this.updateList.map(function (item) {
                        if (item.timelineId == workingTimelineId) {
                            item.mode = 'normal';
                        }

                        return item;
                    });
                }

                this.workingTimelineId = null;
            }
        },
        createDraft: function createDraft(index, direction) {
            // another new approach
            this.resetWorkingItem();
            var timelineId = this.generateId();
            this.draftDirection = direction;
            this.workingTimelineId = timelineId;
            var newItem = {
                timelineId: timelineId,
                mode: 'draft',
                date: new Date()
            };

            if (index != 0) {
                index = this.updateList.findIndex(function (item) { return item.timelineId == index; });

                if (direction == 'right') {
                    index++;
                }
            }

            this.updateList.splice(index, 0, newItem);
        },
        generateId: function generateId() {
            return ("" + (Math.round(Math.random()*1000)) + (Math.round(Math.random()*1000)));
        },
        sortList: function sortList(items) {
            return items.sort(function (firstItem, secondItem) { return secondItem.date - firstItem.date; });
        },
        onAcceptUpdate: function onAcceptUpdate(receivedItem) {
            var workingTimelineId = this.workingTimelineId;
            this.sendItem(receivedItem);
            var newList = this.updateList.map(function (item) {
                if (item.timelineId == workingTimelineId) {
                    item = Object.assign(item, receivedItem);
                    item.mode = 'normal';
                }

                return item
            });
            this.updateList = this.sortList(newList);

            this.resetWorkingItem();
        },
        cancelUpdate: function cancelUpdate() {
            this.resetWorkingItem();
        },
        sendItem: function sendItem(received) {
            var this$1 = this;

            var found = this.updateList.find(function (item) { return item.timelineId == this$1.workingTimelineId; });
            var index = undefined;
            var item = this.revertFill(Object.assign({}, found, received));
            var eventName = '';

            if (item.mode == 'draft') {
                eventName = 'onAddItem';
            }

            if (item.mode == 'edit') {
                eventName = 'onUpdateItem';
                index = this.updateList.findIndex(function (item) { return item.timelineId == this$1.workingTimelineId; });
            }

            delete item.timelineId;
            delete item.mode;
            this.$emit(eventName, item, index);
        },
        revertFill: function revertFill(item) {
            var ref = this.$props.modelItem;
            var title = ref.title;
            var description = ref.description;
            var date = ref.date;
            var icon = ref.icon;
            var url = ref.url;

            var newItem = Object.assign({}, item);

            newItem[title] = newItem.title;
            newItem[description] = newItem.description;
            newItem[date] = newItem.date;
            newItem[icon] = newItem.icon;
            newItem[url] = newItem.url;

            delete newItem.title;
            delete newItem.description;
            delete newItem.date;
            delete newItem.icon;
            delete newItem.url;

            return newItem;
        }
    }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "timeline_pro" },
    [
      !_vm.readOnly
        ? _c("FirstPlus", {
            attrs: { suggestive: _vm.suggestiveText },
            on: {
              onDraft: function($event) {
                return _vm.createDraft(0, "left")
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.updateList, function(item, i) {
        return _c(
          "div",
          { key: item.timelineId },
          [
            !_vm.readOnly &&
            (item.mode == "draft" || item.mode == "edit") &&
            _vm.draftDirection == "left"
              ? _c("UpdateForm", {
                  key: item.timelineId,
                  attrs: {
                    title: item.title,
                    description: item.description,
                    date: item.date,
                    icon: item.icon,
                    url: item.url,
                    index: item.timelineId,
                    iconList: _vm.imageList,
                    isLast: i == _vm.updateList.length - 1,
                    accept: _vm.onAcceptUpdate,
                    cancelText: _vm.cancelButtonText,
                    acceptText: _vm.acceptButtonText
                  },
                  on: { cancel: _vm.cancelUpdate }
                })
              : _vm._e(),
            _vm._v(" "),
            item.mode == "normal"
              ? _c("Update", {
                  key: item.timelineId,
                  attrs: {
                    title: item.title,
                    description: item.description,
                    date: item.date,
                    icon: item.icon,
                    url: item.url,
                    index: item.timelineId,
                    readOnly: _vm.readOnly,
                    isLast: i == _vm.updateList.length - 1,
                    linkProps: _vm.linkProps,
                    onFormatDate: _vm.formatDate
                  },
                  on: {
                    onEdit: function($event) {
                      return _vm.editUpdate(item.timelineId)
                    },
                    onRemove: function($event) {
                      return _vm.removeUpdate(item.timelineId)
                    },
                    onDraft: _vm.createDraft
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            !_vm.readOnly &&
            (item.mode == "draft" || item.mode == "edit") &&
            _vm.draftDirection == "right"
              ? _c("UpdateForm", {
                  key: item.timelineId,
                  attrs: {
                    title: item.title,
                    description: item.description,
                    date: item.date,
                    icon: item.icon,
                    url: item.url,
                    index: item.timelineId,
                    iconList: _vm.imageList,
                    isLast: i == _vm.updateList.length - 1,
                    accept: _vm.onAcceptUpdate,
                    cancelText: _vm.cancelButtonText,
                    acceptText: _vm.acceptButtonText
                  },
                  on: { cancel: _vm.cancelUpdate }
                })
              : _vm._e()
          ],
          1
        )
      })
    ],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-28d02d34_0", { source: ".timeline_pro_date_selector {\n  margin-bottom: 7px;\n}\n.timeline_pro_update {\n  font-family: \"Roboto\", Arial, Helvetica, sans-serif;\n  display: flex;\n  max-width: 600px;\n  padding-bottom: 2em;\n  border: solid 1px transparent;\n  position: relative;\n}\n.timeline_pro_update_left {\n  display: none;\n  flex: 0 0 auto;\n  text-align: right;\n}\n.timeline_pro_update_center {\n  margin-right: 40px;\n  margin-left: 40px;\n  position: relative;\n  width: 3px;\n}\n.timeline_pro_update_center_bullet {\n  position: absolute;\n  top: 15px;\n  left: 50%;\n  transform: translateX(-50%);\n  height: 40px;\n  width: 40px;\n}\n.timeline_pro_update_center_bullet_empty {\n  position: absolute;\n  background: #757575;\n  width: 35px;\n  height: 35px;\n  left: 2px;\n  border-radius: 50%;\n}\n.timeline_pro_update_center_bullet_circle {\n  cursor: pointer;\n  position: absolute;\n  display: block;\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  animation: rotateThis 1s linear infinite;\n  box-shadow: 0 1px 0 0 rgba(166, 166, 166, 0.25), 0 -1px 0 0 rgba(56, 56, 56, 0.25), 1px 0 0 0 rgba(166, 166, 166, 0.25), -1px 0 0 0 rgba(56, 56, 56, 0.25), 1px -1px 0 0 rgba(111, 111, 111, 0.5), -1px 1px 0 0 rgba(111, 111, 111, 0.5), 1px 1px 0 0 rgba(221, 221, 221, 0.75), -1px -1px 0 0 rgba(0, 0, 0, 0.75);\n}\n.timeline_pro_update_center_bullet_circle + img {\n  width: 32px;\n}\n.timeline_pro_update_center_bullet > img {\n  display: block;\n  max-width: 35px;\n  margin: 3px auto;\n  height: auto;\n}\n.timeline_pro_update_center_iconlist {\n  border-radius: 3px;\n  position: absolute;\n  left: 0;\n  display: none;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 200px;\n  z-index: 100;\n  background: #ddd;\n  left: 25px;\n  padding: 5px 0;\n  max-height: 400px;\n  overflow-y: scroll;\n}\n.timeline_pro_update_center_iconlist.is-visible {\n  display: flex;\n}\n.timeline_pro_update_center_iconlist-item {\n  cursor: pointer;\n  transform: scale(1);\n  transition: all 0.1s;\n  width: 35px;\n}\n.timeline_pro_update_center_iconlist-item:hover {\n  transform: scale(1.05);\n}\n.timeline_pro_update_center_iconlist-item > img {\n  max-width: 100%;\n  height: auto;\n}\n.timeline_pro_update_center_line {\n  display: inline-block;\n  margin-top: 55px;\n  width: 1px;\n  height: calc(100% - 10px);\n  background-color: #313d4f;\n}\n.timeline_pro_update_center_line.is-last {\n  display: none;\n}\n.timeline_pro_update_center_new {\n  border-radius: 50%;\n  background: #dddd;\n  color: #fff;\n  font-size: 1em;\n  height: 30px;\n  width: 30px;\n  align-items: center;\n  background-image: linear-gradient(to right, #e052a0, #f15c41);\n  border-radius: 9999px;\n  cursor: pointer;\n  flex: 0 0 auto;\n  justify-content: center;\n  transition: transform 160ms;\n  transform: translateX(-50%);\n  display: none;\n  position: absolute;\n  top: 0;\n  z-index: 900;\n  left: 50%;\n}\n.timeline_pro_update_center_new:before, .timeline_pro_update_center_new:after {\n  content: \"\";\n  width: 20px;\n  height: 3px;\n  background: #fff;\n  position: absolute;\n  top: 14px;\n}\n.timeline_pro_update_center_new:before {\n  left: 5px;\n}\n.timeline_pro_update_center_new:after {\n  left: 5px;\n  transform: rotate(90deg);\n}\n.timeline_pro_update_center_new .icon {\n  font-size: 30px;\n  position: absolute;\n  top: -5px;\n  left: 6.5px;\n}\n.timeline_pro_update_center_new.is-visible {\n  display: block;\n}\n.timeline_pro_update_center_new.is-static {\n  margin-top: 15px;\n  display: block;\n}\n.timeline_pro_update_center_new.is-last {\n  display: none;\n}\n.timeline_pro_update_right {\n  flex: 1;\n}\n.timeline_pro_update_right_head {\n  display: flex;\n  flex-direction: column;\n  margin-top: 4px;\n  position: relative;\n}\n.timeline_pro_update_right_head_date {\n  line-height: 24px;\n  font-size: 0.8em;\n  color: rgba(0, 0, 0, 0.6);\n  font-weight: bolder;\n}\n.timeline_pro_update_right_head_title {\n  flex: 1;\n  margin: 0 0 4px;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-size: 1.4em;\n  color: #f15c41;\n  text-decoration: none;\n}\n.timeline_pro_update_right_head_title:hover {\n  color: rgba(0, 0, 0, 0.96);\n}\n.timeline_pro_update_right_head_title-editable {\n  font-size: 1.2em;\n  margin-bottom: 1em;\n}\n.timeline_pro_update_right_head_url {\n  display: block;\n  font-size: 0.8em;\n  max-width: 350px;\n  outline: 0;\n  border: none;\n  padding: 0.5em;\n  background: #f7f6f6;\n}\n.timeline_pro_update_right_image {\n  box-sizing: border-box;\n  margin: 6px 0 12px;\n  max-width: 100%;\n  border: 1px solid #a8c6df;\n  border-radius: 6px;\n  box-shadow: 0 1px 5px 0 rgba(23, 24, 25, 0.6);\n  transition: all 250ms linear;\n  animation: float 3.5s ease-in-out infinite;\n  user-select: none;\n}\n.timeline_pro_update_right_content {\n  font-size: 0.95em;\n  margin: 0;\n  max-width: calc(100% - 50px);\n}\n.timeline_pro_update_right_buttons {\n  display: flex;\n  margin-top: 5px;\n}\n.timeline_pro_update_right_buttons_button {\n  border-radius: 2px;\n  cursor: pointer;\n  padding: 5px 7px;\n  background: rgba(221, 221, 221, 0.5);\n}\n.timeline_pro_update_right_buttons_button.cancel {\n  margin-left: 5px;\n}\n.timeline_pro_update_textarea {\n  width: 90%;\n  overflow: hidden;\n  border: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n  margin: 0;\n  outline: 0;\n  padding: 0;\n  resize: none;\n  cursor: text;\n  writing-mode: horizontal-tb !important;\n  resize: none;\n  margin-bottom: 1em;\n  background: transparent;\n}\n.timeline_pro_update_textarea.title {\n  font-size: 1.2em;\n  font-weight: bold;\n  margin-bottom: 0;\n}\n.timelime-pro-bullet-circle {\n  border-radius: 100%;\n  animation: rotateThis 1s linear infinite;\n}\n@keyframes rotateThis {\nfrom {\n    transform: rotate(0deg) scale(1);\n}\nto {\n    transform: rotate(360deg) scale(1);\n}\n}\n\n/*# sourceMappingURL=VueTimelinePro.vue.map */", map: {"version":3,"sources":["/Users/fernando/Sites/vue-timeline-pro/src/components/VueTimelinePro.vue","VueTimelinePro.vue"],"names":[],"mappings":"AA8SA;EACA,kBAAA;AC7SA;AD4TA;EACA,mDAAA;EACA,aAAA;EACA,gBAAA;EACA,mBAAA;EACA,6BAAA;EACA,kBAAA;AC1TA;AD4TA;EACA,aAAA;EACA,cAAA;EACA,iBAAA;AC1TA;AD6TA;EACA,kBAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;AC3TA;AD6TA;EACA,kBAAA;EACA,SAAA;EACA,SAAA;EACA,2BAAA;EACA,YAAA;EACA,WAAA;AC3TA;AD6TA;EACA,kBAAA;EACA,mBAAA;EACA,WAAA;EACA,YAAA;EACA,SAAA;EACA,kBAAA;AC3TA;AD8TA;EACA,eAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,wCAAA;EAvEA,kTAAA;ACpPA;AD8TA;EACA,WAAA;AC5TA;ADgUA;EACA,cAAA;EACA,eAAA;EACA,gBAAA;EACA,YAAA;AC9TA;ADkUA;EACA,kBAAA;EACA,kBAAA;EACA,OAAA;EACA,aAAA;EACA,uBAAA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,gBAAA;EACA,UAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;AChUA;ADkUA;EACA,aAAA;AChUA;ADmUA;EACA,eAAA;EACA,mBAAA;EACA,oBAAA;EACA,WAAA;ACjUA;ADmUA;EACA,sBAAA;ACjUA;ADmUA;EACA,eAAA;EACA,YAAA;ACjUA;ADsUA;EACA,qBAAA;EACA,gBAAA;EACA,UAAA;EACA,yBAAA;EACA,yBAAA;ACpUA;ADsUA;EACA,aAAA;ACpUA;ADwUA;EACA,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,cAAA;EAEA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,6DAAA;EACA,qBAAA;EACA,eAAA;EACA,cAAA;EACA,uBAAA;EACA,2BAAA;EACA,2BAAA;EACA,aAAA;EACA,kBAAA;EACA,MAAA;EACA,YAAA;EACA,SAAA;ACvUA;ADyUA;EACA,WAAA;EACA,WAAA;EACA,WAAA;EACA,gBAAA;EACA,kBAAA;EACA,SAAA;ACvUA;AD0UA;EACA,SAAA;ACxUA;AD2UA;EACA,SAAA;EACA,wBAAA;ACzUA;AD4UA;EACA,eAAA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;AC1UA;AD6UA;EACA,cAAA;AC3UA;AD8UA;EACA,gBAAA;EACA,cAAA;AC5UA;AD+UA;EACA,aAAA;AC7UA;ADkVA;EACA,OAAA;AChVA;ADiVA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;AC/UA;ADiVA;EACA,iBAAA;EACA,gBAAA;EACA,yBAAA;EACA,mBAAA;AC/UA;ADkVA;EACA,OAAA;EACA,eAAA;EACA,yBAAA;EACA,gBAAA;EACA,gBAAA;EACA,cAAA;EACA,qBAAA;AChVA;ADkVA;EACA,0BAAA;AChVA;ADmVA;EACA,gBAAA;EACA,kBAAA;ACjVA;ADqVA;EACA,cAAA;EACA,gBAAA;EACA,gBAAA;EACA,UAAA;EACA,YAAA;EACA,cAAA;EACA,mBAAA;ACnVA;ADuVA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;EACA,yBAAA;EACA,kBAAA;EACA,6CAAA;EACA,4BAAA;EACA,0CAAA;EACA,iBAAA;ACrVA;ADwVA;EACA,iBAAA;EACA,SAAA;EACA,4BAAA;ACtVA;ADyVA;EACA,aAAA;EACA,eAAA;ACvVA;ADyVA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,oCAAA;ACvVA;AD2VA;EACA,gBAAA;ACzVA;AD+VA;EACA,UAAA;EACA,gBAAA;EACA,SAAA;EACA,oBAAA;EACA,kBAAA;EACA,oBAAA;EACA,SAAA;EACA,UAAA;EACA,UAAA;EACA,YAAA;EACA,YAAA;EACA,sCAAA;EACA,YAAA;EACA,kBAAA;EACA,uBAAA;AC7VA;AD+VA;EACA,gBAAA;EACA,iBAAA;EACA,gBAAA;AC7VA;ADqWA;EAEA,mBAAA;EACA,wCAAA;ACnWA;ADuWA;AACA;IACA,gCAAA;ACpWE;ADuWF;IACA,kCAAA;ACrWE;AACF;;AAEA,6CAA6C","file":"VueTimelinePro.vue","sourcesContent":["<template>\n    <div class=\"timeline_pro\">\n        <FirstPlus @onDraft=\"createDraft(0, 'left')\" v-if=\"!readOnly\" :suggestive=\"suggestiveText\"/>\n        <div\n            :key=\"item.timelineId\"\n            v-for=\"(item, i) in updateList\"\n        >\n        <UpdateForm\n            v-if=\"!readOnly && (item.mode == 'draft' || item.mode == 'edit') && draftDirection == 'left'\"\n            :key=\"item.timelineId\"\n            :title=\"item.title\"\n            :description=\"item.description\"\n            :date=\"item.date\"\n            :icon=\"item.icon\"\n            :url=\"item.url\"\n            :index=\"item.timelineId\"\n            :iconList=\"imageList\"\n            :isLast=\"i == updateList.length - 1\"\n            :accept=\"onAcceptUpdate\"\n            @cancel=\"cancelUpdate\"\n            :cancelText=\"cancelButtonText\"\n            :acceptText=\"acceptButtonText\"\n        />\n        <Update\n            v-if=\"item.mode == 'normal'\"\n            :key=\"item.timelineId\"\n            :title=\"item.title\"\n            :description=\"item.description\"\n            :date=\"item.date\"\n            :icon=\"item.icon\"\n            :url=\"item.url\"\n            :index=\"item.timelineId\"\n            @onEdit=\"editUpdate(item.timelineId)\"\n            @onRemove=\"removeUpdate(item.timelineId)\"\n            @onDraft=\"createDraft\"\n            :readOnly=\"readOnly\"\n            :isLast=\"i == updateList.length - 1\"\n            :linkProps=\"linkProps\"\n            :onFormatDate=\"formatDate\"\n        />\n        <UpdateForm\n            v-if=\"!readOnly && (item.mode == 'draft' || item.mode == 'edit') && draftDirection == 'right'\"\n            :key=\"item.timelineId\"\n            :title=\"item.title\"\n            :description=\"item.description\"\n            :date=\"item.date\"\n            :icon=\"item.icon\"\n            :url=\"item.url\"\n            :index=\"item.timelineId\"\n            :iconList=\"imageList\"\n            :isLast=\"i == updateList.length - 1\"\n            :accept=\"onAcceptUpdate\"\n            @cancel=\"cancelUpdate\"\n            :cancelText=\"cancelButtonText\"\n            :acceptText=\"acceptButtonText\"\n        />\n        </div>\n    </div>\n</template>\n\n<script>\nimport Update from './Update.vue';\nimport UpdateForm from './UpdateForm.vue';\nimport FirstPlus from './FirstPlus.vue';\n\nexport default {\n    name: 'VueTimelinePro',\n    props: {\n        imageList: {\n            type: Array,\n            default: () => [],\n        },\n        modelItem: {\n            type: Object,\n            default: () => (\n                {\n                    title: 'title',\n                    description: 'description',\n                    date: 'date',\n                    icon: 'icon',\n                    url: 'url'\n                }\n            )\n        },\n        updates: {\n            type: Array,\n            default: () => []\n        },\n        readOnly: {\n            type: Boolean,\n            default: () => true\n        },\n        suggestiveText: {\n            type: String,\n            default: () => 'Add a new update'\n        },\n        linkProps: {\n            type: Object,\n            default: () => {}\n        },\n        formatDate: {\n            type: Function,\n            default: (date) => {\n                if (!date) {\n                    return '-';\n                }\n\n                return date.toLocaleString('en-US', {\n                    month: 'long', // \"June\"\n                    day: '2-digit', // \"01\"\n                    year: 'numeric' // \"2019\"\n                });\n            }\n        },\n        acceptButtonText: {\n            type: String,\n            default: () => 'Accept'\n        },\n        cancelButtonText: {\n            type: String,\n            default: () => 'Cancel'\n        }\n    },\n    data() {\n        return {\n            updateList: [],\n            draftDirection: 'right',\n            updateToForm: {},\n            workingIndex: -1,\n            workingTimelineId: null\n        }\n    },\n    components: {\n        Update,\n        UpdateForm,\n        FirstPlus\n    },\n    created() {\n        this.loadData()\n    },\n    methods: {\n        loadData() {\n            this.updateList = this.updates.map(this.fillObject)\n        },\n        editUpdate(timelineId) {\n            // another new approach\n            this.resetWorkingItem();\n            const item = this.updateList.find(item => item.timelineId == timelineId);\n            item.mode = 'edit';\n            this.workingTimelineId = timelineId;\n        },\n        removeUpdate(timelineId) {\n            if (confirm(\"Sure to remove?\")) {\n                const indexToRemove = this.updateList.findIndex((item) => item.timelineId == timelineId);\n                const item = this.updateList.find((item) => item.timelineId == timelineId);\n                this.$emit('onRemoveItem', item, indexToRemove);\n\n                this.updateList.splice(indexToRemove, 1);\n                this.resetWorkingItem();\n            }\n        },\n        fillObject(item, index) {\n            const { title, description, date, icon, url } = this.$props.modelItem;\n\n            const timelineItem = {\n                timelineId: this.generateId(),\n                title: item[title],\n                description: item[description],\n                date: item[date],\n                icon: item[icon],\n                url: item[url],\n                mode: 'normal'\n            }\n\n            return Object.assign({}, item, timelineItem);\n        },\n        resetWorkingItem() {\n            const workingTimelineId = this.workingTimelineId;\n            if (workingTimelineId) {\n                const itemWorking = this.updateList.find(item => item.timelineId == workingTimelineId);\n                if (itemWorking.mode == 'draft') {\n                    this.updateList = this.updateList.filter(item => item.timelineId != workingTimelineId)\n                }\n\n                if (itemWorking.mode == 'edit') {\n                    this.updateList = this.updateList.map(item => {\n                        if (item.timelineId == workingTimelineId) {\n                            item.mode = 'normal';\n                        }\n\n                        return item;\n                    })\n                }\n\n                this.workingTimelineId = null;\n            }\n        },\n        createDraft(index, direction) {\n            // another new approach\n            this.resetWorkingItem();\n            const timelineId = this.generateId();\n            this.draftDirection = direction;\n            this.workingTimelineId = timelineId;\n            const newItem = {\n                timelineId,\n                mode: 'draft',\n                date: new Date()\n            }\n\n            if (index != 0) {\n                index = this.updateList.findIndex(item => item.timelineId == index)\n\n                if (direction == 'right') {\n                    index++;\n                }\n            }\n\n            this.updateList.splice(index, 0, newItem);\n        },\n        generateId() {\n            return `${Math.round(Math.random()*1000)}${Math.round(Math.random()*1000)}`;\n        },\n        sortList(items) {\n            return items.sort((firstItem, secondItem) => secondItem.date - firstItem.date);\n        },\n        onAcceptUpdate(receivedItem) {\n            const workingTimelineId = this.workingTimelineId;\n            this.sendItem(receivedItem);\n            const newList = this.updateList.map(item => {\n                if (item.timelineId == workingTimelineId) {\n                    item = Object.assign(item, receivedItem);\n                    item.mode = 'normal';\n                }\n\n                return item\n            });\n            this.updateList = this.sortList(newList);\n\n            this.resetWorkingItem();\n        },\n        cancelUpdate() {\n            this.resetWorkingItem();\n        },\n        sendItem(received) {\n            const found = this.updateList.find(item => item.timelineId == this.workingTimelineId);\n            let index = undefined;\n            const item = this.revertFill(Object.assign({}, found, received));\n            let eventName = '';\n\n            if (item.mode == 'draft') {\n                eventName = 'onAddItem';\n            }\n\n            if (item.mode == 'edit') {\n                eventName = 'onUpdateItem';\n                index = this.updateList.findIndex(item => item.timelineId == this.workingTimelineId);\n            }\n\n            delete item.timelineId;\n            delete item.mode;\n            this.$emit(eventName, item, index);\n        },\n        revertFill(item) {\n            const { title, description, date, icon, url } = this.$props.modelItem;\n\n            const newItem = Object.assign({}, item);\n\n            newItem[title] = newItem.title;\n            newItem[description] = newItem.description;\n            newItem[date] = newItem.date;\n            newItem[icon] = newItem.icon;\n            newItem[url] = newItem.url;\n\n            delete newItem.title;\n            delete newItem.description;\n            delete newItem.date;\n            delete newItem.icon;\n            delete newItem.url;\n\n            return newItem;\n        }\n    }\n}\n</script>\n\n<style lang=\"scss\">\n@mixin border-gradient($from, $to, $weight: 0) {\n  $mix-main: mix($from, $to);\n  $mix-sub-from: mix($mix-main, $from);\n  $mix-sub-to: mix($mix-main, $to);\n  \n  box-shadow: 0 1px 0 $weight rgba($mix-sub-to, .25),\n              0 -1px 0 $weight rgba($mix-sub-from, .25),\n              1px 0 0 $weight rgba($mix-sub-to, .25),\n              -1px 0 0 $weight  rgba($mix-sub-from, .25),\n              1px -1px 0 $weight rgba($mix-main, .5),\n              -1px 1px 0 $weight rgba($mix-main, .5),\n              1px 1px 0 $weight rgba($to, .75),\n              -1px -1px 0 $weight rgba($from, .75);\n}\n\n.timeline_pro {\n    &_date_selector {\n        margin-bottom: 7px;\n        &-month {\n\n        }\n\n        &-day{\n\n        }\n\n        &-year{\n\n        }\n\n    }\n\n    &_update {\n        font-family: \"Roboto\", Arial, Helvetica, sans-serif;\n        display: flex;\n        max-width: 600px;\n        padding-bottom: 2em;\n        border: solid 1px transparent;\n        position: relative;\n\n        &_left {\n            display: none;\n            flex: 0 0 auto;\n            text-align: right;\n        }\n\n        &_center{\n            margin-right: 40px;\n            margin-left: 40px;\n            position: relative;\n            width: 3px;\n\n            &_bullet {\n                position: absolute;\n                top: 15px;\n                left: 50%;\n                transform: translateX(-50%);\n                height: 40px;\n                width: 40px;\n\n                &_empty {\n                    position: absolute;\n                    background: rgba(rgb(117, 117, 117), 1);\n                    width: 35px;\n                    height: 35px;\n                    left: 2px;\n                    border-radius: 50%;\n                }\n\n                &_circle {\n                    cursor: pointer;\n                    position: absolute;\n                    display: block;\n                    height: 40px;\n                    width: 40px;\n                    border-radius: 50%;\n                    animation: rotateThis 1s linear infinite;\n                    @include border-gradient(#000, #ddd);\n\n                    + img {\n                        width: 32px;\n                    }\n                }\n\n                > img {\n                    display: block;\n                    max-width: 35px;\n                    margin: 3px auto;\n                    height: auto;\n                }\n            }\n\n            &_iconlist{\n                border-radius: 3px;\n                position: absolute;\n                left: 0;\n                display: none;\n                justify-content: center;\n                flex-wrap: wrap;\n                width: 200px;\n                z-index: 100;\n                background: #ddd;\n                left: 25px;\n                padding: 5px 0;\n                max-height: 400px;\n                overflow-y: scroll;\n\n                &.is-visible {\n                    display: flex;\n                }\n\n                &-item {\n                    cursor: pointer;\n                    transform: scale(1);\n                    transition: all .1s;\n                    width: 35px;\n\n                    &:hover {\n                        transform: scale(1.05);\n                    }\n                    > img {\n                        max-width: 100%;\n                        height: auto;\n                    }\n                }\n            }\n\n            &_line {\n                display: inline-block;\n                margin-top: 55px;\n                width: 1px;\n                height: calc(100% - 10px);\n                background-color: #313d4f;\n\n                &.is-last {\n                    display: none;\n                }\n            }\n\n            &_new {\n                border-radius: 50%;\n                background: #dddd;\n                color: #fff;\n                font-size: 1em;\n\n                height: 30px;\n                width: 30px;\n                align-items: center;\n                background-image: linear-gradient(to right,#e052a0,#f15c41);\n                border-radius: 9999px;\n                cursor: pointer;\n                flex: 0 0 auto;\n                justify-content: center;\n                transition: transform 160ms;\n                transform: translateX(-50%);\n                display: none;\n                position: absolute;\n                top: 0;\n                z-index: 900;\n                left: 50%;\n\n                &:before, &:after {\n                    content: '';\n                    width: 20px;\n                    height: 3px;\n                    background: #fff;\n                    position: absolute;\n                    top: 14px;\n                }\n\n                &:before {\n                    left: 5px;\n                }\n\n                &:after {\n                    left: 5px;\n                    transform: rotate(90deg);\n                }\n\n                .icon {\n                    font-size: 30px;\n                    position: absolute;\n                    top: -5px;\n                    left: 6.5px;\n                }\n\n                &.is-visible {\n                    display: block;\n                } \n\n                &.is-static {\n                    margin-top: 15px;\n                    display: block;\n                }\n\n                &.is-last {\n                    display: none;\n                }\n            }\n        }\n\n        &_right {\n            flex: 1;\n            &_head {\n                display: flex;\n                flex-direction: column;\n                margin-top: 4px;\n                position: relative;\n\n                &_date {\n                    line-height: 24px;\n                    font-size: .8em;\n                    color: rgba(#000, 0.6);\n                    font-weight: bolder;\n                }\n\n                &_title {\n                    flex: 1;\n                    margin: 0 0 4px;\n                    text-transform: uppercase;\n                    font-weight: 700;\n                    font-size: 1.4em;\n                    color: #f15c41;\n                    text-decoration: none;\n\n                    &:hover {\n                        color: rgba(#000, 0.96);\n                    }\n\n                    &-editable {\n                        font-size: 1.2em;\n                        margin-bottom: 1em;\n                    }\n                }\n\n                &_url {\n                    display: block;\n                    font-size: .8em;\n                    max-width: 350px;\n                    outline: 0;\n                    border: none;\n                    padding: 0.5em;\n                    background: rgba(rgb(247, 246, 246), 1);\n                }\n            }\n\n            &_image {\n                box-sizing: border-box;\n                margin: 6px 0 12px;\n                max-width: 100%;\n                border: 1px solid #a8c6df;\n                border-radius: 6px;\n                box-shadow: 0 1px 5px 0 rgba(23,24,25,.6);\n                transition: all 250ms linear;\n                animation: float 3.5s ease-in-out infinite;\n                user-select: none;\n            }\n\n            &_content {\n                font-size: .95em;\n                margin: 0;\n                max-width: calc(100% - 50px);\n            }\n\n            &_buttons {\n                display: flex;\n                margin-top: 5px;\n\n                &_button {\n                    border-radius: 2px;\n                    cursor: pointer;\n                    padding: 5px 7px;\n                    background: rgba(#ddd, .5);\n\n                    &.acept {}\n\n                    &.cancel {\n                        margin-left: 5px;\n                    }\n                }\n            }\n        }\n\n        &_textarea {\n            width: 90%;\n            overflow: hidden;\n            border: 0;\n            font-family: inherit;\n            font-size: inherit;\n            line-height: inherit;\n            margin: 0;\n            outline: 0;\n            padding: 0;\n            resize: none;\n            cursor: text;\n            writing-mode: horizontal-tb !important;\n            resize: none;\n            margin-bottom: 1em;\n            background: transparent;\n\n            &.title {\n                font-size: 1.2em;\n                font-weight: bold;\n                margin-bottom: 0;\n            }\n        }\n\n    }\n}\n\n// circle\n.timelime-pro-bullet-circle {\n  \n    border-radius: 100%;\n    animation: rotateThis 1s linear infinite;\n}\n\n\n@keyframes rotateThis {\n  from {\n    transform: rotate(0deg) scale(1);\n  }\n  \n  to {\n    transform: rotate(360deg) scale(1);\n  }\n}\n\n</style>",".timeline_pro_date_selector {\n  margin-bottom: 7px;\n}\n.timeline_pro_update {\n  font-family: \"Roboto\", Arial, Helvetica, sans-serif;\n  display: flex;\n  max-width: 600px;\n  padding-bottom: 2em;\n  border: solid 1px transparent;\n  position: relative;\n}\n.timeline_pro_update_left {\n  display: none;\n  flex: 0 0 auto;\n  text-align: right;\n}\n.timeline_pro_update_center {\n  margin-right: 40px;\n  margin-left: 40px;\n  position: relative;\n  width: 3px;\n}\n.timeline_pro_update_center_bullet {\n  position: absolute;\n  top: 15px;\n  left: 50%;\n  transform: translateX(-50%);\n  height: 40px;\n  width: 40px;\n}\n.timeline_pro_update_center_bullet_empty {\n  position: absolute;\n  background: #757575;\n  width: 35px;\n  height: 35px;\n  left: 2px;\n  border-radius: 50%;\n}\n.timeline_pro_update_center_bullet_circle {\n  cursor: pointer;\n  position: absolute;\n  display: block;\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  animation: rotateThis 1s linear infinite;\n  box-shadow: 0 1px 0 0 rgba(166, 166, 166, 0.25), 0 -1px 0 0 rgba(56, 56, 56, 0.25), 1px 0 0 0 rgba(166, 166, 166, 0.25), -1px 0 0 0 rgba(56, 56, 56, 0.25), 1px -1px 0 0 rgba(111, 111, 111, 0.5), -1px 1px 0 0 rgba(111, 111, 111, 0.5), 1px 1px 0 0 rgba(221, 221, 221, 0.75), -1px -1px 0 0 rgba(0, 0, 0, 0.75);\n}\n.timeline_pro_update_center_bullet_circle + img {\n  width: 32px;\n}\n.timeline_pro_update_center_bullet > img {\n  display: block;\n  max-width: 35px;\n  margin: 3px auto;\n  height: auto;\n}\n.timeline_pro_update_center_iconlist {\n  border-radius: 3px;\n  position: absolute;\n  left: 0;\n  display: none;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 200px;\n  z-index: 100;\n  background: #ddd;\n  left: 25px;\n  padding: 5px 0;\n  max-height: 400px;\n  overflow-y: scroll;\n}\n.timeline_pro_update_center_iconlist.is-visible {\n  display: flex;\n}\n.timeline_pro_update_center_iconlist-item {\n  cursor: pointer;\n  transform: scale(1);\n  transition: all 0.1s;\n  width: 35px;\n}\n.timeline_pro_update_center_iconlist-item:hover {\n  transform: scale(1.05);\n}\n.timeline_pro_update_center_iconlist-item > img {\n  max-width: 100%;\n  height: auto;\n}\n.timeline_pro_update_center_line {\n  display: inline-block;\n  margin-top: 55px;\n  width: 1px;\n  height: calc(100% - 10px);\n  background-color: #313d4f;\n}\n.timeline_pro_update_center_line.is-last {\n  display: none;\n}\n.timeline_pro_update_center_new {\n  border-radius: 50%;\n  background: #dddd;\n  color: #fff;\n  font-size: 1em;\n  height: 30px;\n  width: 30px;\n  align-items: center;\n  background-image: linear-gradient(to right, #e052a0, #f15c41);\n  border-radius: 9999px;\n  cursor: pointer;\n  flex: 0 0 auto;\n  justify-content: center;\n  transition: transform 160ms;\n  transform: translateX(-50%);\n  display: none;\n  position: absolute;\n  top: 0;\n  z-index: 900;\n  left: 50%;\n}\n.timeline_pro_update_center_new:before, .timeline_pro_update_center_new:after {\n  content: \"\";\n  width: 20px;\n  height: 3px;\n  background: #fff;\n  position: absolute;\n  top: 14px;\n}\n.timeline_pro_update_center_new:before {\n  left: 5px;\n}\n.timeline_pro_update_center_new:after {\n  left: 5px;\n  transform: rotate(90deg);\n}\n.timeline_pro_update_center_new .icon {\n  font-size: 30px;\n  position: absolute;\n  top: -5px;\n  left: 6.5px;\n}\n.timeline_pro_update_center_new.is-visible {\n  display: block;\n}\n.timeline_pro_update_center_new.is-static {\n  margin-top: 15px;\n  display: block;\n}\n.timeline_pro_update_center_new.is-last {\n  display: none;\n}\n.timeline_pro_update_right {\n  flex: 1;\n}\n.timeline_pro_update_right_head {\n  display: flex;\n  flex-direction: column;\n  margin-top: 4px;\n  position: relative;\n}\n.timeline_pro_update_right_head_date {\n  line-height: 24px;\n  font-size: 0.8em;\n  color: rgba(0, 0, 0, 0.6);\n  font-weight: bolder;\n}\n.timeline_pro_update_right_head_title {\n  flex: 1;\n  margin: 0 0 4px;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-size: 1.4em;\n  color: #f15c41;\n  text-decoration: none;\n}\n.timeline_pro_update_right_head_title:hover {\n  color: rgba(0, 0, 0, 0.96);\n}\n.timeline_pro_update_right_head_title-editable {\n  font-size: 1.2em;\n  margin-bottom: 1em;\n}\n.timeline_pro_update_right_head_url {\n  display: block;\n  font-size: 0.8em;\n  max-width: 350px;\n  outline: 0;\n  border: none;\n  padding: 0.5em;\n  background: #f7f6f6;\n}\n.timeline_pro_update_right_image {\n  box-sizing: border-box;\n  margin: 6px 0 12px;\n  max-width: 100%;\n  border: 1px solid #a8c6df;\n  border-radius: 6px;\n  box-shadow: 0 1px 5px 0 rgba(23, 24, 25, 0.6);\n  transition: all 250ms linear;\n  animation: float 3.5s ease-in-out infinite;\n  user-select: none;\n}\n.timeline_pro_update_right_content {\n  font-size: 0.95em;\n  margin: 0;\n  max-width: calc(100% - 50px);\n}\n.timeline_pro_update_right_buttons {\n  display: flex;\n  margin-top: 5px;\n}\n.timeline_pro_update_right_buttons_button {\n  border-radius: 2px;\n  cursor: pointer;\n  padding: 5px 7px;\n  background: rgba(221, 221, 221, 0.5);\n}\n.timeline_pro_update_right_buttons_button.cancel {\n  margin-left: 5px;\n}\n.timeline_pro_update_textarea {\n  width: 90%;\n  overflow: hidden;\n  border: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n  margin: 0;\n  outline: 0;\n  padding: 0;\n  resize: none;\n  cursor: text;\n  writing-mode: horizontal-tb !important;\n  resize: none;\n  margin-bottom: 1em;\n  background: transparent;\n}\n.timeline_pro_update_textarea.title {\n  font-size: 1.2em;\n  font-weight: bold;\n  margin-bottom: 0;\n}\n\n.timelime-pro-bullet-circle {\n  border-radius: 100%;\n  animation: rotateThis 1s linear infinite;\n}\n\n@keyframes rotateThis {\n  from {\n    transform: rotate(0deg) scale(1);\n  }\n  to {\n    transform: rotate(360deg) scale(1);\n  }\n}\n\n/*# sourceMappingURL=VueTimelinePro.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var VueTimelinePro = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

var defaultComponentName = 'VueTimelinePro';

var install = function (Vue, options) {
    if ( options === void 0 ) options = {};

    if (install.installed) {
        return;
    }

    install.installed = true;

    var componentName = options.componentName || defaultComponentName;
    Vue.component(componentName, VueTimelinePro);
};

// Create module definition for Vue.use()
var plugin = {
    install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}

if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default plugin;
