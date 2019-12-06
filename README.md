# vue-timeline-pro

Simple, highly customizable, and no dependency timeline.


<p align="center">
    <img src="https://media.giphy.com/media/VGDOql2Lb801LlmUDn/giphy.gif" alt="Vue timeline Pro">
</p>

## Install
```
npm install vue-timeline-pro --save
```

## How to use
Include plugin in your `main.js` file.

```js
import VTimelinePro from 'vue-timeline-pro';

Vue.use(VTimelinePro);

/*
By default, the plugin will use "VueTimelinePro" name for the component.

If you need to change it, you can do so by providing "componentName" param.
 
Example:
 
Vue.use(VTimelinePro, { componentName: "foo-timeline-pro" })
...
<foo-timeline-pro updates="updates"></foo-timeline-pro>

*/
```


### Create Basic Timeline

```js
<VueTimelinePro updates="updates"/>
```

```js
data() {
    return {
        updates: [
            {
                icon: '/awesomeimage.png',
                title: 'My awesome title',
                description: 'Lorem ...',
                date: new Date(),
                url: 'https://wakeupyouneedtomakemoney...'   
            }
        ]
    }
}
```


### Create a editable timeline

```js
<VueTimelinePro updates="updates" :readOnly="false"/>
```

```js
data() {
    return {
        updates: [...],
    }
}
```

Listen when is added an item

```js
<VueTimelinePro updates="updates" :readOnly="false" @onAddItem="onAddItem"/>
```
```js
methods: {
    onAddItem(item, index) {
        console.log(item, index);
    }
}
```

Listen when is removed an item

```js
<VueTimelinePro updates="updates" :readOnly="false" @onRemoveItem="onRemoveItem"/>
```
```js
methods: {
    onRemoveItem(item, index) {
        console.log(item, index);
    }
}
```

Listen when is updated an item

```js
<VueTimelinePro updates="updates" :readOnly="false" @onUpdateItem="onUpdateItem"/>
```
```js
methods: {
    onUpdateItem(item) {
        console.log(item);
    }
}
```

### Format the date displayed
```js
<VueTimelinePro updates="updates" :formatDate="formatDate"/>
```
```js
// use your favorite library or simply vanilla
import spacetime from 'spacetime';

...
methods: {
    formatDate(date) {
        return spacetime(date).format('nice');
    }
}
```

### Add custom props to link

```js
<VueTimelinePro updates="updates" :linkProps="{'target': '_blank'}"/>
```

### Redefine update model fields

```js
<VueTimelinePro :updates="updates" :modelItem="updateModel" />
```

```js
data() {
    return {
        ...
        updateModel: {
          title: 'fooTitle',
          description: 'fooDescription',
          date: 'fooDate',
          icon: 'fooIcon',
          url: 'fooUrl'
        }
    }
},
methods: {
    onAddUpdate(item) {
        console.log(item);
        /*  fooDate: (...),
            fooDescription: (...)
            fooIcon: (...)
            fooTitle: (...)
            fooUrl: (...)
        */
    },
}
```


## Props

| Name             | Type    | Required | Default                                                                                        | Description                                                                                |
|------------------|---------|----------|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| updates          | Array   | false    | []                                                                                             | List of updates.                                                                           |
| readOnly         | Boolean | false    | true                                                                                           | Is possible edit the list or not?                                                          |
| suggestiveText   | String  | false    | Add a new update                                                                               | Text used by first plus.                                                                   |
| linkProps        | Object  | false    | {}                                                                                             | Props assigned to link to each update.                                                     |
| acceptButtonText | String  | false    | 'Accept'                                                                                       | Text for accept button when is edited the update.                                          |
| cancelButtonText | string  | false    | 'Cancel'                                                                                       | Text for cancel button when is edited the update.                                          |
| formatDate       | Func    | false    | () => {}...                                                                                    | Function used to format a date object. Default format en-US, example: *December 05, 2019.* |
| imageList        | Array   | false    | []                                                                                             | List of image urls, used to represent an update.                                           |
| modelItem        | Object  | false    | title:'title', description:'description', date:'date', icon:'icon', url:'url'} | Update model, will be used to map values of each update.                                                   |


## Events @

- **onAddItem(updateItem)** - Event when is added an new update.
  - updateItem: Object added.
- **onUpdateItem(updateItem, index)** - Trigger when is updated an update.
  - updateItem: Object updated.
  - index: Index of object updated.
- **onRemoveItem(removedUpdateItem, index)** - Trigger when is removed an update.
  - removedUpdateItem: Object removed.
  - index: Index of object removed.
