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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"updateItem",staticClass:"timeline_pro_update",on:{"mousemove":_vm.updatePosition,"mouseleave":_vm.reset}},[_c('div',{staticClass:"timeline_pro_update_center"},[_c('span',{staticClass:"timeline_pro_update_center_bullet"},[(_vm.icon)?_c('img',{attrs:{"src":_vm.icon,"alt":""}}):_vm._e(),_vm._v(" "),(!_vm.icon)?_c('div',{staticClass:"timeline_pro_update_center_bullet_empty"}):_vm._e()]),_vm._v(" "),_c('span',{class:'timeline_pro_update_center_line ' + (_vm.isLast ? 'is-last' : '')}),_vm._v(" "),(!_vm.readOnly)?_c('span',{ref:"plus",class:'timeline_pro_update_center_new'  + (_vm.isLast ? 'is-last' : ''),on:{"click":_vm.createDraft}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right"},[_c('div',{staticClass:"timeline_pro_update_right_head"},[_c('span',{staticClass:"timeline_pro_update_right_head_date"},[_vm._v("\n                "+_vm._s(_vm.onFormatDate(_vm.date))+"\n            ")]),_vm._v(" "),_c('a',_vm._b({staticClass:"timeline_pro_update_right_head_title",attrs:{"href":_vm.url}},'a',_vm.linkProps,false),[_vm._v("\n                "+_vm._s(_vm.title)+"\n            ")]),_vm._v(" "),(!_vm.readOnly)?_c('div',{staticClass:"timeline_menu"},[_c('button',{class:'timeline_menu_dots dots ' + (_vm.isOpenMenu ? 'on' : ''),on:{"click":_vm.openMenu}},[_c('span')]),_vm._v(" "),_c('div',{class:'timeline_menu_buttons ' + (_vm.isOpenMenu ? 'active' : ''),on:{"blur":_vm.blurMenu}},[_c('div',{staticClass:"timeline_menu_buttons_button",on:{"click":function($event){return _vm.$emit('onEdit', _vm.index)}}},[_vm._v("Edit")]),_vm._v(" "),_c('div',{staticClass:"timeline_menu_buttons_button",on:{"click":function($event){return _vm.$emit('onRemove', _vm.index)}}},[_vm._v("Delete")])])]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right_content"},[_c('p',[_vm._v(_vm._s(_vm.description))])])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-10ab034e_0", { source: "button.dots{width:30px;height:30px;border:none;background:0 0;position:relative;cursor:pointer}button.dots:focus{outline:0}button.dots.dots span,button.dots.dots:after,button.dots.dots:before{width:6px;height:20%;border-radius:50%;position:absolute;left:0;background:#111;transform:rotate(0);transition:all .4s;left:1%;right:1%;margin:0 auto}button.dots.dots:after,button.dots.dots:before{content:\"\"}button.dots.dots:after{top:1%;margin-top:0}button.dots.dots:before{bottom:8px;margin-bottom:0}button.dots.dots span{top:10px;margin-top:-2px}button.dots.dots.on:after{transform:rotate(135deg) translate(9px,-9px);width:100%;top:-14%}button.dots.dots.on:before{transform:rotate(225deg);bottom:60%;margin-bottom:-2px;width:100%}button.dots.dots.on span{transform:rotate(135deg)}.timeline_menu{position:absolute;right:10px}.timeline_menu_buttons{border-radius:3px;position:absolute;width:80px;border:solid 1px rgba(0,0,0,.1);text-align:center;font-size:.8em;z-index:10;top:100%;right:0;display:none;background:#fff}.timeline_menu_buttons_button{padding:.4em .5em}.timeline_menu_buttons_button:hover{background:rgba(0,0,0,.1)}.timeline_menu_buttons.active{display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
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
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"timeline_pro_date_selector"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.month),expression:"month"}],staticClass:"timeline_pro_date_selector-month",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.month=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.emitChange]}},_vm._l((_vm.getMonths()),function(item){return _c('option',{domProps:{"value":item.value}},[_vm._v(_vm._s(item.label))])}),0),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.day),expression:"day"}],staticClass:"timeline_pro_date_selector-day",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.day=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.emitChange]}},_vm._l((_vm.getDays()),function(item){return _c('option',{domProps:{"value":item}},[_vm._v(_vm._s(item))])}),0),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.year),expression:"year"}],staticClass:"timeline_pro_date_selector-year",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.year=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.emitChange]}},_vm._l((_vm.getYears()),function(item){return _c('option',{domProps:{"value":item}},[_vm._v(_vm._s(item))])}),0)])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
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
        Date: __vue_component__$1
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
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"updateItem",staticClass:"timeline_pro_update"},[_c('div',{staticClass:"timeline_pro_update_left"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.dateItem),expression:"dateItem"}],attrs:{"type":"date","placeholder":"date"},domProps:{"value":(_vm.dateItem)},on:{"input":function($event){if($event.target.composing){ return; }_vm.dateItem=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_center"},[_c('span',{staticClass:"timeline_pro_update_center_bullet"},[_c('span',{staticClass:"timeline_pro_update_center_bullet_circle",on:{"mousedown":_vm.toggleMenuIconList}}),_vm._v(" "),_c('img',{attrs:{"src":_vm.iconItem,"alt":""}})]),_vm._v(" "),(_vm.iconList)?_c('div',{class:'timeline_pro_update_center_iconlist ' + (_vm.iconListVisible ? 'is-visible' : ''),nativeOn:{"blur":function($event){return _vm.blurMenuIconList($event)}}},_vm._l((_vm.iconList),function(item,indexItem){return _c('div',{key:indexItem,staticClass:"timeline_pro_update_center_iconlist-item"},[_c('img',{attrs:{"src":item,"alt":"icon"},on:{"click":function($event){return _vm.selectIcon(item)}}})])}),0):_vm._e(),_vm._v(" "),_c('span',{class:'timeline_pro_update_center_line ' + (_vm.isLast ? 'is-last' : '')})]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right"},[_c('div',{staticClass:"timeline_pro_update_right_head"},[_c('span',{staticClass:"timeline_pro_update_right_head_date"},[_c('Date',{attrs:{"date":_vm.dateItem},on:{"changeDate":_vm.setDate}})],1),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right_head_title timeline_pro_update_right_head_title-editable"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.titleItem),expression:"titleItem"}],ref:"titleArea",staticClass:"timeline_pro_update_textarea title",attrs:{"maxlength":"50","type":"text","placeholder":"Add title"},domProps:{"value":(_vm.titleItem)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.titleItem=$event.target.value;},function($event){return _vm.autoGrowTextarea('titleArea')}]}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.urlItem),expression:"urlItem"}],staticClass:"timeline_pro_update_right_head_url",staticStyle:{"width":"100%"},attrs:{"type":"text","placeholder":"URL"},domProps:{"value":(_vm.urlItem)},on:{"input":function($event){if($event.target.composing){ return; }_vm.urlItem=$event.target.value;}}})])]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right_content"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.descriptionItem),expression:"descriptionItem"}],ref:"descriptionArea",staticClass:"timeline_pro_update_textarea",attrs:{"placeholder":"Add description"},domProps:{"value":(_vm.descriptionItem)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.descriptionItem=$event.target.value;},function($event){return _vm.autoGrowTextarea('descriptionArea')}]}})]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right_buttons"},[_c('div',{staticClass:"timeline_pro_update_right_buttons_button acept",on:{"click":_vm.saveItem}},[_vm._v(_vm._s(_vm.acceptText))]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right_buttons_button cancel",on:{"click":function($event){return _vm.$emit('cancel')}}},[_vm._v(_vm._s(_vm.cancelText))])])])])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
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
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"timeline_pro_update"},[_c('div',{staticClass:"timeline_pro_update_center"},[_c('span',{staticClass:"timeline_pro_update_center_line"}),_vm._v(" "),_c('span',{staticClass:"timeline_pro_update_center_new is-static",on:{"click":function($event){return _vm.$emit('onDraft')}}})]),_vm._v(" "),_c('div',{staticClass:"timeline_pro_update_right"},[_c('p',{staticStyle:{"margin-top":"20px","margin-bottom":"0","font-weight":"bold","font-size":"1.1em"}},[_vm._v(_vm._s(_vm.suggestive))])])])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
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
        Update: __vue_component__,
        UpdateForm: __vue_component__$2,
        FirstPlus: __vue_component__$3
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
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"timeline_pro"},[(!_vm.readOnly)?_c('FirstPlus',{attrs:{"suggestive":_vm.suggestiveText},on:{"onDraft":function($event){return _vm.createDraft(0, 'left')}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.updateList),function(item,i){return _c('div',{key:item.timelineId},[(!_vm.readOnly && (item.mode == 'draft' || item.mode == 'edit') && _vm.draftDirection == 'left')?_c('UpdateForm',{key:item.timelineId,attrs:{"title":item.title,"description":item.description,"date":item.date,"icon":item.icon,"url":item.url,"index":item.timelineId,"iconList":_vm.imageList,"isLast":i == _vm.updateList.length - 1,"accept":_vm.onAcceptUpdate,"cancelText":_vm.cancelButtonText,"acceptText":_vm.acceptButtonText},on:{"cancel":_vm.cancelUpdate}}):_vm._e(),_vm._v(" "),(item.mode == 'normal')?_c('Update',{key:item.timelineId,attrs:{"title":item.title,"description":item.description,"date":item.date,"icon":item.icon,"url":item.url,"index":item.timelineId,"readOnly":_vm.readOnly,"isLast":i == _vm.updateList.length - 1,"linkProps":_vm.linkProps,"onFormatDate":_vm.formatDate},on:{"onEdit":function($event){return _vm.editUpdate(item.timelineId)},"onRemove":function($event){return _vm.removeUpdate(item.timelineId)},"onDraft":_vm.createDraft}}):_vm._e(),_vm._v(" "),(!_vm.readOnly && (item.mode == 'draft' || item.mode == 'edit') && _vm.draftDirection == 'right')?_c('UpdateForm',{key:item.timelineId,attrs:{"title":item.title,"description":item.description,"date":item.date,"icon":item.icon,"url":item.url,"index":item.timelineId,"iconList":_vm.imageList,"isLast":i == _vm.updateList.length - 1,"accept":_vm.onAcceptUpdate,"cancelText":_vm.cancelButtonText,"acceptText":_vm.acceptButtonText},on:{"cancel":_vm.cancelUpdate}}):_vm._e()],1)})],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-ec2959e8_0", { source: ".timeline_pro_date_selector{margin-bottom:7px}.timeline_pro_update{font-family:Roboto,Arial,Helvetica,sans-serif;display:flex;padding-bottom:2em;border:solid 1px transparent;position:relative}.timeline_pro_update_left{display:none;flex:0 0 auto;text-align:right}.timeline_pro_update_center{margin-right:40px;margin-left:40px;position:relative;width:3px}.timeline_pro_update_center_bullet{position:absolute;top:15px;left:50%;transform:translateX(-50%);height:40px;width:40px}.timeline_pro_update_center_bullet_empty{position:absolute;background:#757575;width:35px;height:35px;left:2px;border-radius:50%}.timeline_pro_update_center_bullet_circle{cursor:pointer;position:absolute;display:block;height:40px;width:40px;border-radius:50%;animation:rotateThis 1s linear infinite;box-shadow:0 1px 0 0 rgba(166,166,166,.25),0 -1px 0 0 rgba(56,56,56,.25),1px 0 0 0 rgba(166,166,166,.25),-1px 0 0 0 rgba(56,56,56,.25),1px -1px 0 0 rgba(111,111,111,.5),-1px 1px 0 0 rgba(111,111,111,.5),1px 1px 0 0 rgba(221,221,221,.75),-1px -1px 0 0 rgba(0,0,0,.75)}.timeline_pro_update_center_bullet_circle+img{width:32px}.timeline_pro_update_center_bullet>img{display:block;max-width:35px;margin:3px auto;height:auto}.timeline_pro_update_center_iconlist{border-radius:3px;position:absolute;left:0;display:none;justify-content:center;flex-wrap:wrap;width:200px;z-index:100;background:#ddd;left:25px;padding:5px 0;max-height:400px;overflow-y:scroll}.timeline_pro_update_center_iconlist.is-visible{display:flex}.timeline_pro_update_center_iconlist-item{cursor:pointer;transform:scale(1);transition:all .1s;width:35px}.timeline_pro_update_center_iconlist-item:hover{transform:scale(1.05)}.timeline_pro_update_center_iconlist-item>img{max-width:100%;height:auto}.timeline_pro_update_center_line{display:inline-block;margin-top:55px;width:1px;height:calc(100% - 10px);background-color:#313d4f}.timeline_pro_update_center_line.is-last{display:none}.timeline_pro_update_center_new{border-radius:50%;background:#dddd;color:#fff;font-size:1em;height:30px;width:30px;align-items:center;background-image:linear-gradient(to right,#e052a0,#f15c41);border-radius:9999px;cursor:pointer;flex:0 0 auto;justify-content:center;transition:transform 160ms;transform:translateX(-50%);display:none;position:absolute;top:0;z-index:900;left:50%}.timeline_pro_update_center_new:after,.timeline_pro_update_center_new:before{content:\"\";width:20px;height:3px;background:#fff;position:absolute;top:14px}.timeline_pro_update_center_new:before{left:5px}.timeline_pro_update_center_new:after{left:5px;transform:rotate(90deg)}.timeline_pro_update_center_new .icon{font-size:30px;position:absolute;top:-5px;left:6.5px}.timeline_pro_update_center_new.is-visible{display:block}.timeline_pro_update_center_new.is-static{margin-top:15px;display:block}.timeline_pro_update_center_new.is-last{display:none}.timeline_pro_update_right{flex:1}.timeline_pro_update_right_head{display:flex;flex-direction:column;margin-top:4px;position:relative}.timeline_pro_update_right_head_date{line-height:24px;font-size:.8em;color:rgba(0,0,0,.6);font-weight:bolder}.timeline_pro_update_right_head_title{flex:1;margin:0 0 4px;text-transform:uppercase;font-weight:700;font-size:1.4em;color:#f15c41;text-decoration:none}.timeline_pro_update_right_head_title:hover{color:rgba(0,0,0,.96)}.timeline_pro_update_right_head_title-editable{font-size:1.2em;margin-bottom:1em}.timeline_pro_update_right_head_url{display:block;font-size:.8em;max-width:350px;outline:0;border:none;padding:.5em;background:#f7f6f6}.timeline_pro_update_right_image{box-sizing:border-box;margin:6px 0 12px;max-width:100%;border:1px solid #a8c6df;border-radius:6px;box-shadow:0 1px 5px 0 rgba(23,24,25,.6);transition:all 250ms linear;animation:float 3.5s ease-in-out infinite;user-select:none}.timeline_pro_update_right_content{font-size:.95em;margin:0;max-width:calc(100% - 50px)}.timeline_pro_update_right_buttons{display:flex;margin-top:5px}.timeline_pro_update_right_buttons_button{border-radius:2px;cursor:pointer;padding:5px 7px;background:rgba(221,221,221,.5)}.timeline_pro_update_right_buttons_button.cancel{margin-left:5px}.timeline_pro_update_textarea{width:90%;overflow:hidden;border:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;outline:0;padding:0;resize:none;cursor:text;writing-mode:horizontal-tb!important;resize:none;margin-bottom:1em;background:0 0}.timeline_pro_update_textarea.title{font-size:1.2em;font-weight:700;margin-bottom:0}.timelime-pro-bullet-circle{border-radius:100%;animation:rotateThis 1s linear infinite}@keyframes rotateThis{from{transform:rotate(0) scale(1)}to{transform:rotate(360deg) scale(1)}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = normalizeComponent(
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
    Vue.component(componentName, __vue_component__$4);
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
