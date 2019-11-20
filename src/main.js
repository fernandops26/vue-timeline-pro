import VueTimelinePro from './components/VueTimelinePro.vue';

const defaultComponentName = 'VueTimelinePro';

const install = function (Vue, options = {}) {
    if (install.installed) {
        return;
    }

    install.installed = true;

    const componentName = options.componentName || defaultComponentName;
    Vue.component(componentName, VueTimelinePro);
}

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}

if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default plugin;