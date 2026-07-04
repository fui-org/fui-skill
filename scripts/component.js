var defaultControlAttr = {
    "v-text-field": {
        attr: {
            ":tile": true,
            ":outlined": true,
            ":dense": true,
            ":required": true,
            ":hide-details": true,
            ":rules": "[v => (!!v || !isNaN(parseFloat(v)))]"
        }
    },
    "v-textarea": {
        attr: {
            ":outlined": true,
            ":dense": true,
            ":required": false,
            ":rules": "[v => (!!v || !isNaN(parseFloat(v)))]"
        }
    },
    "v-combobox": {
        attr: {
            ":tile": true,
            ":outlined": true,
            ":dense": true,
            ":hide-details": true,
            ":required": true,
            ":rules": "[v => (!!v || !isNaN(parseFloat(v)))]",
            ":menu-props": "{ offsetY: true }"
        }
    },
    "v-select": {
        attr: {
            ":tile": true,
            ":outlined": true,
            ":dense": true,
            ":hide-details": true,
            ":required": true,
            ":rules": "[v => (!!v || !isNaN(parseFloat(v)))]",
            ":menu-props": "{ offsetY: true }"
        }
    },
    "v-autocomplete": {
        attr: {
            ":outlined": true,
            ":dense": true,
            ":hide-details": true,
            ":required": true,
            ":rules": "[v => (!!v || !isNaN(parseFloat(v)))]",
            ":auto-select-first": true
        }
    },
    "v-checkbox": {
        attr: {
            "class": "mt-1",
            ":hide-details": true
        }
    },
    "v-switch": {
        attr: {
            ":dense": true,
            ":hide-details": true,
            "class": "my-1 mx-0"
        }
    },
    "v-card": {
        attr: {
            ":outlined": true
        }
    },
    "v-alert": {
        attr: {
            ":dense": true,
            ":hide-details": true,
        }
    },
    "v-jsoneditor": {
        import: ["/include/jsonEditor/v-jsoneditor.min.js"]
    },

    "v-btn": {
        attr: {
            "elevation": 0
        }
    },
    //----------------------------------------------   

    "f-button": {
        col: {
            align: ($isPhone ? "end" : null)
        },
        attr: {
            "elevation": 0,
            "color": "primary",
            // ":outlined": true,
            // ":text": true,
        }
    },

    "f-table": {
        attr: {
            ":excel": false,
            ":show-search": true,
            ":return-object": true,
            ":allow-hover": false,
            ":fixed-header": true,
            ":disable-sort": false,
            ":dense": true,
            ":hide-default-footer": true,
            ":items-per-page": 50,
            ":footer-props": "{'items-per-page-options':[50, 100, 150, 200, -1]}",
            "mobile-breakpoint": "0",
        },
    },
    "f-table-view": {
        attr: {
            ":excel": false,
            ":show-select": false,
            ":show-search": true,
            ":allow-hover": false,
            ":fixed-header": true,
            ":disable-sort": false,
            ":disabled-update": true,
            ":dense": true,
            ":hide-default-footer": true,
            ":items-per-page": 50,
            ":footer-props": "{'items-per-page-options':[50, 100, 150, 200, -1]}",
            "mobile-breakpoint": "0",
        },
    },
    "f-dialog": {
        attr: {
            ":outlined": true,
            ":dense": true,
        },
    },
    "f-date": {
        attr: {
            ":picker": {
                "locale": "vi"
            },
            ":hide-details": true,
            ":outlined": true,
            ":dense": true,
        }
    },

    "f-time": {
        attr: {
            ":hide-details": true,
            ":outlined": true,
            ":dense": true,
        }
    },
    "f-radiobox": {
        attr: {
            "class": "mt-1",
            ":hide-details": true,
            ":required": true,
            ":rules": "[v => (!!v || !isNaN(parseFloat(v)))]"
        }
    },

    "f-menu": {
        col: {
            align: ($isPhone ? "end" : null)
        },
        attr: {
            "elevation": "1",
            ":depressed": true,
            "color": "primary"
        }
    },
    "f-pdfmake": {
        attr: {
            "width": "100%",
            "height": "500px"
        },
        import: ['/include/pdfmake/pdfmake.min.js', '/include/pdfmake/print.min.js', '/include/pdfmake/vfs_fonts.js']
    },
    "f-account-manager": {
        import: ["/include/client.min.js", "/component_login.js"]
    },
    "f-chart": {
        import: ["/include/chart/chart.min.js"]
    },
    "f-json-tree": {
        import: ["/include/jsontree/jsontreeview.css", "/include/jsontree/jsontreeview.js"]
    },
    "f-code-editor": {
        import: [
            "/include/monaco-editor/min/vs/loader.js",
        ]
    },
    "f-box": {
        attr: {
            ":outlined": true,
        }
    },
    "f-label": {
        attr: {
            ":outlined": true
        }
    },
    "f-header": {
        attr: {
        }
    },
    "f-title": {
        attr: {
        }
    },
    "f-file-upload": {
        attr: {
            "elevation": 1,
            ":depressed": true,
            "color": "primary"
        },
        import: [
            "/include/plupload-2.3.7/plupload.full.min.js",
        ],
    },
    "f-image-update": {
        attr: {
            "elevation": 1,
            "color": "primary",
            ":text": true,
        },
        import: [
            "/include/vue-advanced-cropper/index.umd.js",
            "/include/vue-advanced-cropper/style.css",
        ],
    },
    "f-qrcode": {
        attr: {
        },
        import: [
            "/include/qrcode/qrcode.min.js",
        ],
    },
    "f-qrcode-reader": {
        attr: {
        },
        import: [
            "/include/qrcode/qrcode-reader.min.js",
        ],
    },
    "f-search": {
        attr: {
            ":cache-items": true,
            ":outlined": true,
            ":dense": true,
            ":hide-no-data": true,
            ":hide-details": true,
            ":auto-select-first": true
        }
    },
    "f-q-and-a": {
        import: [
            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
            "/include/QandA/q-and-a-ckedit.css",
            "/include/vue-context-menu.js",
            "/include/ckeditor5/build/ckeditor.js",
            "/include/plupload-2.3.7/plupload.full.min.js",
            "/include/audio/vueaudio.js",
            "/include/QandA/QandA.js",
        ],
    },
    "f-etest-review": {
        import: [
            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
            "/include/QandA/q-and-a-ckedit.css",
            "/include/vue-context-menu.js",
            "/include/audio/vueaudio.js",
            "/include/QandA/QandA.js",
        ],
    },
    "f-audio": {
        import: [
            "/include/audio/vueaudio.js",
        ],
    },
    "f-audio-recorder": {
        import: [
            "/include/audio/vueaudio.js",
        ],
    },
    "f-editor": {
        import: [
            "/include/ckeditor5/build/ckeditor.js"
        ],
    },
    "f-editor-dialog": {
        import: [
            "/include/ckeditor5/build/ckeditor.js"
        ],
    },
    "f-excel-reader": {
        col: {
            align: ($isPhone ? "end" : null),
        },
        attr: {
            "elevation": "1",
            ":depressed": true,
            "color": "primary",
        },
    },
    "f-google-login": {
        import: [
            "/component_login.js",
            "https://apis.google.com/js/platform.js"
        ],
    }
};

//===========================================================================================
Vue.component('f-label', {
    props: ['items', "text", "color", 'iconText'],
    template: `
        <div>
            <v-chip v-bind="$attrs" class="mr-2" v-if="text">
                <v-icon v-if="iconText" left>{{iconText}}</v-icon>{{text}}
            </v-chip>
            <v-chip v-bind="$attrs" v-for="(chip, k) in (_.isString(items)?JSON.parse(items):items)" :key="k" :color="(color ? color : chip.color)" class="mr-2" >
                <v-icon v-if="chip['icon-text']" left>{{chip['icon-text']}}</v-icon>{{chip.text}}
            </v-chip>
        </div>
        `
});

//===========================================================================================
Vue.component('f-box', {
    props: ['rowFormat', 'items', 'label', 'edit', 'saveclick'],
    template: `
        <v-card v-bind="$attrs">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title v-if="label" class="headline mb-2">{{label}}</v-list-item-title><br>
                    <table style="flex: initial; width:100%;" v-for="R in itemsObj">
                        <tr v-for="c in rowFormatArray">
                            <td class="py-1 text-no-wrap text-left">{{c.text}}</td>
                            <td class="py-1 px-2 text-center"><span v-if="!(edit && !c.noEdit)" >:</span></td>
                            <td v-if="!(edit && !c.noEdit)" class="py-1 text-left" style="width: 100%"><b>{{R[c.value]}}</b></td>
                            <td v-if="edit && !c.noEdit" class="py-1 text-left" style="width: 100%">
                                <v-text-field dense outlined hide-details v-model="R[c.value]"></v-text-field>
                            </td>
                        </tr>
                    </table>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        `,
    data: function () {
        return {
            rowFormatArray: [],
            itemsObj: [],
            itemsIsArray: _.isArray(this.items)
        }
    },
    mounted: function () {
        this.buildDataItems();
    },
    watch: {
        items: function (newVal, oldVal) {
            this.buildDataItems();
        },
        rowFormat: function (newVal, oldVal) {
            this.buildDataItems();
        },
        itemsObj: function (newVal, oldVal) {
            if (this.itemsIsArray) this.$emit('input', this.itemsObj);
            else if (this.itemsObj.length > 0) this.$emit('input', this.itemsObj[0]);
            else this.$emit('input', null);
        }
    },
    methods: {
        buildDataItems: function () {
            if (this.items) {
                if (!_.isArray(this.items)) this.itemsObj = _.castArray(this.items);
                else this.itemsObj = this.items;
            }

            if (this.rowFormat) this.rowFormatArray = this.rowFormat;
            else this.rowFormatArray = buildHeader(this.itemsObj);
        }
    }
});
//===========================================================================================

Vue.component('f-header', {
    props: ['label'],
    template: `
            <div class="display-1 text-center primary--text text--darken-2" v-html="label"></div>
        `
});

//===========================================================================================

Vue.component('f-title', {
    props: ['label'],
    template: `
            <div class="title primary--text text--darken-1" v-html="label"></div>
        `
});

//===========================================================================================

Vue.component('f-radiobox', {
    props: {
        label: {
            type: String,
            default: undefined
        },
        items: {
            type: Array,
            default: []
        },
        itemValue: {
            type: String,
            default: 'value'
        },
        itemText: {
            type: String,
            default: 'text'
        }
    },
    template: `
            <v-radio-group v-bind="$attrs" v-on:change="$emit('input', $event)"> 
                <template v-slot:label>
                    <div class="text-body-1">{{label}}</div>
                </template>               
                <v-radio v-for="n in items" :key="n[itemValue]" :label="n[itemText]" :value="n[itemValue]"></v-radio>
            </v-radio-group>
        `,
});
//===========================================================================================

Vue.component('f-menu', {
    props: ['items', 'label', 'iconText', 'menuAttr'],
    template: `
        <v-menu offset-y v-bind="$attrs">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" :icon="label=='' || label==undefined" color="primary" :outlined="label" :text="label"><v-icon v-if="iconText" :left="label">{{iconText}}</v-icon>{{label}}</v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in dataList" v-if="item.visible" :key="index" v-on:click="buttonclick(item)" :href="item.href" :target="item.target">
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
            dataList: this.dataFix(this.items)
        }
    },
    watch: {
        items: function (newVal) {
            this.dataList = this.dataFix(newVal)
        }
    },
    methods: {
        buttonclick: function (e) {
            if (e.action) runAction(e.action);
        },
        dataFix: function (d) {
            _.forEach(d, function (o) {
                if (_.isUndefined(o.visible)) {
                    o.visible = true;
                }
                mapData(o, o, vueData);
            });
            return d;
        }

    }
});

//===========================================================================================
Vue.component('f-search', {
    props: {
        api: {
            type: String,
            default: undefined
        },
        apiData: {
            type: Object,
            default: {}
        },
        items: {
            type: Array,
            default: []
        },
    },
    template: `
            <v-autocomplete v-bind="$attrs" :loading="loading" :items="dataItems" :search-input.sync="search" @change="onChange"></v-autocomplete>
    `,
    data: function () {
        return {
            loading: false,
            dataItems: this.items,
            search: null,
            getDataFormAPI: _.debounce((str) => {
                if (this.search && this.search.length < 2) return;
                var self = this;
                this.loading = true

                if (typeof this.apiData != 'object') this.apiData = JSON.parse(this.apiData);

                mapData(this.apiData, this.apiData, _.assignIn({}, vueData, { TEXT: this.search }));

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
        search(val) {
            val && val !== this.select && this.querySelections(val)
        },
        items(val) {
            this.dataItems = val
        },
    },
    methods: {
        querySelections(val) {
            this.getDataFormAPI(val);
        },
        onChange(e) {
            this.$emit('input', e);
            this.search = "";
        },
    },
});
//===========================================================================================

Vue.component('f-button', {
    props: {
        label: {
            type: String,
            default: 'OK'
        },
        checkvalid: {
            type: Boolean,
            default: true
        },
        ctrlhotkey: {
            type: Number,
            default: 0
        },
        iconText: {
            default: undefined
        },
        action: {
            default: undefined
        },
        includeData: {
            default: undefined
        }
    },
    template: `
            <v-btn v-on:click="buttonclick" :icon="(iconText && !label?true:false)" v-bind="$attrs" :style="{'min-width': (label?'100px':'auto')}">
                <v-icon v-if="iconText" :left="(label?true:false)">{{iconText}}</v-icon>{{label}}
            </v-btn>
        `,
    mounted: function () {
        if (this.ctrlhotkey > 0) {
            document.addEventListener("keydown", this.keydownHotKey, false);
        }
    },
    destroyed() {
        document.removeEventListener("keydown", this.keydownHotKey, false);
    },
    methods: {
        buttonclick: _.debounce(function (e) {
            var attr = this.$attrs;
            if (attr.target == 'dialog') {
                console.log("dialog onclose", attr.onclose)
                openWindow({
                    id: attr.wid,
                    title: attr.title,
                    url: attr.url,
                    onclose: attr.onclose
                });
                return
            }

            if (this.checkvalid && !vm.formvalidate()) {
                if (attr.type != 'submit') showMessage({ icon: 'mdi mdi-alert-outline', type: "red", title: "Hãy điền đầy đủ dữ liệu bắt buộc !" })
                return;
            }

            if (this.action) runAction(this.action, this.includeData);
            else console.log("action:", this.action);

        }, 500, { leading: true, trailing: false }),
        keydownHotKey: (e) => {
            if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode == this.ctrlhotkey) {
                e.preventDefault();
                this.buttonclick();
                console.log("Button hotkey :", this.label);
            }
        }
    }
});
//===========================================================================================

Vue.component('f-slider', {
    props: ['items', 'itemAttr'],
    template: `
    <v-carousel v-bind="$attrs">
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" v-bind="itemAttr"></v-carousel-item>
    </v-carousel>
    `,
});

//===========================================================================================

Vue.component('f-file-upload', {
    props: {
        label: {
            type: String,
            default: 'file upload'
        },
        url: {
            type: String,
            default: ''
        },
        autoclose: {
            type: Boolean,
            default: true
        },
        iconText: {
            type: String,
            default: "mdi-cloud-upload-outline"
        },
        filters: {
            type: Object,
            default: {
                max_file_size: '5mb',
                mime_types: [{ title: "All files", extensions: "*" }]
            }
        },
        resize: {
            type: Object,
            default: {
                width: 1900,
                height: 1600,
                quality: 80
            }
        },
        onclose: {
            default: undefined
        },

    },
    template: `
            <v-btn :id="elID" v-bind="$attrs">
                <v-icon v-if="iconText" :left="label != ''">{{iconText}}</v-icon>{{label}}
                <v-dialog v-model="dialog" persistent width="450">
                    <v-card>
                        <v-card-actions>
                            Upload file
                            <v-spacer></v-spacer>
                            <v-btn :loading="loading" icon @click="dialog = false; UploadingError = []; UploadingFile = [];" ><v-icon>mdi-close</v-icon></v-btn>
                        </v-card-actions>
                        <v-sheet v-if="UploadingError.length>0" color="error" dark class="py-2">
                            <v-card-text class="py-1 px-4" v-for="(t, i) in UploadingError" :key="i">
                                <div><b>{{t.file.name}}</b></div>
                                <div>{{t.message}}</div>
                            </v-card-text>
                        </v-sheet>
                        <v-sheet v-if="UploadingFile.length>0" class="pb-2">
                            <v-card-text class="py-1 px-4" v-for="(t, i) in UploadingFile" :key="i">
                                <v-card-subtitle class="pa-0" >{{t.percent}}% - {{t.name}}</v-card-subtitle>
                                <v-progress-linear :value="t.percent" class="mb-2 mt-1"></v-progress-linear>                            
                            </v-card-text>
                        </v-sheet>
                    </v-card>
                </v-dialog>                
            </v-btn>
        `,
    data: function () {
        return {
            dialog: false,
            loading: true,
            UploadingFile: [],
            UploadingError: [],
            elID: generateID(),
            uploader: null,
            filesUploaded: []
        }
    },
    mounted: function () {
        this.uploaderInit();
    },
    methods: {
        uploaderInit: function () {
            var thisObj = this;

            var uploader = new plupload.Uploader({
                runtimes: 'html5,html4',
                browse_button: thisObj.elID,
                headers: {
                    authorization: 'Bearer ' + getCookie('awt'),
                    uploaddata: Date.now()
                },
                resize: thisObj.resize,
                filters: thisObj.filters,
                init: {
                    PostInit: function () { },
                    OptionChanged: function (up, name, value, oldValue) { },
                    BeforeUpload: function (up, file) {
                        uploader.settings.url = thisObj.url;
                    },
                    FilesAdded: function (up, files) {
                        thisObj.dialog = true;
                        thisObj.UploadingFile = files;
                        thisObj.filesUploaded = [];
                        uploader.start();
                    },
                    FileUploaded: function (up, file, result) {
                        result = JSON.parse(result.response);
                        json_data_parse(result, 0);
                        thisObj.filesUploaded = result;
                    },
                    UploadComplete: function (up, files) {
                        if (thisObj.filesUploaded) thisObj.$emit('input', thisObj.filesUploaded);
                        else thisObj.$emit('input', files);

                        if (thisObj.UploadingError.length == 0 && thisObj.autoclose) thisObj.dialog = false;
                        thisObj.loading = false;
                    },
                    UploadProgress: function (up, file) { },
                    Error: function (up, err) {
                        thisObj.loading = false;
                        if (err.status == 500) {
                            err.message = JSON.parse(err.response).message;
                        }
                        console.log(err);
                        thisObj.dialog = true;
                        thisObj.UploadingError.push(err);
                    }
                }
            });
            uploader.init();
            thisObj.uploader = uploader;
        }
    },
    watch: {
        dialog: function (newVal, oldVal) {
            if (!newVal && this.onclose) {
                runAction(this.onclose);
            }
        },
        filters: {
            deep: true,
            handler(newVal) {
                this.uploader.setOption("filters", newVal)
                var ext = newVal.mime_types[0].extensions.replace(/([ ]*)/gm, "")
                ext = "." + ext.replace(/,+/gm, ",.")
                $('#' + this.elID).parent().find('.moxie-shim > input[type="file"]').attr("accept", ext);
            }
        }
    }
});
//===========================================================================================

Vue.component('f-qrcode', {
    template: `<div v-bind="$attrs"><img :src="img"></img></div>`,
    props: {
        value: {
            type: String,
            default: null
        },
        logo: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: "#000"
        },
        size: {
            type: Number,
            default: 300
        }
    },
    data: () => {
        return {
            options: null,
            qrCode: null,
            img: [],
        }
    },
    watch: {
        value: function (newVal) {
            this.options.data = newVal;
            this.qrCode.update(this.options);
            this.qrBuild();
        }
    },
    mounted() {
        this.options = {
            width: this.size,
            height: this.size,
            type: 'png',
            data: this.value,
            image: this.logo,
            dotsOptions: {
                color: this.color,
                type: "square"
            },
            cornersSquareOptions: {
                type: "square",
                color: this.color
            },
            cornersDotOptions: {
                type: "square",
                color: this.color
            },
            backgroundOptions: {
                color: "#fff",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 2
            }
        };

        this.qrCode = new QRCodeStyling(this.options)
        this.qrBuild();
    },
    methods: {
        async qrBuild() {
            const _img = await this.qrCode.getRawData('png')
            var objectURL = URL.createObjectURL(_img);
            this.img = objectURL
        }
    }
});

//=========================================================================================================
Vue.component('f-qrcode-reader', {
    props: {
        value: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: "Đọc QRCode"
        },
        width: {
            type: Number,
            default: ($(window).width() < 400 ? $(window).width() - 50 : 350)
        }
    },
    template: `
        <v-dialog v-model="value" :width="width" persistent dark overlay-opacity="0.8">
            <v-card>
                <v-card-title v-if="noSupportCamera" class="red--text justify-center">Thiết bị không hỗ trợ camera</v-card-title>
                <qrcode-stream v-if="!noSupportCamera" :camera="camera" @decode="onDecode" @init="onInit" class="black" :style="{width: width + 'px', height: width + 'px'}"></qrcode-stream>
                <v-card-actions dense>        
                    <h4 class="">{{label}}</h4>
                    <v-spacer></v-spacer>        
                    <v-btn icon @click="$emit('input', false)"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
`,
    data: function () {
        return {
            camera: 'auto',
            noSupportCamera: false,
        }
    },
    methods: {
        async onInit(promise) {
            try {
                await promise
            } catch (e) {
                const cameraMissingError = this.camera === 'OverconstrainedError'
                if (cameraMissingError) {
                    this.noSupportCamera = true
                }
            } finally {
                this.showScanConfirmation = this.camera === "off"
            }
        },
        async onDecode(content) {
            this.$emit("input", false)

            this.$emit("update", content)

            this.pause()
            await this.timeout(500)
            this.unpause()
        },
        unpause() {
            this.camera = 'auto'
        },
        pause() {
            this.camera = 'off'
        },
        timeout(ms) {
            return new Promise(resolve => {
                window.setTimeout(resolve, ms)
            })
        }
    },
});

//=========================================================================================================
Vue.component('f-image-update', {
    props: {
        value: {
            default: null
        },
        label: {
            type: String,
            default: 'image upload'
        },
        title: {
            type: String,
            default: 'Cập nhật hình'
        },
        apiUpload: {
            type: String,
            default: ''
        },
        iconText: {
            type: String,
            default: "mdi-camera"
        },
        imageType: {
            type: String,
            default: null
        },
        size: {
            type: Object,
            default: true
        },
        quality: {
            default: 0.9
        },
        dialogWidth: {
            type: Number,
            default: 500
        },
        dialogHeight: {
            type: Number,
            default: 350
        },
        imageBoxAttr: {
            type: Object,
            default: {
                "class": "d-flex flex-column align-center",
                "style": "position: relative; line-height: 0; width: 100%; height: 300px; outline: 1px solid #c0c0c0; overflow: hidden;"
            },
        },
        imageAttr: {
            type: Object,
            default: {
                "style": "max-width: 100%; max-height: 100%;"
            },
        },
        buttonAttr: {
            type: Object,
            default: {
                "depressed": "",
                "tile": "",
                "style": "position: absolute; outline: 1px solid #c0c0c0; bottom: 0px; right: 0px; margin: 0 auto; left: 0; border-radius: 0;"
            },
        },
        croperAttr: {
            type: Object,
            default: {
                "stencil-props": { aspectRatio: 1 / 1 },// thiet lam cung ti le khung co dinh
                "default-size": {// thiet lam khung cat ban dau la bang tam hinh
                    "width": 3333,
                    "height": 3333
                },
                "transitions": true,
                "image-restriction": "fit-area"
            },
        },
    },
    template: `
        <v-dialog v-model="dialog" persistent :width="dialogWidth" :key="cropperRerender">
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="imageBoxAttr">                    
                    <div v-bind="imageAttr" :style="{'background-image': 'url(' + value + ')', 'background-size': 'contain', 'background-position': 'center center', 'width':'100%', 'height':'calc(100% - 37px)'}"></div>
                    <v-btn v-on="on" v-bind="buttonAttr"><v-icon v-if="iconText" :left="label != ''">{{iconText}}</v-icon>{{label}}</v-btn>
                </div>
            </template>
            <v-card style="overflow-x: hidden;">
                <v-toolbar dense elevation="0">
                    <v-toolbar-title>{{title}}</v-toolbar-title><v-spacer></v-spacer><v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>

                <v-card-text class="px-1 py-0">
                    <cropper ref="cropper" :src="image.src" :canvas="size" v-bind="croperAttr" :style="{'width': dialogWidth + 'px', 'height': dialogHeight + 'px'}"/>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-around align-center">
                    <v-btn icon @click="reset"><v-icon>mdi-delete</v-icon></v-btn>
                    <v-btn icon @click="flip(true, false)"><v-icon>mdi-flip-horizontal</v-icon></v-btn>
                    <v-btn icon @click="flip(false, true)"><v-icon>mdi-flip-vertical</v-icon></v-btn>
                    <v-btn icon @click="rotate(90)"><v-icon>mdi-rotate-right</v-icon></v-btn>
                    <v-btn icon @click="rotate(-90)"><v-icon>mdi-rotate-left</v-icon></v-btn>
                    <v-btn icon @click="onClickFileUpload"><v-icon>mdi-camera</v-icon></v-btn><input type="file" ref="fileUpload" @change="readFile" style="display: none;" accept="image/*" />
                    <v-divider vertical />
                    <v-btn @click="onSaved" color="primary" depressed><v-icon>mdi-cloud-upload-outline</v-icon></v-btn>
              </v-card-actions>
            </v-card>
            <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
        </v-dialog>
        `,
    data: function () {
        return {
            dialog: false,
            overlay: false,
            cropperRerender: 0,
            image: {
                src: null,
                type: null
            }
        }
    },
    watch: {
        value: function (newVal, oldVal) {
            this.image.src = newVal;
        },
        dialog: function (newVal, oldVal) {
            if (newVal) {
                if ($isPhone && this.dialogWidth < 300) this.dialogWidth = 300;
                else if (this.dialogWidth < 450) this.dialogWidth = 450;
                this.image.src = this.value;

                if (this.imageType) {
                    this.image.type = this.imageType;
                }
                else {
                    (async () => {
                        const reponse = await fetch(this.image.src, {
                            method: 'HEAD'
                        });
                        this.image.type = reponse.headers.get('Content-Type');
                    })();
                }

                this.cropperRerender = Math.floor(Math.random() * 1000);
            }
        }
    },
    methods: {
        flip(x, y) {
            if (this.$refs.cropper.imageTransforms.rotate % 180 !== 0) {
                this.$refs.cropper.flip(!x, !y);
            } else {
                this.$refs.cropper.flip(x, y);
            }
        },
        rotate(angle) {
            this.$refs.cropper.rotate(angle);
        },
        onClickFileUpload() {
            this.$refs.fileUpload.click();
        },
        readFile(event) {
            //--------------------------
            const { files } = event.target;
            if (files && files[0]) {
                if (this.image.src) {
                    URL.revokeObjectURL(this.image.src)
                }
                const blob = URL.createObjectURL(files[0]);

                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image = {
                        src: blob,
                        type: this.getMimeType(e.target.result, files[0].type),
                    };
                };
                reader.readAsArrayBuffer(files[0]);
            } else {
                console.log("Sorry - you're device doesn't support the FileReader API");
            }
        },
        onSaved(e) {
            var self = this;
            const { canvas } = this.$refs.cropper.getResult();
            if (canvas) {
                this.value = canvas.toDataURL("image/jpeg");
                if (self.apiUpload) {
                    self.overlay = true;
                    canvas.toBlob(blobImage => {
                        var fd = new FormData();
                        fd.append('fname', 'image.jpg');
                        fd.append('data', blobImage);

                        $.ajax({
                            type: 'POST',
                            headers: {
                                authorization: $awt
                            },
                            url: self.apiUpload,
                            data: fd,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                self.$emit('update', { returnData: data, imageData: canvas.toDataURL("image/jpeg") });
                                self.overlay = false;
                                self.dialog = false;
                            },
                            error: function (xhr) {
                                self.overlay = false;
                                console.log("Upload error: ", xhr.responseJSON.Message)
                            }
                        });
                    }, (this.imageType ? this.imageType : this.image.type), this.quality * 1.0);
                } else {
                    self.dialog = false;
                }
            } else {
                console.log("Canvas error: ", canvas)
            }
        },
        reset() {
            this.image = {
                src: null,
                type: null
            }
        },
        getMimeType(file, fallback = null) {
            const byteArray = (new Uint8Array(file)).subarray(0, 4);
            let header = '';
            for (let i = 0; i < byteArray.length; i++) {
                header += byteArray[i].toString(16);
            }
            switch (header) {
                case "89504e47":
                    return "image/png";
                case "47494638":
                    return "image/gif";
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                    return "image/jpeg";
                default:
                    return fallback;
            }
        }
    }
});

//===========================================================================================
Vue.component("f-date", {
    template: `<v-menu v-model="showDatePicker" :close-on-content-click="false" offset-y max-width="290px" min-width="290px">
		<template v-slot:activator="{ on, attrs }">
			<v-text-field ref="dateInput" v-model="displayValue" :label="label" v-bind="$attrs" :required="required" :rules="dateRules" @keydown="handleKeydown"
                @keypress="restrictToNumbers" @paste="handlePaste" @click="handleClick" @focus="handleFocus" maxlength="10" append-icon="mdi-calendar-text" @click:append="on.click"></v-text-field>
		</template>
		<v-date-picker v-model="pickerDate" no-title scrollable @input="handleDatePickerInput"></v-date-picker>
	</v-menu>`,
    props: {
        value: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        dateAdd: {
            type: Number,
            default: null,
        },
        required: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            internalValue: ['', '', ''], // [day, month, year]
            displayValue: 'dd/mm/yyyy',
            cursorPosition: 0,
            selectedField: null,
            isEditingField: false,
            showDatePicker: false,
            pickerDate: null,
            dateRules: [
                (v) => !v || this.isValidDate(v) || 'Ngày không hợp lệ (dd/mm/yyyy)',
            ],
        };
    },
    computed: {
        formattedDate() {
            const [day, month, year] = this.internalValue;
            return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year.padStart(4, '0')}`;
        },
    },
    methods: {
        restrictToNumbers(event) {
            // Chỉ cho phép nhập số (0-9)
            const charCode = event.which ? event.which : event.keyCode;
            if (charCode < 48 || charCode > 57) {
                event.preventDefault();
            }
        },
        handlePaste(event) {
            // Chặn dán nếu dữ liệu chứa ký tự không phải số
            const pastedData = event.clipboardData.getData('text');
            if (!/^[0-9/]*$/.test(pastedData)) {
                event.preventDefault();
            }
        },
        handleKeydown(event) {
            const input = this.$refs.dateInput.$el.querySelector('input');
            this.cursorPosition = input.selectionStart;
            const key = event.key;
            const fields = { day: 0, month: 1, year: 2 };
            const maxLengths = { day: 2, month: 2, year: 4 };
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
            const isDigit = /^[0-9]$/.test(key);
            const isAllowedSystemKey = /^F([1-9]|1[0-2])$/.test(key) || key === 'Tab';
            if (isDigit) {
                event.preventDefault();
                const fieldIndex = fields[this.selectedField];
                let fieldValue = this.internalValue[fieldIndex];
                if (!this.isEditingField) {
                    fieldValue = '';
                    this.isEditingField = true;
                }
                if (fieldValue == '0') fieldValue = key;
                else fieldValue += key;
                fieldValue = fieldValue.slice(-maxLengths[this.selectedField]);
                Vue.set(this.internalValue, fieldIndex, fieldValue);
                if (fieldValue.length === maxLengths[this.selectedField]) {
                    if (this.selectedField === 'day') this.selectedField = 'month';
                    else if (this.selectedField === 'month') this.selectedField = 'year';
                    this.isEditingField = false;
                }
                this.updateDisplayValue();
                this.$nextTick(() => this.selectField());
                return;
            }
            if (key === 'Backspace' || key === 'Delete') {
                event.preventDefault();
                const fieldIndex = fields[this.selectedField];
                Vue.set(this.internalValue, fieldIndex, '');
                this.isEditingField = false;
                this.updateDisplayValue();
                this.$nextTick(() => this.selectField());
                return;
            }
            if (key === 'ArrowLeft') {
                event.preventDefault();
                if (this.selectedField === 'year') this.selectedField = 'month';
                else if (this.selectedField === 'month') this.selectedField = 'day';
                this.isEditingField = false;
                this.$nextTick(() => this.selectField());
                return;
            }
            if (key === 'ArrowRight') {
                event.preventDefault();
                if (this.selectedField === 'day') this.selectedField = 'month';
                else if (this.selectedField === 'month') this.selectedField = 'year';
                this.isEditingField = false;
                this.$nextTick(() => this.selectField());
                return;
            }
            if (!isDigit && !allowedKeys.includes(key) && !isAllowedSystemKey) {
                event.preventDefault();
            }
        },
        handleClick(event) {
            const input = this.$refs.dateInput.$el.querySelector('input');
            this.cursorPosition = input.selectionStart;
            if (this.cursorPosition <= 2) {
                this.selectedField = 'day';
            } else if (this.cursorPosition <= 5) {
                this.selectedField = 'month';
            } else {
                this.selectedField = 'year';
            }
            this.isEditingField = false;
            this.$nextTick(() => {
                this.selectField();
            });
        },
        handleFocus() {
            if (!this.selectedField) {
                this.selectedField = 'day';
            }
            this.isEditingField = false;
            this.$nextTick(() => {
                this.selectField();
            });
        },
        selectField() {
            const input = this.$refs.dateInput.$el.querySelector('input');
            if (this.selectedField === 'day') {
                input.setSelectionRange(0, 2);
                this.cursorPosition = 2;
            } else if (this.selectedField === 'month') {
                input.setSelectionRange(3, 5);
                this.cursorPosition = 5;
            } else if (this.selectedField === 'year') {
                input.setSelectionRange(6, 10);
                this.cursorPosition = 10;
            }
        },
        updateDisplayValue() {
            const [day, month, year] = this.internalValue;
            this.displayValue = `${day.padStart(2, (day ? '0' : '_')) || 'dd'}/${month.padStart(2, (month ? '0' : '_')) || 'mm'}/${year.padStart(4, (year ? '0' : '_')) || 'yyyy'}`;
            if (this.isValidDate(this.formattedDate)) {
                this.pickerDate = `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                this.$emit('input', this.pickerDate);
            } else
                this.$emit('input', null);
        },
        isValidDate(value) {
            // Cho phép giá trị rỗng hoặc placeholder
            if (!this.required && (!value || value === '__/__/____' || value === 'dd/mm/yyyy' || value === 'yyyy/mm/dd' || value === 'dd-mm-yyyy' || value === 'yyyy-mm-dd')) return true;
            // Regex cho các định dạng
            const ddmmyyyySlashRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // dd/mm/yyyy
            const yyyymmddSlashRegex = /^(\d{4})\/(\d{2})\/(\d{2})$/; // yyyy/mm/dd
            const ddmmyyyyDashRegex = /^(\d{2})-(\d{2})-(\d{4})$/;   // dd-mm-yyyy
            const yyyymmddDashRegex = /^(\d{4})-(\d{2})-(\d{2})$/;   // yyyy-mm-dd
            let day, month, year;
            // Kiểm tra định dạng dd/mm/yyyy
            if (ddmmyyyySlashRegex.test(value)) {
                [day, month, year] = value.split('/').map(Number);
            }
            // Kiểm tra định dạng yyyy/mm/dd
            else if (yyyymmddSlashRegex.test(value)) {
                [year, month, day] = value.split('/').map(Number);
            }
            // Kiểm tra định dạng dd-mm-yyyy
            else if (ddmmyyyyDashRegex.test(value)) {
                [day, month, year] = value.split('-').map(Number);
            }
            // Kiểm tra định dạng yyyy-mm-dd
            else if (yyyymmddDashRegex.test(value)) {
                [year, month, day] = value.split('-').map(Number);
            }
            // Nếu không khớp định dạng nào
            else {
                return false;
            }
            // Tạo đối tượng Date và kiểm tra tính hợp lệ
            const date = new Date(year, month - 1, day);
            return (
                date.getDate() === day &&
                date.getMonth() + 1 === month &&
                date.getFullYear() === year
            );
        },
        handleDatePickerInput(date) {
            if (date) {
                const [year, month, day] = date.split('-');
                this.internalValue = [day, month, year];
                this.updateDisplayValue();
                this.showDatePicker = false;
            }
        },
        initializeDate() {
            // Regex cho các định dạng
            const yyyymmddSlashRegex = /^(\d{4})\/(\d{2})\/(\d{2})$/; // yyyy/mm/dd
            const yyyymmddDashRegex = /^(\d{4})-(\d{2})-(\d{2})$/;   // yyyy-mm-dd
            // Nếu có chuỗi dạng ISO có chứa 'T' (ví dụ: "2024-12-28T12:30:00")
            if (this.value && typeof this.value === 'string' && this.value.includes('T')) {
                this.value = this.value.split('T')[0]; // Cắt phần thời gian, giữ lại yyyy-mm-dd
            }

            // Nếu có giá trị từ prop value
            if (this.value && this.isValidDate(this.value)) {
                let day, month, year;
                // Kiểm tra định dạng yyyy/mm/dd
                if (yyyymmddSlashRegex.test(this.value)) {
                    [year, month, day] = this.value.split('/').map(Number);
                }
                // Kiểm tra định dạng yyyy-mm-dd
                else if (yyyymmddDashRegex.test(this.value)) {
                    [year, month, day] = this.value.split('-').map(Number);
                }
                // Chuyển đổi sang chuỗi với định dạng 2 chữ số
                day = String(day).padStart(2, '0');
                month = String(month).padStart(2, '0');
                year = String(year);
                this.internalValue = [day, month, year];
                this.pickerDate = `${year}-${month}-${day}`;
                this.updateDisplayValue();
            }
            // Nếu không có value và dateAdd khác null
            else if (this.dateAdd !== null) {
                const date = new Date();
                date.setDate(date.getDate() + parseInt(this.dateAdd));
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = String(date.getFullYear());
                this.internalValue = [day, month, year];
                this.pickerDate = `${year}-${month}-${day}`;
                this.updateDisplayValue();
            }
        }
    },
    watch: {
        value(newVal) {
            if (newVal && this.isValidDate(newVal)) {
                if (newVal != this.pickerDate) {
                    this.initializeDate();
                }
            } else {
                if (this.isValidDate(this.formattedDate)) {
                    this.internalValue = ['', '', ''];
                    this.displayValue = 'dd/mm/yyyy';
                    this.pickerDate = null;
                }
            }
        }
    },
    created() {
        this.initializeDate();
    }
});

//===========================================================================================
Vue.component("f-time", {
    template: `<v-menu v-model="showTimePicker" :close-on-content-click="false" offset-y max-width="290px" min-width="290px">
        <template v-slot:activator="{ on, attrs }">
            <v-text-field ref="timeInput" v-model="displayValue" :label="label" :rules="timeRules" v-bind="$attrs" :required="required" @keydown="handleKeydown" @keypress="restrictToNumbers"
                @paste="handlePaste" @click="handleClick" @focus="handleFocus" maxlength="5" append-icon="mdi-clock-outline" @click:append="on.click"></v-text-field>
        </template>
        <v-time-picker v-if="showTimePicker" v-model="pickerTime" format="24hr" scrollable @click:minute="showTimePicker = false" @input="handleTimePickerInput"></v-time-picker>
    </v-menu>`,
    props: {
        value: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        timeAdd: {
            type: Number,
            default: null,
        },
        required: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            internalValue: ['', ''], // [hour, minute]
            displayValue: 'HH:MM',
            cursorPosition: 0,
            selectedField: null,
            isEditingField: false,
            showTimePicker: false,
            pickerTime: null,
            timeRules: [
                (v) => !v || this.isValidTime(v) || 'Thời gian không hợp lệ (HH:MM)',
            ],
        };
    },
    computed: {
        formattedTime() {
            const [hour, minute] = this.internalValue;
            return `${hour.padStart(2, hour ? "0" : "x")}:${minute.padStart(2, minute ? "0" : "X")}`;
        },
    },
    methods: {
        restrictToNumbers(event) {
            const charCode = event.which ? event.which : event.keyCode;
            if (charCode < 48 || charCode > 57) {
                event.preventDefault();
            }
        },
        handlePaste(event) {
            const pastedData = event.clipboardData.getData('text');
            if (!/^[0-9:]*$/.test(pastedData)) {
                event.preventDefault();
            }
        },
        handleKeydown(event) {
            const input = this.$refs.timeInput.$el.querySelector('input');
            this.cursorPosition = input.selectionStart;
            const key = event.key;
            const fields = { hour: 0, minute: 1 };
            const maxLengths = { hour: 2, minute: 2 };
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
            const isDigit = /^[0-9]$/.test(key);
            const isAllowedSystemKey = /^F([1-9]|1[0-2])$/.test(key) || key === 'Tab';
            if (isDigit) {
                event.preventDefault();
                const fieldIndex = fields[this.selectedField];
                let fieldValue = this.internalValue[fieldIndex];
                if (!this.isEditingField) {
                    fieldValue = '';
                    this.isEditingField = true;
                }
                if (fieldValue === '0') fieldValue = key;
                else fieldValue += key;
                fieldValue = fieldValue.slice(-maxLengths[this.selectedField]);
                Vue.set(this.internalValue, fieldIndex, fieldValue);
                if (fieldValue.length === maxLengths[this.selectedField]) {
                    if (this.selectedField === 'hour') this.selectedField = 'minute';
                    this.isEditingField = false;
                }
                this.updateDisplayValue();
                this.$nextTick(() => this.selectField());
                return;
            }
            if (key === 'Backspace' || key === 'Delete') {
                event.preventDefault();
                const fieldIndex = fields[this.selectedField];
                Vue.set(this.internalValue, fieldIndex, '');
                this.isEditingField = false;
                this.updateDisplayValue();
                this.$nextTick(() => this.selectField());
                return;
            }
            if (key === 'ArrowLeft') {
                event.preventDefault();
                if (this.selectedField === 'minute') this.selectedField = 'hour';
                this.isEditingField = false;
                this.$nextTick(() => this.selectField());
                return;
            }
            if (key === 'ArrowRight') {
                event.preventDefault();
                if (this.selectedField === 'hour') this.selectedField = 'minute';
                this.isEditingField = false;
                this.$nextTick(() => this.selectField());
                return;
            }
            if (!isDigit && !allowedKeys.includes(key) && !isAllowedSystemKey) {
                event.preventDefault();
            }
        },
        handleClick(event) {
            const input = this.$refs.timeInput.$el.querySelector('input');
            this.cursorPosition = input.selectionStart;
            if (this.cursorPosition <= 2) {
                this.selectedField = 'hour';
            } else {
                this.selectedField = 'minute';
            }
            this.isEditingField = false;
            this.$nextTick(() => this.selectField());
        },
        handleFocus() {
            if (!this.selectedField) {
                this.selectedField = 'hour';
            }
            this.isEditingField = false;
            this.$nextTick(() => this.selectField());
        },
        selectField() {
            const input = this.$refs.timeInput.$el.querySelector('input');
            if (this.selectedField === 'hour') {
                input.setSelectionRange(0, 2);
                this.cursorPosition = 2;
            } else if (this.selectedField === 'minute') {
                input.setSelectionRange(3, 5);
                this.cursorPosition = 5;
            }
        },
        updateDisplayValue() {
            const [hour, minute] = this.internalValue;
            this.displayValue = `${hour.padStart(2, (hour ? '0' : '_')) || 'HH'}:${minute.padStart(2, (minute ? '0' : '_')) || 'MM'}`;
            if (this.isValidTime(this.formattedTime)) {
                this.pickerTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
                this.$emit('input', this.pickerTime);
            } else {
                this.$emit('input', null);
            }
        },
        isValidTime(value) {
            if (!this.required && (!value || value === '__:__' || value === 'HH:MM')) return true;
            const timeRegex = /^(\d{2}):(\d{2})$/;
            if (!timeRegex.test(value)) return false;
            const [hour, minute] = value.split(':').map(Number);
            return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
        },
        handleTimePickerInput(time) {
            if (time) {
                const [hour, minute] = time.split(':');
                this.internalValue = [hour, minute];
                this.updateDisplayValue();
            }
        },
        initializeTime() {
            const timeRegex = /^(\d{2}):(\d{2})$/;
            if (this.value && this.isValidTime(this.value)) {
                const [hour, minute] = this.value.split(':').map(Number);
                this.internalValue = [String(hour).padStart(2, '0'), String(minute).padStart(2, '0')];
                this.pickerTime = `${this.internalValue[0]}:${this.internalValue[1]}`;
                this.updateDisplayValue();
            } else if (this.timeAdd !== null) {
                const date = new Date();
                date.setMinutes(date.getMinutes() + parseInt(this.timeAdd));
                const hour = String(date.getHours()).padStart(2, '0');
                const minute = String(date.getMinutes()).padStart(2, '0');
                this.internalValue = [hour, minute];
                this.pickerTime = `${hour}:${minute}`;
                this.updateDisplayValue();
            }
        },
    },
    watch: {
        value(newVal) {
            if (newVal && this.isValidTime(newVal)) {
                if (newVal !== this.pickerTime) {
                    this.initializeTime();
                }
            } else {
                if (this.isValidTime(this.formattedTime)) {
                    this.internalValue = ['', ''];
                    this.displayValue = 'HH:MM';
                    this.pickerTime = null;
                }
            }
        },
    },
    created() {
        this.initializeTime();
    },
});
//===========================================================================================
Vue.component('f-time-counter', {
    props: {
        value: {
            type: Number,
            default: 0
        },
        type: {
            type: Number,
            default: 0
        },
        labelFormat: {
            type: Object,
            default: { class: "text-caption black--text" }
        },
        format: {
            type: Object,
            default: {
                label: "",
                day: " ngày",
                hour: " giờ",
                minute: " phút",
                second: " giây"
            }
        },
    },
    template: `<span v-bind="$attrs">{{format.label}}<span v-if="type==2 && timeNew">{{timeNew.toLocaleString()}}</span><span v-if="type==1">{{counterDown}}<span v-bind="labelFormat">{{format.second}}</span></span><span v-if="type==0"><span v-if="days">{{days}}<span v-bind="labelFormat">{{format.day}}</span></span> <span v-if="hours">{{hours}}<span v-bind="labelFormat">{{format.hour}}</span></span> <span v-if="minutes">{{minutes}}<span v-bind="labelFormat">{{format.minute}}</span></span> <span>{{seconds}}<span v-bind="labelFormat">{{format.second}}</span></span></span></span>`,
    data: function () {
        return {
            returnVal: false,
            myCounter: null,
            timeNew: 0,
            timeEnd: null,
            counterDown: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    },
    mounted: function () {
        this.startCountDown(this.value);
    },
    destroyed: function () {
        if (this.myCounter) clearInterval(this.myCounter);
    },
    methods: {
        formatDateTime(input) {
            let date;
            if (!input) {
                date = new Date();
            } else if (typeof input === "string") {
                const match = input.match(/\/Date\((\d+)\)\//);
                if (match) {
                    date = new Date(parseInt(match[1], 10));
                } else {
                    date = new Date(input);
                }
            } else if (input instanceof Date) {
                date = input;
            } else {
                date = new Date();
            }

            const pad = (num) => (num < 10 ? "0" + num : num);

            const yyyy = date.getFullYear();
            const MM = pad(date.getMonth() + 1);
            const dd = pad(date.getDate());
            const HH = pad(date.getHours());
            const mm = pad(date.getMinutes());
            const ss = pad(date.getSeconds());

            return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
        },
        startCountDown: function (second) {
            this.returnVal = false;

            if (_.isString(second)) {
                var regNum = /^[0-9]*$/gm;
                if (regNum.test(second)) second = parseInt(second);
                else {
                    var arr = second.split(/[- :]/);
                    second = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
                }
            }

            if (!_.isDate(second)) {
                this.timeEnd = new Date();
                this.timeEnd.setSeconds(this.timeEnd.getSeconds() + second);
                this.returnVal = true;
            } else this.timeEnd = second;

            if (this.myCounter) clearInterval(this.myCounter);
            //-------------------------------------------------------------
            if (this.type == 2) { //--- dong ho thoi gian 
                this.counterDown = (Date.parse(this.timeEnd) - Date.parse(new Date()));
                this.timeNew = new Date(Date.parse(new Date()) + this.counterDown);
                setInterval(function () {
                    this.timeNew = new Date(Date.parse(new Date()) + this.counterDown);
                }.bind(this), 1000);
                return;
            }
            //----- Dem lui --------------------------
            countDown(this);
            if (this.counterDown <= 0) return;

            this.myCounter = setInterval(function () {
                countDown(this);
            }.bind(this), 1000);
            //-----------------------------------------
            function countDown(self) {
                self.counterDown = (Date.parse(self.timeEnd) - Date.parse(new Date())) / 1000;

                if (self.returnVal) self.$emit("input", self.counterDown);
                if (self.counterDown <= 0) {
                    self.$emit("time-end");
                    clearInterval(self.myCounter);
                }

                if (self.counterDown < 0) self.counterDown = 0;

                self.days = Math.floor(self.counterDown / (60 * 60 * 24));
                self.hours = Math.floor((self.counterDown % (60 * 60 * 24)) / (60 * 60));
                self.minutes = Math.floor((self.counterDown % (60 * 60)) / 60);
                self.seconds = Math.floor((self.counterDown % (60)));
            }
        }
    },
    watch: {
        value(newValue, oldValue) {
            this.startCountDown(this.formatDateTime(newValue));
        },
    }
});

//=======================================================================================================================================
Vue.component('fp-profile', {
    props: {
        urlAppList: {
            default: null
        },
        urlSignout: {
            default: null
        },
        urlChangePassword: {
            default: null
        },
        urlAccount: {
            default: null
        },
        urlAvatar: {
            default: null
        },
        color: {
            default: "primary"
        },
        openOnHover: {
            default: false
        },
    },
    template: `
            <v-menu v-if="userInfo.UserID" v-model="menu" :close-on-content-click="false" :open-on-hover="openOnHover" offset-y slide-y transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">         
                    <v-avatar v-bind="attrs" v-on="on" size="36" class="ml-2 cursor-pointer">                    
                        <img v-if="urlAvatar" :src="avatarImg">
                        <v-icon v-else :color="color">mdi-card-account-details</v-icon>
                    </v-avatar>
                </template>

                <v-card width=350>
                    <v-list>
                        <v-list-item><h4 class="">Thông tin người dùng</h4></v-list-item>
                        <v-list-item>
                            <v-avatar color="grey lighten-2" size="56">
                                <img v-if="urlAvatar" :src="avatarImg">
                                <v-icon v-else>mdi-account-tie</v-icon>
                            </v-avatar>

                            <v-list-item-content v-if="userInfo">
                                <v-list-item-title><v-btn color="primary" text :href="urlAccount">{{userInfo.FirstName}} {{userInfo.LastName}}</v-btn></v-list-item-title>
                                <v-list-item-subtitle class="ml-4"><b style="color: #000; font-size: larger;">{{userInfo.UserName}}</b> - {{userInfo.UserID}} - {{userInfo.DepartmentID}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-card-actions>
                        <v-spacer></v-spacer> 
                        <v-btn v-if="urlChangePassword" color="primary" text @click="clickChangePass"><v-icon left>mdi-key-arrow-right</v-icon>Đổi mật khẩu</v-btn>
                        <v-btn v-if="urlSignout" color="warning" text @click="clickSignout"><v-icon left>mdi-logout</v-icon>Đăng xuất</v-btn>
                    </v-card-actions>

                    <v-list-item v-if="appList.length > 0"><h4 class="">Ứng dụng của tôi</h4></v-list-item>
                    <v-list v-if="appList.length > 0" class="fpScrollbar" style="display: grid; grid-template-columns: auto auto auto; max-height: 400px; ">
                        <v-list-item v-for="(item, i) in appList" :key="i" :value="item" :href="item.URL" color="primary" rounded="shaped" class="pa-2" style="display: inline-block; text-align: center; cursor: pointer;">
                            <v-icon v-text="item.Icon" color="primary" style="font-size: 30px;"></v-icon>
                            <v-list-item-title v-text="item.AppName" class="mt-1" style="font-size: 11px; text-wrap: wrap;"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        `,
    data: function () {
        return {
            userInfo: vueData.user,
            menu: false,
            appList: [],
            firstLoad: false
        }
    },
    computed: {
        avatarImg: function () {
            return this.urlAvatar + this.userInfo.UserID + ".jpg"
        }
    },
    watch: {
        menu: function (e) {
            if (!this.firstLoad && this.urlAppList) {
                this.firstLoad = true
                ajaxCALL(this.urlAppList, {}, (d) => {
                    this.appList = d.data;
                });
            }
        },
    },
    methods: {
        clickChangePass: function (e) {
            this.menu = false
            location.assign(this.urlChangePassword)
        },
        clickSignout: function (item) {
            this.menu = false
            location.assign(this.urlSignout)
        }
    },
});
//===========================================================================================
// Vue.component('header-bar', {
//     props: {
//         menu: {
//             default: null
//         },
//         menuLeft: {
//             default: null
//         },
//         title: {
//             default: ''
//         },
//         logo: {
//             default: ""
//         },
//         expand: {
//             default: true
//         },
//         menuStyle: {
//             default: {
//                 topmenu: {
//                     bgcolor: "primary",
//                     textcolor: "white"
//                 },
//                 leftmenu: {
//                     bgcolor: "primary",
//                     textcolor: "white"
//                 }
//             }
//         },
//         component: {
//             default: null
//         },
//         userProfile: {
//             default: null
//         },
//     },
//     template: `<div>
//             <v-app-bar v-if="isMobile || menu" light app dense flat clipped-left :color="menuStyle.topmenu.bgcolor" :style="{ 'box-shadow': 'rgba(0, 0, 0, 0.5) 0px 0px '+ boxShadow +'px 0px !important'}">
//                 <v-img class="mr-3" v-if="logo" :src="logo" height="26" width="26" max-height="26" max-width="26" contain></v-img>
//                 <v-toolbar-title v-if="title" :class="[menuStyle.topmenu.textcolor + '--text']">{{title}}</v-toolbar-title>
//                 <v-spacer></v-spacer>
//                 <v-toolbar-items class="hidden-sm-and-down" v-if="menu">
//                     <v-menu offset-y v-for="(item, index) in menu.filter(info => checkright(info))" :key="index">
//                         <template v-slot:activator="{ on }">
//                             <v-btn v-on="on" :href="(!item.submenu?item.url:'')" :target="item.target" text :class="[menuStyle.topmenu.textcolor + '--text']">
//                                 <v-icon v-if="item.icon" v-text="item.icon" left class="mr-1"></v-icon>
//                                 {{ item.name }}<v-icon v-if="!!item.submenu">mdi-chevron-down</v-icon>
//                             </v-btn>
//                         </template>
//                         <v-list v-if="!!item.submenu">
//                             <v-list-item v-for="(i, index) in item.submenu.filter(info => checkright(info))" :key="index" :href="i.url" :target="i.target">
//                                 <v-list-item-title>{{ i.name }}</v-list-item-title>
//                             </v-list-item>
//                         </v-list>
//                     </v-menu>
//                 </v-toolbar-items>
//                 <component v-if="!isMobile && component" v-for="(c, index) in component" :key="index" v-bind:is="c.el" v-bind="c.attr"></component>
//                 <fp-profile v-if="!isMobile && userProfile" v-bind="userProfile"></fp-profile>
//                 <v-app-bar-nav-icon v-if="isMobile && leftMenuAndMobile" :color="menuStyle.topmenu.textcolor" @click.stop="openLeftMenu=!openLeftMenu"></v-app-bar-nav-icon>
//             </v-app-bar>

//             <v-navigation-drawer v-if="leftMenuAndMobile" :class="[menuStyle.leftmenu.bgcolor, menuStyle.leftmenu.textcolor + '--text','fpScrollbar']" v-model="openLeftMenu" app clipped :right="isMobile" :permanent="!isMobile" :mini-variant="pinLeftMenu && !isMobile" :expand-on-hover="pinLeftMenu && !isMobile">
//                 <template v-slot:prepend v-if="!isMobile && !menu">
//                     <v-list-item class="px-0 pt-1 pl-3">
//                         <v-img class="mr-1" v-if="logo" :src="logo" height="30" width="30" max-height="30" max-width="30" contain></v-img>
//                         <v-toolbar-title v-if="title" :class="[menuStyle.leftmenu.textcolor + '--text']">{{title}}</v-toolbar-title>
//                     </v-list-item>
//                 </template>
//                 <v-list class="text-left pa-0" :color="menuStyle.leftmenu.bgcolor" dark v-if="leftMenuAndMobile">
//                     <template v-for="(item, index) in leftMenuAndMobile.filter(info => checkright(info))" :key="index">
//                         <v-list-item v-if="!item.submenu" :href="item.url" :target="item.target">
//                             <v-icon v-if="item.icon" v-text="item.icon" class="mr-2"></v-icon>
//                             <v-list-item-title :class="[menuStyle.leftmenu.textcolor + '--text']">{{ item.name }}</v-list-item-title>
//                         </v-list-item>
//                         <v-list-group v-if="item.submenu" v-model="item.active" :color="menuStyle.leftmenu.textcolor">
//                             <template v-slot:activator>
//                                 <v-icon v-if="item.icon" v-text="item.icon" class="mr-2"></v-icon>
//                                 <v-list-item-title :class="[menuStyle.leftmenu.textcolor + '--text']">{{ item.name }}</v-list-item-title>
//                             </template>
//                             <v-list-item v-for="(i, index) in item.submenu.filter(info => checkright(info))" :key="index" :href="i.url" :target="i.target">
//                                 <v-list-item-subtitle class="ml-6" :class="[menuStyle.leftmenu.textcolor + '--text']">{{ i.name }}</v-list-item-title>
//                             </v-list-item>
//                         </v-list-group>
//                     </template>
//                 </v-list>
//                 <template v-slot:append>
//                     <component v-if="!menu && component || isMobile" v-for="(c, index) in component" :key="index" v-bind:is="c.el" v-bind="c.attr"></component>
//                     <v-list-item class="pa-0">
//                         <fp-profile v-if="!menu && userProfile || isMobile" v-bind="userProfile" open-on-hover></fp-profile>
//                         <v-spacer></v-spacer>
//                         <v-btn @click.stop="on_of_menu" v-if="(menu || leftMenuAndMobile) && !isMobile" :color="menuStyle.topmenu.textcolor" icon><v-icon :color="menuStyle.leftmenu.textcolor">{{ pinLeftMenu?'mdi-pin-outline':'mdi-pin-off-outline'}}</v-icon></v-btn>
//                     </v-list-item>
//               </template>
//             </v-navigation-drawer>
//         </div>`,
//     data: function () {
//         var leftMenuAndMobile = []
//         if (this.$vuetify.breakpoint.smAndDown) {
//             _.forEach(_.union(this.menu, this.menuLeft), function (value) {
//                 if (rightTest(value.right)) leftMenuAndMobile.push(value);
//             });

//             if (leftMenuAndMobile.length == 0) leftMenuAndMobile = null;
//         }
//         else leftMenuAndMobile = this.menuLeft;

//         return {
//             leftMenuAndMobile: leftMenuAndMobile,
//             openLeftMenu: this.isMobile,
//             pinLeftMenu: (sessionStorage.getItem("fpOpenmenuAppBar") == null ? !this.expand : sessionStorage.getItem("fpOpenmenuAppBar") == 'true'),
//             boxShadow: 0
//         }
//     },
//     computed: {
//         isMobile() {
//             if (this.$vuetify.breakpoint.smAndDown) return true
//             else return false;
//         }
//     },
//     methods: {
//         on_of_menu: function (e) {
//             this.pinLeftMenu = !this.pinLeftMenu
//             sessionStorage.setItem("fpOpenmenuAppBar", this.pinLeftMenu);
//         },
//         checkright: function (item) {
//             if (!item.right) return true;
//             if (!vueData.user) return false;

//             return rightTest(item.right);
//         }
//     },
//     created() {
//         if (!this.$isServer) {
//             this._scrollListener = () => {
//                 this.boxShadow = Math.round(window.pageYOffset) / 10;
//                 if (this.boxShadow > 10) this.boxShadow = 10;
//             }
//             this._scrollListener()
//             window.addEventListener('scroll', this._scrollListener)
//         }
//     },
//     beforeDestroy() {
//         window.removeEventListener('scroll', this._scrollListener)
//     }
// });
Vue.component('header-bar', {
    props: {
        menu: {
            default: null
        },
        menuLeft: {
            default: null
        },
        title: {
            default: ''
        },
        logo: {
            default: ""
        },
        expand: {
            default: true
        },
        menuStyle: {
            default: {
                topmenu: {
                    bgcolor: "primary",
                    textcolor: "white"
                },
                leftmenu: {
                    bgcolor: "primary",
                    textcolor: "white"
                }
            }
        },
        component: {
            default: null
        },
        userProfile: {
            default: null
        },
        activeColor: {
            default: "rgba(255,255,255,0.15)"
        }
    },
    template: "<div>\
            <v-app-bar v-if=\"isMobile || menu\" light app dense flat clipped-left :color=\"menuStyle.topmenu.bgcolor\" :style=\"{ 'box-shadow': 'rgba(0, 0, 0, 0.5) 0px 0px '+ boxShadow +'px 0px !important'}\">\
                <v-img class=\"mr-3\" v-if=\"logo\" :src=\"logo\" height=\"26\" width=\"26\" max-height=\"26\" max-width=\"26\" contain></v-img>\
                <v-toolbar-title v-if=\"title\" :class=\"[menuStyle.topmenu.textcolor + '--text']\">{{title}}</v-toolbar-title>\
                <v-spacer></v-spacer>\
                <v-toolbar-items class=\"hidden-sm-and-down\" v-if=\"menu\">\
                    <v-menu offset-y v-for=\"(item, index) in menu.filter(function(info) { return checkright(info); })\" :key=\"index\">\
                        <template v-slot:activator=\"{ on }\">\
                            <v-btn v-on=\"on\" :href=\"(!item.submenu?item.url:'')\" :target=\"item.target\" text :class=\"[menuStyle.topmenu.textcolor + '--text']\">\
                                <v-icon v-if=\"item.icon\" v-text=\"item.icon\" left class=\"mr-1\"></v-icon>\
                                {{ item.name }}<v-icon v-if=\"!!item.submenu\">mdi-chevron-down</v-icon>\
                            </v-btn>\
                        </template>\
                        <v-list v-if=\"!!item.submenu\">\
                            <v-list-item v-for=\"(i, index) in item.submenu.filter(function(info) { return checkright(info); })\" :key=\"index\" :href=\"i.url\" :target=\"i.target\">\
                                <v-list-item-title>{{ i.name }}</v-list-item-title>\
                            </v-list-item>\
                        </v-list>\
                    </v-menu>\
                </v-toolbar-items>\
                <component v-if=\"!isMobile && component\" v-for=\"(c, index) in component\" :key=\"index\" v-bind:is=\"c.el\" v-bind=\"c.attr\"></component>\
                <fp-profile v-if=\"!isMobile && userProfile\" v-bind=\"userProfile\"></fp-profile>\
                <v-app-bar-nav-icon v-if=\"isMobile && leftMenuAndMobile\" :color=\"menuStyle.topmenu.textcolor\" @click.stop=\"openLeftMenu=!openLeftMenu\"></v-app-bar-nav-icon>\
            </v-app-bar>\
            <v-navigation-drawer \
                v-if=\"leftMenuAndMobile\" \
                ref=\"navDrawer\"\
                :class=\"[menuStyle.leftmenu.bgcolor, menuStyle.leftmenu.textcolor + '--text', 'fp-custom-scrollbar']\" \
                v-model=\"openLeftMenu\" \
                app \
                clipped \
                :right=\"isMobile\" \
                :permanent=\"!isMobile\" \
                :mini-variant=\"pinLeftMenu && !isMobile\" \
                :expand-on-hover=\"pinLeftMenu && !isMobile\">\
                <template v-slot:prepend v-if=\"!isMobile && !menu\">\
                    <v-list-item class=\"px-0 pt-1 pl-3\">\
                        <v-img class=\"mr-1\" v-if=\"logo\" :src=\"logo\" height=\"30\" width=\"30\" max-height=\"30\" max-width=\"30\" contain></v-img>\
                        <v-toolbar-title v-if=\"title\" :class=\"[menuStyle.leftmenu.textcolor + '--text']\">{{title}}</v-toolbar-title>\
                    </v-list-item>\
                </template>\
                <v-list class=\"text-left pa-0\" :color=\"menuStyle.leftmenu.bgcolor\" dark v-if=\"leftMenuAndMobile\">\
                    <template v-for=\"(item, index) in leftMenuAndMobile.filter(function(info) { return checkright(info); })\">\
                        <v-list-item \
                            v-if=\"!item.submenu\" \
                            :key=\"'item-'+index\"\
                            :href=\"item.url\" \
                            :target=\"item.target\"\
                            :data-active=\"isActiveUrl(item.url) ? 'true' : null\"\
                            :style=\"isActiveUrl(item.url) ? {backgroundColor: activeColor} : {}\">\
                            <v-icon v-if=\"item.icon\" v-text=\"item.icon\" class=\"mr-2\"></v-icon>\
                            <v-list-item-title :class=\"[menuStyle.leftmenu.textcolor + '--text']\">{{ item.name }}</v-list-item-title>\
                        </v-list-item>\
                        <v-list-group \
                            v-if=\"item.submenu\" \
                            :key=\"'group-'+index\"\
                            v-model=\"item.active\" \
                            :color=\"menuStyle.leftmenu.textcolor\">\
                            <template v-slot:activator>\
                                <v-icon v-if=\"item.icon\" v-text=\"item.icon\" class=\"mr-2\"></v-icon>\
                                <v-list-item-title :class=\"[menuStyle.leftmenu.textcolor + '--text']\">{{ item.name }}</v-list-item-title>\
                            </template>\
                            <v-list-item \
                                v-for=\"(i, subIndex) in item.submenu.filter(function(info) { return checkright(info); })\" \
                                :key=\"subIndex\" \
                                :href=\"i.url\" \
                                :target=\"i.target\"\
                                :data-active=\"isActiveUrl(i.url) ? 'true' : null\"\
                                :style=\"isActiveUrl(i.url) ? {backgroundColor: activeColor} : {}\">\
                                <v-list-item-subtitle class=\"ml-6\" :class=\"[menuStyle.leftmenu.textcolor + '--text']\">{{ i.name }}</v-list-item-subtitle>\
                            </v-list-item>\
                        </v-list-group>\
                    </template>\
                </v-list>\
                <template v-slot:append>\
                    <component v-if=\"!menu && component || isMobile\" v-for=\"(c, index) in component\" :key=\"index\" v-bind:is=\"c.el\" v-bind=\"c.attr\"></component>\
                    <v-list-item class=\"pa-0\">\
                        <fp-profile v-if=\"!menu && userProfile || isMobile\" v-bind=\"userProfile\" open-on-hover></fp-profile>\
                        <v-spacer></v-spacer>\
                        <v-btn @click.stop=\"on_of_menu\" v-if=\"(menu || leftMenuAndMobile) && !isMobile\" :color=\"menuStyle.topmenu.textcolor\" icon><v-icon :color=\"menuStyle.leftmenu.textcolor\">{{ pinLeftMenu?'mdi-pin-outline':'mdi-pin-off-outline'}}</v-icon></v-btn>\
                    </v-list-item>\
              </template>\
            </v-navigation-drawer>\
        </div>",
    data: function () {
        var currentFullUrl = window.location.pathname + window.location.search;
        var leftMenuAndMobile = [];
        var menuSource = null;

        if (this.$vuetify.breakpoint.smAndDown) {
            _.forEach(_.union(this.menu, this.menuLeft), function (value) {
                if (rightTest(value.right)) leftMenuAndMobile.push(value);
            });
            if (leftMenuAndMobile.length == 0) leftMenuAndMobile = null;
            menuSource = leftMenuAndMobile;
        } else {
            menuSource = this.menuLeft;
            leftMenuAndMobile = this.menuLeft;
        }

        // Chỉ xử lý auto-expand nếu có menu bên trái
        if (menuSource && menuSource.length > 0) {
            _.forEach(menuSource, function (item) {
                if (item.submenu) {
                    var hasActiveChild = _.some(item.submenu, function (subItem) {
                        return subItem.url && currentFullUrl === subItem.url;
                    });
                    if (hasActiveChild) {
                        item.active = true;
                    }
                }
            });
        }

        return {
            leftMenuAndMobile: leftMenuAndMobile,
            openLeftMenu: this.isMobile,
            pinLeftMenu: (sessionStorage.getItem("fpOpenmenuAppBar") == null ? !this.expand : sessionStorage.getItem("fpOpenmenuAppBar") == 'true'),
            boxShadow: 0,
            currentFullUrl: currentFullUrl
        };
    },
    computed: {
        isMobile: function () {
            if (this.$vuetify.breakpoint.smAndDown) return true;
            else return false;
        }
    },
    methods: {
        on_of_menu: function (e) {
            this.pinLeftMenu = !this.pinLeftMenu;
            sessionStorage.setItem("fpOpenmenuAppBar", this.pinLeftMenu);
        },
        checkright: function (item) {
            if (!item.right) return true;
            if (!vueData.user) return false;

            return rightTest(item.right);
        },
        isActiveUrl: function (url) {
            if (!url) return false;
            return this.currentFullUrl === url;
        },
        scrollToActiveMenu: function () {
            if (!this.leftMenuAndMobile || this.leftMenuAndMobile.length === 0) return;

            var self = this;
            this.$nextTick(function () {
                setTimeout(function () {
                    var activeEl = self.$el.querySelector('[data-active="true"]');
                    if (activeEl) {
                        // Fallback cho trình duyệt cũ không hỗ trợ options
                        if ('scrollBehavior' in document.documentElement.style) {
                            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        } else {
                            activeEl.scrollIntoView(true);
                        }
                    }
                }, 300);
            });
        },
        injectScrollbarStyles: function () {
            if (!this.leftMenuAndMobile || this.leftMenuAndMobile.length === 0) return;

            var styleId = 'fp-custom-scrollbar-style';
            if (document.getElementById(styleId)) return;

            var thumbColor = 'rgba(255,255,255,0.3)';
            var thumbHoverColor = 'rgba(255,255,255,0.5)';
            var trackColor = 'rgba(0,0,0,0.1)';

            var style = document.createElement('style');
            style.id = styleId;
            style.textContent = [
                '.fp-custom-scrollbar .v-navigation-drawer__content::-webkit-scrollbar {',
                '    width: 5px;',
                '}',
                '.fp-custom-scrollbar .v-navigation-drawer__content::-webkit-scrollbar-track {',
                '    background: ' + trackColor + ';',
                '}',
                '.fp-custom-scrollbar .v-navigation-drawer__content::-webkit-scrollbar-thumb {',
                '    background: ' + thumbColor + ';',
                '    border-radius: 3px;',
                '}',
                '.fp-custom-scrollbar .v-navigation-drawer__content::-webkit-scrollbar-thumb:hover {',
                '    background: ' + thumbHoverColor + ';',
                '}',
                '.fp-custom-scrollbar .v-navigation-drawer__content {',
                '    scrollbar-width: thin;',
                '    scrollbar-color: ' + thumbColor + ' ' + trackColor + ';',
                '}'
            ].join('\n');
            document.head.appendChild(style);
        }
    },
    created: function () {
        if (!this.$isServer) {
            var self = this;
            this._scrollListener = function () {
                self.boxShadow = Math.round(window.pageYOffset) / 10;
                if (self.boxShadow > 10) self.boxShadow = 10;
            };
            this._scrollListener();
            window.addEventListener('scroll', this._scrollListener);
        }
    },
    mounted: function () {
        if (this.leftMenuAndMobile && this.leftMenuAndMobile.length > 0) {
            this.injectScrollbarStyles();
            this.scrollToActiveMenu();
        }
    },
    beforeDestroy: function () {
        window.removeEventListener('scroll', this._scrollListener);
    }
});

//===========================================================================================
Vue.component('f-chart', {
    props: ["data", "type", "options", "reverseData"],
    template: `<canvas ref="myChart"></canvas>`,
    data: function () {
        return {
            myChart: null,
            config: {
                type: this.type,
                data: this.data,
                options: this.options
            },
            chart_color: [
                "#1e90ff",
                "#ffa64d",
                "#6fdc6f",
                "#f14aff",
                "#9966ff",
                "#02e8e8",
                "#402b58",
                "#3b8d74",
                "#095fa4",
                "#b63639",
                "#c84f7a",
                "#a8b236",
                "#90692f",
                "#b42e89",
                "#ff9966",
                "#4db8ff",
                "#1c8540",
                "#ff6699",
                "#5666ad",
                "#b2b266",
                "#e2976b",
                "#84c887",
                "#4d9dd0",
                "#a187f7",
                "#d9745b",
                "#862929",
                "#ea80fc",
                "#8c4391",
                "#ff8c00",
                "#53915b",
                "#6dcbab",
                "#7b7353",
                "#d4e157",
                "#cc242f",
                "#c69e31",
                "#fdd835",
                // Tableau20
                "#4E79A7",
                "#A0CBE8",
                "#F28E2B",
                "#FFBE7D",
                "#59A14F",
                "#8CD17D",
                "#B6992D",
                "#F1CE63",
                "#499894",
                "#86BCB6",
                "#E15759",
                "#FF9D9A",
                "#79706E",
                "#BAB0AC",
                "#D37295",
                "#FABFD2",
                "#B07AA1",
                "#D4A6C8",
                "#9D7660",
                "#D7B5A6",
            ]
        }
    },
    mounted() {
        this.buildChart(this);
    },
    watch: {
        data: {
            deep: true,
            handler(newValue) {
                this.myChart.destroy();
                this.config.data = newValue;
                this.buildChart(this);
            }
        }
    },
    methods: {

        buildChart(self) {
            if (self.reverseData && self.config.data.labels) self.config.data.labels = _.reverse(self.config.data.labels);
            let n = parseInt(Math.random() * 45);

            if (self.config.data) {
                _.forEach(self.config.data.datasets, function (v, k) {
                    if (self.reverseData && v.data) v.data = _.reverse(v.data);
                    if (!v.type) v.type = self.config.type;

                    if (v.type == 'pie' || v.type == 'doughnut' || v.type == 'polarArea') {
                        if (!v.backgroundColor) v.backgroundColor = self.chart_color;
                    } else {
                        if (!v.borderColor) v.borderColor = self.chart_color[k + n % self.chart_color.length];
                        if (!v.backgroundColor) v.backgroundColor = transparentize(v.borderColor, 0.6);
                        if (v.type && v.type != 'line') if (!v.borderWidth) v.borderWidth = 1;
                    }
                });

                self.myChart = new Chart(self.$refs.myChart, self.config);
            }
        },
    }
});
//===========================================================================================
Vue.component('f-chart-data-viewer', {
    props: ["label", "data"],
    template: `
        <div>
            <div class="title primary--text text--darken-2" v-html="label"></div>
            <v-card outlined v-for="(item, index) in data" :key="index" class="my-4">
                <div class="ma-3 subtitle text-start primary--text text--darken-2">{{item.name}}</div>
                <div v-for="(i, k) in item.data" :key="k" class="ma-3 text-start">
                <span class="red--text text--darken-2">{{i[1]}}</span> / 
                <span class="red--text text--darken-2">{{i[2]}}%</span> :  
                <span class="green--text text--darken-2">{{i[0]}}</span>
                </div>
            </v-card>
        </div>
    `,
    watch: {
        data: function (newValue, oldValue) {
            _.forEach(newValue, function (O) {
                O.total = _.sum(_.map(O.data, function (n) { return parseInt(n[1]) }));
                _.forEach(O.data, function (n) {
                    n.push((parseInt(n[1]) / O.total * 100).toFixed(2));
                });
            });
        }
    },

});
//===========================================================================================
Vue.component('f-window', {
    props: ['id'],
    template: `
       <v-dialog v-if="prop.open" v-model="prop.open" :fullscreen="(prop.width?false:true)" :width="prop.width" :max-width="prop.width" scrollable persistent :transition="prop.transition">
          <v-card class="rounded-0" :height="prop.height">
            <v-toolbar v-if="prop.headerbar" dense flat :dark="(prop.toolbarcolor?true:false)" :color="prop.toolbarcolor">
              <v-toolbar-title style="font-size: 18px;" v-html="prop.title"></v-toolbar-title>
              <v-spacer></v-spacer>
              <f-button :checkvalid=false v-for="(item,i) in prop.button" :key="i" text v-bind="item"></f-button>
              <v-btn icon :dark="(prop.toolbarcolor?true:false)" @click="prop.open = false" class="ml-4"><v-icon>mdi-close</v-icon></v-btn>
            </v-toolbar>
            <iframe v-bind="$attrs" :id="iframeDialog" name='frameName' height="100%" width="100%" style="border:none;" allow="fullscreen"></iframe>
          </v-card>
        </v-dialog>
    `,
    data: function () {
        var propInit = vueData[this.id];

        if (typeof propInit.height == 'undefined') propInit.height = '100%';
        if (_.isInteger(propInit.height)) propInit.height = propInit.height + 'px';
        if (typeof propInit.toolbarcolor == 'undefined' && !(propInit.height != '100%' || propInit.width)) propInit.toolbarcolor = 'primary';

        if (typeof propInit.headerbar == 'undefined') propInit.headerbar = true;
        if (typeof propInit.transition == 'undefined') propInit.transition = 'scale-transition';

        if (propInit.button && _.isPlainObject(propInit.button)) propInit.button = [propInit.button];

        return {
            prop: propInit,
            iframeDialog: this.id
        }
    },
    watch: {
        "prop.open": function (newValue, oldValue) {
            if (!newValue) {
                if (this.prop.onclose) runAction(this.prop.onclose, this.prop);
                setTimeout(() => {
                    if (vueData.v_windowVM[this.id]) {
                        vueData.v_windowVM[this.id].$destroy();
                        delete vueData.v_windowVM[this.id];
                        delete vueData[this.id];
                        if (Object.keys(vueData.v_windowVM).length == 0) $('html').css({ "overflow": "" });
                    }
                }, 10);
            }
        }
    },
    mounted: function () {
        var self = this;
        setTimeout(function () {
            console.log(self.prop.url);
            document.getElementById(self.iframeDialog).src = self.prop.url;
        }, 250);
        $('html').css({
            'cssText': 'overflow: hidden !important'
        });
    },
    destroyed() {
        console.log("window destroyed : ", this.id)
    }
});

//===========================================================================================

Vue.component('f-editor', {
    props: {
        value: {
            type: String,
            default: null,
        },
        imageapi: {
            type: String,
            default: 'https://fap.vn',
        },
        height: {
            type: Number,
            default: null,
        },
        toolbar: {
            type: String,
            default: null,
        },
    },
    template: `<div ref="elID" v-bind="$attrs"></div>`,
    data: function () {
        return {
            emitData: true,
            Editor: null
        }
    },
    watch: {
        value: function (newVal, oldVal) {
            this.$nextTick(() => {
                if (!this.emitData && newVal && this.Editor) this.Editor.setData(newVal);
                this.emitData = false;
            });
        }
    },
    mounted: function () {
        setTimeout(() => {
            ClassicEditor.create(this.$refs.elID, {
                toolbar: {
                    shouldNotGroupWhenFull: true,
                    items: (this.toolbar ? this.toolbar : [                        
                        'undo',
                        'redo',
                        'removeFormat',
                        'heading',
                        'fontFamily',
                        'fontSize',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'outdent',
                        'indent',
                        '|',
                        'specialCharacters',
                        'MathType',
                        'ChemType',
                        'horizontalLine',
                        'subscript',
                        'superscript',
                        'blockQuote',
                        '|',
                        'fontColor',
                        'fontBackgroundColor',
                        'highlight',
                        '|',
                        'alignment',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        '|',
                        'insertTable',
                        'mediaEmbed',
                        'link',
                        'imageUpload',
                    ])
                },
                language: 'en',
                mediaEmbed: {
                    toolbar: ['mediaEmbed']
                },                
                image: {
                    toolbar: [
                        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                        '|',
                        'resizeImage',
                        '|',
                        'imageTextAlternative',
                        'linkImage'
                    ],
                    styles: [
                        'alignLeft', 'alignCenter', 'alignRight'
                    ],
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableCellProperties',
                        'tableProperties'
                    ]
                },
                licenseKey: '',
                simpleUpload: {
                    // The URL that the images are uploaded to.
                    uploadUrl: this.imageapi,
                    // Enable the XMLHttpRequest.withCredentials property.
                    withCredentials: false,
                    // Headers sent along with the XMLHttpRequest to the upload server.
                    headers: {
                        Authorization: 'Bearer ' + getCookie('awt')
                    }
                },

            }).then(editor => {
                this.Editor = editor;
                if (this.value) editor.setData(this.value);
                editor.editing.view.change(writer => {
                    if (!this.height) this.height = 200;
                    writer.setStyle({ 'height': this.height + 'px' }, editor.editing.view.document.getRoot());
                });

                editor.model.document.on('change:data', () => {
                    if (this.value != editor.getData()) {
                        this.emitData = true;
                        this.$emit('input', editor.getData());
                    }
                });

                this.$emit('input', editor.getData());
            }).catch(error => {
                console.log(error);
            });
        }, 100);
    },
    methods: {}
});
//===========================================================================================
Vue.component('f-editor-dialog', {
    props: {
        value: {
            type: String,
            default: null,
        },
        imageapi: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: '',
        },
        width: {
            type: Number,
            default: 800,
        },
        toolbar: {
            type: String,
            default: null,
        },
    },
    template: `
        <v-overlay v-model="value.open" style="width: 100vw; height: 100vh; left: 0px; top: 0px; position: fixed;">
            <v-card light elevation="10" :width="width" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); ">
                <v-toolbar dense flat>
                    <v-toolbar-title>{{label}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text color="orange darken-2" @click="closeDialog(0)" class="mr-6">
                        <v-icon left>mdi-close</v-icon>Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="closeDialog(1)">
                        <v-icon left>mdi-check</v-icon>OK
                    </v-btn>
                </v-toolbar>
                <v-container text-left fluid class="pt-0">
                    <v-layout>
                        <v-flex xs12 :style="{height: windowHeight + 'px'}">
                            <f-editor v-model="textData" :imageapi="imageapi" :height="windowHeight - 76"></f-editor>
                        </v-flex>
                    </v-layout>
                    <v-layout><v-flex xs12></v-flex></v-layout>
                </v-container>
            </v-card>
        </v-overlay>
        `,
    data: function () {
        return {
            textData: this.getData(this.value),
            windowHeight: $(window).height() * 0.9 - 70,
        }
    },
    watch: {
        'value.text': {
            handler(newVal, oldVal) {
                this.textData = this.getData(this.value);
            }
        },
        'value.object': {
            deep: true,
            handler(newVal, oldVal) {
                this.textData = this.getData(this.value);
            }
        },
    },
    methods: {
        cleanWhitespace(html) {
            // Loại bỏ khoảng trắng sau <p> và trước </p>
            let cleanedContent = html.replace(/<p>\s*(?:&nbsp;|\s)*|(?:&nbsp;|\s)*<\/p>/g, function (match) {
                return match.startsWith('<p>') ? '<p>' : '</p>';
            }).trim();

            // Loại bỏ các thẻ <p></p> rỗng hoặc chỉ chứa khoảng trắng ở đầu và cuối chuỗi
            cleanedContent = cleanedContent.replace(/^(<p>\s*(?: |\s)*<\/p>\s*)+/, '');
            cleanedContent = cleanedContent.replace(/(<p>\s*(?: |\s)*<\/p>\s*)+$/, '');

            return cleanedContent.replace(/<p>\s*(?: |\s)*<\/p>/g, '<p>&nbsp;</p>');
        },
        getData(d) {
            if (!d) return "";
            if (d.object) return d.object[d.text];
            else return d.text;
        },
        closeDialog(e) {
            if (e == 1) {
                if (this.value.object) this.value.object[this.value.text] = this.cleanWhitespace(this.textData);
                else this.value.text = this.cleanWhitespace(this.textData);

                this.value.ok = true;
            } else this.value.ok = false;
            this.value.open = false;
        },
    },
});
//===========================================================================================
Vue.component('f-dialog', {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {}
        },
        dataOut: {
            type: Object,
            default: {}
        },
        title: {
            type: String,
            default: ''
        },
        controls: {
            type: Array,
            default: []
        },
        watch: {
            type: Object,
            default: {}
        },
        button: {
            default: []
        },
        disableValidate: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 800
        },
        openAction: {
            type: Object,
            default: null
        },
    },
    data: function () {
        var controlsForm = [{
            prop: "fluid text-center grid-list-lg py-0",
            rows: []
        }];

        var row = {
            prop: "row",
            cols: []
        };

        var updateUI = bindData(this.controls);

        if (_.isArray(updateUI) && updateUI.length > 0) {
            if (updateUI[0].rows) controlsForm = updateUI;
            else {
                _.forEach(updateUI, function (c) {
                    if (!c.w) c.w = 12
                    row.cols.push(c);
                    if (c.br) {
                        controlsForm[0].rows.push(_.cloneDeep(row));
                        row = {
                            prop: "row",
                            cols: []
                        };
                    }
                });
                if (row.cols.length > 0) controlsForm[0].rows.push(_.cloneDeep(row));
            }
        };

        var comData = { v_outData: {}, v_watch: {} };
        var controlsFormDOM = buildModuleUI(controlsForm, comData);

        //---------build v-model data object -------------------------------------
        _.forEach(controlsForm, function (C) {
            _.forEach(C.rows, function (R) {
                _.forEach(R.cols, function (e) {
                    if (e.attr['v-model'] && e.attr['v-model'].indexOf('vueData.') < 0) {
                        comData.v_outData[e.attr['v-model']] = null;
                        comData[e.attr['v-model']] = null;
                    }
                });
            });
        });

        this.setDefaultData(comData);
        //---------------------------------------------------------------------------------------------------------   
        this.$options.template = `<div>
            <v-overlay v-if="value" absolute style="position: fixed;"></v-overlay>
            <v-scale-transition origin="center center">
                <v-overlay v-if="value" opacity=0 absolute style="position: fixed;">
                    <v-form ref="formTable" lazy-validation @submit.prevent="return true">
                        <v-card light elevation="10" :width="width" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); ">
                            <v-toolbar dense flat>
                                <v-toolbar-title>{{ title }}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="$emit('input', false)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-card-text class="py-0 px-0">${controlsFormDOM[0].outerHTML}</v-card-text>
                            <v-card-actions class="mr-1 mb-1">
                                <v-spacer></v-spacer>
                                ${this.buildButton(this.button)}
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-overlay>                        
            </v-scale-transition> 
            </div>
            `;
        //------------------------------------------------------------------------------------------------------------
        return comData;
    },
    mounted: function () {
        //this.watchDialog(this.watch);
        if (typeof this.value == "undefined") this.value = true;
    },
    watch: {
        value(val) {
            if (val) {// Open Dialog
                this.setDefaultData(this);
                this.watchDialog(this.watch);
                if (this.openAction) runAction(this.openAction, this);
                console.log("Dialog Data:", this)
            }
            else {// Close Dialog
                _.forEach(this.v_watch, (item) => {
                    item();
                });
            }
        }
    },
    methods: {
        setDefaultData(obj) {
            _.assignIn(obj.v_outData, _.assignIn({}, this.data));
            _.assignIn(obj, _.assignIn({}, obj.v_outData));
            this.$emit('update:data-out', this);
        },
        formvalidate() {
            if (this.disableValidate) return true;
            return this.$refs.formTable.validate(true);
        },
        watchDialog(obj) {
            if (_.isPlainObject(obj)) {
                _.forEach(obj, (value, key) => {
                    console.log("ADD dialog watch : " + key);
                    if (!this.hasOwnProperty(key)) this[key] = undefined;

                    this.v_watch["v_watch_" + key] = this.$watch(key, (newValue, oldValue) => {
                        runAction(value, this);
                    });
                });
            }
        },
        buildButton(buttonArray) {
            var buttonContainer = $("<div>");
            _.forEach(buttonArray, function (C, index) {
                C = _.assignIn({
                    elevation: 0,
                    color: "primary",
                    text: true,
                }, C);

                delete C.action;

                var btn = $("<v-btn>").attr(C);
                btn.attr({ "v-on:click": "buttonclick(button[" + index + "])" });

                if (C['icon-text']) btn.append("<v-icon left>" + C['icon-text'] + "</v-icon>" + C['label']);
                else btn.append(C['label']);

                buttonContainer.append(btn);
            });

            return buttonContainer[0].innerHTML;
        },
        buttonclick: _.debounce(function (e) {
            if (e.getoutdata || e.checkvalid) {
                if (!this.formvalidate()) {
                    showMessage({ icon: 'mdi mdi-alert-outline', type: "red", title: "Hãy điền đầy đủ dữ liệu bắt buộc !" })
                    return;
                }
            }

            _.forEach(this.v_outData, (v, k) => {
                this.v_outData[k] = this[k];
            });

            if (e.getoutdata) {
                this.$emit('update:data', this.v_outData);
            }

            console.log("action", e.action)

            if (_.isFunction(e.action)) e.action();
            else
                if (e.action) {
                    let dData = _.assignIn({}, this.v_outData, { dData: this.v_outData });
                    console.log("Dialog Data: ", dData);
                    runAction(e.action, dData);
                }

        }, 500, { leading: true, trailing: false }),

    }
});

//===========================================================================================
Vue.component('f-pdfmake', {
    props: ['data'],
    template: `
        <v-card elevation="0" style="text-align: right">
            <v-overlay absolute :value="overlay"><v-progress-circular indeterminate color="white"></v-progress-circular></v-overlay>
            <iframe id="pdfmakeViewer" v-bind="$attrs" style="border: thin solid rgba(0,0,0,.12); margin:0;"></iframe>        
        </v-card>
    `,
    data: function () {
        return {
            overlay: true
        }
    },
    mounted: function () {
        var obj = this;
        printPDF({
            data: _.cloneDeep(obj.data),
            viewer: '#pdfmakeViewer',
            callBack: function () {
                obj.overlay = false;
            }
        });
    },
    watch: {
        data: {
            deep: true,
            handler(newVal) {
                printPDF({ data: _.cloneDeep(newVal), viewer: '#pdfmakeViewer' });
            }
        }
    },

});

//===========================================================================================
Vue.component('f-excel-reader', {
    props: {
        dateFormat: {
            type: String,
            default: null
        },    
        headerFormat: {
            type: String,
            default: null
        },    
        rawFormat: {
            type: String,
            default: null
        },    
        action: {
            type: Object,
            default: null
        },
        label: {
            type: String,
            default: 'Load Excel'
        },
        iconText: {
            type: String,
            default: 'mdi-grid'
        },
    },    
    template: `
        <div>
            <v-btn v-bind="$attrs" :loading="isSelecting" @click="onButtonClick" style="min-width: 100px;" ><v-icon left>{{iconText}}</v-icon>{{label}}</v-btn>
            <input ref="uploader" style="display:none;" type="file" multiple="false" :accept="SheetJSFT" @change="onchange" onclick="this.value=null;">
        </div>
    `,
    data: function () {
        return {
            SheetJSFT: ".xlsx,.xlsb,.xlsm,.xls,.xml,.csv,.txt,.ods,.fods,.uos,.sylk,.dif,.dbf,.prn,.html,.htm",
            isSelecting: false
        }
    },
    methods: {
        onButtonClick() {
            this.isSelecting = true
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true })
            this.$refs.uploader.click()
        },
        onchange: function (evt) {
            const ctrl = this;
            const files = evt.target.files;
            if (!files || files.length === 0) return;
            const file = files[0];
            if (typeof XLSX === 'undefined') {
                const loader = new Loader();
                loader.require(["/include/excel/xlsx.full.min.js"], function () {
                    if (typeof XLSX !== 'undefined') {
                        ctrl.readExcelFile(file);
                    } else {
                        console.error('Failed to load XLSX library');
                    }
                });
            } else {
                ctrl.readExcelFile(file);
            }
            evt.target.value = '';
        },
        async readExcelFile(file) {
            var ctrl = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                var dateFormat = ctrl.dateFormat;
                if (!dateFormat) dateFormat = 'FMT 14';

                var headerFormat = ctrl.headerFormat;
                if (!headerFormat) headerFormat = null;

                var rawFormat = ctrl.rawFormat;
                if (!rawFormat) rawFormat = false;

                // pre-process data
                var binary = "";
                var bytes = new Uint8Array(e.target.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }

                /* read workbook */
                var wb = XLSX.read(binary, { type: 'binary' });

                /* grab first sheet */
                var wsname = wb.SheetNames[0];
                var ws = wb.Sheets[wsname];

                /* generate HTML */
                var EXCELJSON = XLSX.utils.sheet_to_json(ws, { header: headerFormat, raw: rawFormat, dateNF: dateFormat, defval: "" });
                //---------------------------------
                ctrl.$emit('input', EXCELJSON);

                if (ctrl.action) CALL(ctrl.action);
            };

            reader.readAsArrayBuffer(file);
        },
    }
});