//===========================================================================================
Vue.component("f-table", {
    props: ['value', 'headers', 'updateForm', 'updateFormAttr', "updateApi", 'items', 'label', 'excel', 'showSearch', 'sumFormat', 'disabledHover', 'returnObject', "itemKey", 'itemsPerPage', "disabledUpdate", 'hideDefaultFooter', 'template', 'headercomponent'],
    data: function () {
        var headersAttr = bindData(this.headers);
        var strTableTemplate = this.template || '';

        if (headersAttr) {
            _.forEach(headersAttr.filter(i => !!i.el), function (c) {
                var ctl = buildControl([c], false);

                ctl.attr("v-bind", "item.attr");
                ctl.attr(":item", "item");
                ctl.attr(":index", "items.indexOf(item)");
                ctl.attr("v-on:mouseover", "$emit('mouseover:row',item)");
                ctl.attr("v-on:mouseleave", "$emit('mouseleave:row',item)");

                if (!c.attr['v-model']) ctl.attr("v-model", `item['${c.value}']`);

                strTableTemplate += `<template v-slot:item.${c.value}="{item}">${ctl[0].outerHTML}</template>`
            });
        }

        this.$options.template = `
            <v-card outlined v-if="headerCols" ref="myTable">
                <v-card-title v-if="showSearch || label || ((newAPI() || newAction()) && !disabledUpdate)" align="end" class="py-2 px-3">
                    <div class="primary--text text-left" v-html="label" style="font-weight: 500; font-size: 1.1rem;"></div>
                    <v-spacer></v-spacer><component :is="headercomponent"></component>
                    <v-btn v-if="excel" icon color="primary" @click="toExcel"><v-icon>mdi-microsoft-excel</v-icon></v-btn>
                    <v-text-field v-if="showSearch" dense @input="updateSearch" prepend-inner-icon="mdi-magnify" label="" single-line hide-details class="ml-3 flex-grow-0" style="width: 25%; min-width: 200px;"></v-text-field>
                    <v-btn v-if="(newAPI() || newAction()) && !disabledUpdate" class="ml-3" outlined x-small fab dark color="primary" @click="newBtnClick"><v-icon dark>mdi-plus</v-icon></v-btn>
                </v-card-title>
    
                <v-data-table class="tTable" :class="{tTableNoHover: disabledHover}" v-bind="$attrs" :items="items" :item-key="itemKey" :headers="headerCols" :items-per-page="itemsPerPage" :hide-default-footer="_hideDefaultFooter" v-model="itemselected" calculate-widths  v-on:click:row="$emit('click:row', $event)" v-on:item-selected="itemSelect()" v-on:toggle-select-all="itemSelect()" :search="search" :custom-filter="customSearch">
                    <template v-for="(h, index) in headerCols" :key="index" v-slot:['header.'+h.value]="{ header }"><span v-html="header.text"></span></template>
                    ${strTableTemplate}
                    <template v-if="!disabledUpdate" v-slot:item.ctrl-update="{item}">
                        <div class="d-flex justify-center" v-if="item['ctrl-update'] != 0">
                            <v-btn v-if="deleteAPI()" @click="deleteItem(item, deleteAPI())" x-small fab icon><v-icon color="red darken-3">mdi-trash-can-outline</v-icon></v-btn>
                            <v-btn v-if="editAPI() || editAction()" @click="editItem(item)" x-small fab icon><v-icon color="green darken-2">mdi-square-edit-outline</v-icon></v-btn>
                        </div>
                    </template>
                </v-data-table>
    
                <v-divider v-if="sumFormat"></v-divider>
                <v-card-actions v-if="sumFormat">
                    <v-spacer></v-spacer><span class="title font-weight-light">{{sumText}}</span>
                </v-card-actions>
                <f-dialog v-model="editDialog" v-bind="updateFormAttr" :data.sync="editData" :data-out.sync="vueData[dataOut]" :title="formTitle" :button="updateButton" :controls="updateForm"></f-dialog>
            </v-card>
            `;
        //----------------------------------------------------------------------       

        return {
            editDialog: false,
            search: '',
            itemselected: [],
            returnValue: [],
            editData: {},
            editedIndex: -1,
            updateButton: [
                {
                    "v-if": "title=='Cập nhật'",
                    label: "Lưu",
                    getoutdata: true,
                    action: () => {
                        this.save(this.editAPI());
                    }
                },
                {
                    "v-if": "title=='Thêm mới'",
                    label: "Thêm mới",
                    getoutdata: true,
                    action: () => {
                        this.addnew(this.newAPI())
                    }
                }
            ],
            newAction: function () {
                if (this.updateApi) return this.updateApi['new-action']
                else return null;
            },
            newAPI: function () {
                if (this.updateApi) return this.updateApi.new;
                else return null;
            },
            editAction: function () {
                if (this.updateApi) return this.updateApi['edit-action']
                else return null;
            },
            editAPI: function () {
                if (this.updateApi) return this.updateApi.edit;
                else return null;
            },
            deleteAPI: function () {
                if (this.updateApi) return this.updateApi.delete;
                else return null;
            },
            defaultItem: function () {
                if (this.updateApi) {
                    if (typeof this.updateApi['default-item'] === 'undefined') return {};
                    var dataItem = {}
                    mapData(this.updateApi['default-item'], dataItem, vueData);
                    return dataItem;
                }
                else return {};
            },
        }
    },
    mounted: function () {
        this.editData = Object.assign({}, this.defaultItem())
        this.editedIndex = -1
        this.itemSelectRebuild(this.value);


        // this.$nextTick(() => {
        //     function getAbsRect(elOrRef) {
        //         const dom = toDom(elOrRef);
        //         if (!dom) throw new Error('Ref không phải DOM element');
        //         const r = dom.getBoundingClientRect();
        //         return { top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height };
        //     }

        //     function toDom(el) {
        //         if (!el) return null;
        //         if (el.$el instanceof Element) return el.$el;
        //         if (el instanceof Element) return el;
        //         if (Array.isArray(el)) return el[0] instanceof Element ? el[0] : null;
        //         if (el instanceof NodeList || el instanceof HTMLCollection) return el[0] || null;
        //         if (el.jquery && el[0] instanceof Element) return el[0];
        //         return null;
        //     }

        //     try {
        //         setTimeout(()=>{                    
        //             const rect = getAbsRect(this.$refs.myTable); // hoặc this.$refs.childBox, this.$refs.row
        //             console.log('mounted rect:', rect.top, rect.height);
        //             //if(rect.top + rect.height > $(window).height()){
        //                 this.height =  $(window).height() - rect.top - 122;
        //             //}
                    
        //         }, 10)
                
        //     } catch (e) {
        //         console.warn(e.message);
        //     }
        // });

    },
    watch: {
        editDialog(val) {
            if (!val) {
                _.forEach(this.editData, (v, k) => {
                    this.editData[k] = undefined;
                });
                this.editedIndex = -1
            } else {
                this.editData.dialogModel = (this.edit ? 'edit' : 'new')
            }
        },
        value(newVal, oldVal,) {
            t = this;
            if (t.returnValue != newVal) this.itemSelectRebuild(newVal);
        }
    },
    computed: {
        headerCols() {
            if (_.isBoolean(this.disabledUpdate) && this.disabledUpdate) {
                _.remove(this.headers, function (n) {
                    return n.value == 'ctrl-update';
                });
            };

            return this.headers;
        },
        _hideDefaultFooter() {
            if (this.items) {
                if (this.itemsPerPage > 0 && this.itemsPerPage < this.items.length) return false;
            }
            if (this.hideDefaultFooter) return this.hideDefaultFooter;
            return false;
        },
        edit() {
            return this.editedIndex >= 0;
        },
        formTitle() {
            return this.edit ? 'Cập nhật' : 'Thêm mới';
        },
        dataOut() {
            if (this.updateApi) return this.updateApi['data-out']
            else return null;
        },
        sumText() {
            var items = this.items;
            return _.replace(this.sumFormat, /\[\[(.*?)\]\]/gm, function (s, key) {
                return numeral(_.sumBy(items, key)).format('0,0');
            });
        }
    },
    methods: {
        itemSelect() {
            var t = this;

            setTimeout(function () {
                if (!t.returnObject) t.returnValue = _.map(t.itemselected, t.itemKey);
                else t.returnValue = t.itemselected;

                t.$emit('input', t.returnValue);
            }, 10);
        },

        itemSelectRebuild(newVal) {
            var t = this;
            if (t.returnObject) t.itemselected = newVal;
            else {
                t.itemselected = [];

                _.forEach(newVal, function (val) {
                    t.itemselected.push(_.find(t.items, [t.itemKey, val]));
                });
            }
        },
        newBtnClick() {
            if (this.newAction()) runAction(this.newAction());
            if (this.newAPI()) {
                Object.assign(this.editData, this.defaultItem());
                this.editDialog = true;
            }
        },
        editItem(item) {

            if (this.editAction()) runAction(this.editAction(), { item: item });

            if (this.editAPI()) {
                this.editedIndex = this.items.indexOf(item);
                Object.assign(this.editData, this.defaultItem());
                this.editData = Object.assign({}, item);
                this.editDialog = true;
            }
        },

        deleteItem(item, deleteAPI) {
            const items = this.items;
            var actionAPI = deleteAPI;
            var indexDelete = items.indexOf(item)
            confirm({
                title: (actionAPI.CONFIRM ? bindDataToString(actionAPI.CONFIRM, _.assignIn({ $row: item, item: item }, vueData)) : "Bạn có chắc chắn muốn xoá ?"),
                action: function () {
                    vueAction(actionAPI, { $row: item, item: item }, function () {
                        items.splice(indexDelete, 1);
                    });
                }
            });
        },

        save(actionAPI) {
            var diaCtl = this;
            if (diaCtl.editedIndex > -1) {
                if (actionAPI) {
                    if (actionAPI.CONFIRM) {
                        confirm({
                            title: bindDataToString(actionAPI.CONFIRM, _.assignIn({ $row: diaCtl.editData, item: diaCtl.editData }, vueData)),
                            action: function () {
                                vueAction(actionAPI, { $row: diaCtl.editData, item: diaCtl.editData }, function (d) {
                                    if (!d.Message) {
                                        if (_.isArray(d.data)) {
                                            if (d.data[0]) {
                                                _.forEach(d.data[0], function (value, key) {
                                                    diaCtl.editData[key] = value;
                                                });
                                            }
                                        }
                                    }
                                    _.assignIn(diaCtl.items[diaCtl.editedIndex], diaCtl.editData);
                                    diaCtl.editDialog = false;
                                });
                            },
                            cancel: function () { }
                        });
                    } else {
                        vueAction(actionAPI, { $row: diaCtl.editData, item: diaCtl.editData }, function (d) {
                            if (!d.Message) {
                                if (_.isArray(d.data)) {
                                    if (d.data[0]) {
                                        _.forEach(d.data[0], function (value, key) {
                                            diaCtl.editData[key] = value;
                                        });
                                    }
                                }
                            }
                            _.assignIn(diaCtl.items[diaCtl.editedIndex], diaCtl.editData);
                            diaCtl.editDialog = false;
                        });
                    }
                } else {
                    _.assignIn(diaCtl.items[diaCtl.editedIndex], diaCtl.editData);
                    diaCtl.editDialog = false;
                }
            }
        },

        addnew(actionAPI) {
            var diaCtl = this;
            if (diaCtl.editedIndex == -1) {
                if (actionAPI) {
                    if (actionAPI.CONFIRM) {
                        confirm({
                            title: bindDataToString(actionAPI.CONFIRM, _.assignIn({ $row: diaCtl.editData, item: diaCtl.editData }, vueData)),
                            action: function () {
                                vueAction(actionAPI, { $row: diaCtl.editData, item: diaCtl.editData }, function (d) {
                                    if (d) {
                                        if (_.isArray(d.data)) {
                                            if (d.data[0]) {
                                                _.forEach(d.data[0], function (value, key) {
                                                    diaCtl.editData[key] = value;
                                                });
                                            }
                                        }
                                    }
                                    diaCtl.items.push(_.cloneDeep(diaCtl.editData));
                                    diaCtl.editDialog = false;
                                });
                            },
                            cancel: function () { }
                        });
                    } else {
                        vueAction(actionAPI, { $row: diaCtl.editData, item: diaCtl.editData }, function (d) {
                            if (d) {
                                if (_.isArray(d.data)) {
                                    if (d.data[0]) {
                                        _.forEach(d.data[0], function (value, key) {
                                            diaCtl.editData[key] = value;
                                        });
                                    }
                                }
                            }
                            diaCtl.items.push(_.cloneDeep(diaCtl.editData));
                            diaCtl.editDialog = false;
                        });
                    }
                } else {
                    diaCtl.items.push(_.cloneDeep(diaCtl.editData));
                    diaCtl.editDialog = false;
                }
            }
        },
        updateSearch: _.debounce(function (text) {
            this.search = text;
        }, 300),
        customSearch(value, search, item) {
            return Object.values(item).some(v => v && v.toString().toLowerCase().includes(search.toLowerCase()))
        },
        toExcel() {
            jsonToExcel({ data: this.items, filename: (this.label && this.label != '' ? this.label : 'tableFP') + '.xlsx' });
            Vue.$toast.success("Đã xuất Excel", { position: 'top' });
        },
    }
});

//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================

Vue.component('f-table-view', {
    props: ['value', "items", "label", "itemKey", 'excel', 'itemsPerPage', "disabledUpdate", "allwayVisible", 'showSearch', 'disabledHover', 'hideDefaultFooter'],
    template: `
        <v-card outlined v-if="allwayVisible || (items && items.length > 0) || (value && value.length > 0)">
            <v-card-title v-if="showSearch || label" align="end" >
                <div class="title primary--text text-left" v-html="label"></div><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
                <v-btn v-if="excel" class="mr-6" small icon color="primary" @click="toExcel"><v-icon>mdi-microsoft-excel</v-icon></v-btn>
                <v-text-field v-if="showSearch" dense v-model="search" append-icon="mdi-magnify" label="" single-line hide-details></v-text-field>
            </v-card-title>

            <v-data-table class="tTable" :class="{tTableNoHover: disabledHover}" :items-per-page="itemsPerPage" :hide-default-footer="_hideDefaultFooter" v-bind="$attrs" :headers="headers" :item-key="itemKey" :items="dataItems" v-model="itemselected" v-on:item-selected="itemSelect()" v-on:toggle-select-all="itemSelect()" calculate-widths :search="search">
                <template v-for="(c, index) in headers.filter(i => !!i.el)" :key="index" :slot="'item.' + c.value" slot-scope="{item}">                
                    <component :is="c.el" v-bind="c.attr" :item="item" :itemKey="item[itemKey]" v-model="item[c.value]">{{c.innerHTML}}</component>
                </template>

                <template v-if="items && !disabledUpdate" v-slot:item.ctrl-delete="{item}">
                    <div class="text-no-wrap">
                        <v-icon @click="deleteItem(item)" color="red darken-3">mdi-delete-outline</v-icon>
                    </div>
                </template>                
            </v-data-table>
        </v-card>
        `,
    data: function () {
        var arr = [];

        if (this.items) arr = this.items;
        if (typeof this.value == 'undefined') this.$emit('input', []);

        return {
            search: '',
            dataItems: arr,
            headers: this.buildHeaderData(arr),
            itemselected: []
        }
    },
    computed: {
        _hideDefaultFooter() {
            if (this.items) {
                if (this.itemsPerPage > 0 && this.itemsPerPage < this.items.length) return false;
            }
            if (this.hideDefaultFooter) return this.hideDefaultFooter;
            return false;
        }
    },
    watch: {
        items(newVal) {
            this.headers = this.buildHeaderData(newVal);
            this.dataItems = newVal;
            if (!this.$attrs['show-select']) this.$emit('input', this.dataItems);
        }
    },
    methods: {
        itemSelect() {
            if (!this.items) return;

            var t = this;
            setTimeout(function () {
                t.$emit('input', t.itemselected);
            }, 10);
        },
        deleteItem(item) {
            this.dataItems = _.difference(this.dataItems, [item]);
            if (!this.$attrs['show-select']) this.$emit('input', this.dataItems);
        },
        buildHeaderData(item) {
            var arrHeaders = buildHeader(item);
            if (arrHeaders.length > 0 && this.items && !this.disabledUpdate) arrHeaders.push({ "text": "Xoá", "value": "ctrl-delete", "divider": true });
            return arrHeaders;
        },
        toExcel() {
            jsonToExcel({ data: this.items });
            Vue.$toast.success("Đã xuất Excel", { position: 'top' });
        },
    }
});
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================

Vue.component('t-html', {
    template: `<div class="my-3" v-bind="$attrs" v-html="$attrs['value']"></div>`,
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-label', {
    template: `<div class="text-no-wrap" v-bind="$attrs">{{$attrs['value']}}</div>`,
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-num', {
    props: {
        value: {
            type: Number,
            default: 0
        },
        hidezero: {
            type: Boolean,
            default: true
        },
        format: {
            type: String,
            default: ''
        }
    },
    template: `<div v-if="!_.isNull(value) && !(hidezero && value==0)" class="text-no-wrap text-end" v-bind="$attrs">{{ format != ''? numeral(value).format(format) : Number.isInteger(value)?numeral(value).format('0,0'): numeral(value).format('0,0.0') }}</div>`,
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-time', {
    props: {
        format: {
            type: String,
            default: 'DD/MM/YYYY'
        }
    },
    template: `<div v-if="$attrs['value']" class="text-no-wrap" v-bind="$attrs">{{ moment($attrs['value']).format(format) }}</div>`,
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-boolean', {
    props: {
        value: {
            default: null
        },
        colorTrue: {
            default: "primary"
        },
        colorFalse: {
            default: "red"
        },
        iconTrue: {
            default: "mdi-check"
        },
        iconFalse: {
            default: "mdi-close"
        },
    },
    template: `<v-icon v-bind="$attrs" :color="value?colorTrue:colorFalse">{{value?iconTrue:iconFalse}}</v-icon>`,
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-check', {
    props: {
        value: {
            default: null
        },
        falseValue: {
            default: false
        }
    },
    template: `<v-checkbox v-model="ctlValue" v-bind="$attrs" :false-value="falseValue" hide-details class="d-inline-flex ma-1 pa-1" v-on:change="onchange($event)" />`,
    data: function () {
        return {
            ctlValue: this.value
        }
    },
    watch: {
        value(newVal) {
            this.ctlValue = newVal
        }
    },
    methods: {
        onchange: function (e) {
            if (!e) this.ctlValue = false;
            tableActionEvent(this);
        }
    }
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-text', {
    props: ['value'],
    template: `<v-text-field v-model="ctlValue" v-bind="$attrs" v-on:change="onchange($event)" dense outlined hide-details/>`,
    data: function () {
        return {
            ctlValue: this.value
        }
    },
    watch: {
        value(newVal) {
            this.ctlValue = newVal
        }
    },
    methods: {
        onchange: function (e) {
            console.log(e)
            tableActionEvent(this);
        }
    }
});

//-----------------------------------------------------------------------------------------------------------
Vue.component('t-select', {
    props: ['value'],
    template: `<v-select v-model="ctlValue" v-bind="$attrs" v-on:change="onchange($event)" dense hide-details append-icon="mdi-menu-swap"/>`,
    data: function () {
        return {
            ctlValue: this.value
        }
    },
    watch: {
        value(newVal) {
            this.ctlValue = newVal
        }
    },
    methods: {
        onchange: function (e) {
            console.log(e)
            tableActionEvent(this);
        }
    }
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-combobox', {
    props: {
        value: {
            default: undefined
        },
        text: {
            default: undefined
        },
        items: {
            type: Array,
            default: []
        },
        api: {
            type: String,
            default: undefined
        },
        apiData: {
            type: Object,
            default: {}
        },

    },
    template: `<v-autocomplete refs="abc" v-model="ctlValue" v-bind="$attrs" :loading="loading" :items="dataItems" :search-input.sync="search" v-on:change="onchange($event)" hide-details dense></v-autocomplete>`,
    data: function () {
        return {
            dataItems: this.items,
            ctlValue: this.value,
            loading: false,
            search: null,
            getDataFormAPI: _.debounce((str) => {
                if ((this.search && this.search.length < 2) || !this.api) return;
                var self = this;
                this.loading = true

                if (typeof this.apiData != 'object') this.apiData = JSON.parse(this.apiData);

                mapData(this.apiData, this.apiData, _.assignIn({}, vueData, { TEXT: this.search }));

                console.log("API-CALL: ", this.api)
                ajaxCALL(this.api, this.apiData, function (d) {
                    if (_.isArray(d.data)) self.dataItems = d.data;
                    else self.dataItems = d;

                    self.loading = false
                }, function (e) {
                    console.log("API Error", e);
                })

            }, 500)
        }
    },
    watch: {
        search(newval, oldval) {
            newval && oldval && this.querySelections(newval)
        },
        items(val) {
            this.dataItems = val
        },
        value(newVal) {
            this.ctlValue = newVal
        }
    },
    methods: {
        querySelections(val) {
            this.getDataFormAPI(val);
        },
        onchange: function (e) {
            if (e) tableActionEvent(this);
        }
    },
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-menu', {
    props: {
        iconText: {
            default: 'mdi-menu'
        },
        items: {
            default: []
        }
    },
    template: `
             <v-menu offset-y origin="center center" transition="slide-y-transition" max-height = 500>
                <template v-slot:activator="{ on }">                
                    <v-icon v-on="on">{{iconText}}</v-icon>
                </template>
                <v-list >
                    <v-list-item v-bind="$attrs" v-for="(item, index) in items" :key="index" @click="onSelect(item)" >
                        <v-list-item-icon v-if="item['icon-text']" class="mr-3">
                            <v-icon :color="item.color">{{item['icon-text']}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content class="mr-2">
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu> 
        `,
    data: function () {
        return {
        }
    },
    methods: {
        onSelect: function (e) {
            this.$attrs['action'] = e['action'];
            tableActionEvent(this);
        }
    }
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-link', {
    props: ['id', 'target', 'url', 'title', 'onclose'],
    template: `<a :href="_url" :target="target" v-bind="$attrs" @click="onclick()"><v-icon v-if="$attrs['icon-text']" left color="primary">{{$attrs['icon-text']}}</v-icon> {{ $attrs['value']}}</a>`,
    computed: {
        _url: function () {
            if (this.target != 'dialog' && this.url) return this.url;
            return null;
        },
    },
    methods: {
        onclick: function (e) {
            if (this.target == 'dialog') {
                tableActionEvent(this);
                openWindow({
                    id: this.id,
                    title: this.title,
                    url: this.url,
                    onclose: this.onclose,
                });
            }
        }
    }
});
//-----------------------------------------------------------------------------------------------------------
Vue.component('t-button', {
    props: {
        text: {
            default: true
        },
        color: {
            default: "primary"
        },
        label: {
            default: null
        },
        iconText: {
            default: null
        },
        target: {
            default: null
        },
        wid: {
            default: null
        },
        url: {
            default: null
        },
        title: {
            default: null
        },
        onclose: {
            default: null
        },
        quset: {
            default: []
        },
    },
    template: `
            <v-btn class="custom-transform-class text-none" v-bind="$attrs" :text="text" :color="color" :target="target" :href="_url" @click="clickButton()">
                <v-icon v-if="iconText" :left="label" class="ml-0">{{iconText}}</v-icon>{{label}}
            </v-btn>`,
    computed: {
        _url: function () {
            if (this.target != 'dialog' && this.url) return this.url;
            return null;
        },
    },
    methods: {
        clickButton: function (e) {
            if (this.target == 'dialog') {
                console.log("dialog onclose", this.onclose)
                openWindow({
                    id: this.wid,
                    title: this.title,
                    url: this.url,
                    onclose: this.onclose
                });
            } else tableActionEvent(this);
        }
    }
});