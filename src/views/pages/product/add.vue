<template>
    <div class="grid">
        <div class="col-12 pb-1">
            <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
                <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                    <li>
                        <a class="text-500 no-underline line-height-3 cursor-pointer"
                            >Application</a
                        >
                    </li>
                    <li class="px-2">
                        <i class="pi pi-angle-right text-500 line-height-3"></i>
                    </li>
                    <li>
                        <span class="text-900 line-height-3">Analytics</span>
                    </li>
                </ul>
                <div
                    class="flex align-items-start flex-column lg:justify-content-between lg:flex-row"
                >
                    <div class="font-medium text-3xl text-900">Thêm mới sản phẩm</div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="firstname2">Tên sản phẩm</label>
                        <InputText id="firstname2" type="text" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">slug</label>
                        <InputText id="lastname2" type="text" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="address">Danh mục</label>
                        <MultiSelect
                            v-model="selectedCities"
                            :options="cities"
                            display="chip"
                            filter
                            optionLabel="name"
                            placeholder="Select Cities"
                            class="w-full"
                        />
                    </div>
                    <div class="field col-12 md:col-6">
                        <p>Dánh dấu</p>
                        <div class="formgroup-inline">
                            <div class="field-checkbox">
                                <InputSwitch v-model="check" invalid id="city3" />
                                <label for="city3">Kích hoạt</label>
                            </div>
                            <div class="field-checkbox">
                                <InputSwitch v-model="check" invalid id="city4" />
                                <label for="city4">Dự án đã thực hiện</label>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="address">Mô tả ngắn</label>
                        <Textarea id="address" rows="4" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="address">Từ khóa</label>
                        <MultiSelect
                            v-model="selectedCities"
                            :options="cities"
                            display="chip"
                            filter
                            optionLabel="name"
                            placeholder="Select Cities"
                            class="w-full"
                        />
                        <div class="flex flex-wrap mt-2">
                            <div class="col-6 px-0">
                                <InputText type="text" placeholder="Thêm mới từ khóa" />
                            </div>

                            <div class="ml-2">
                                <Button type="button" label="Thêm" />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <label for="address">Từ khóa</label>
                        <!-- <Editor
                            v-model="value"
                            :modules="toolbarOptions"
                            editorStyle="height: 320px"
                        >
                            <template #toolbar>
                                <div></div>
                            </template>
                        </Editor> -->
                        <QuillEditor
                            theme="snow"
                            :modules="modules"
                            :toolbar="toolbarOptions.toolbar"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss"></style>

<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import ImageResize from '@taoqf/quill-image-resize-module';
import ImageUploader from 'quill-image-uploader';

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { ref } from 'vue';
const value = ref();
import axiosIns from '@/apis/axios';

const selectedCities = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const check = ref(false);

const toolbarOptions = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'] // remove formatting button
    ]
};
const modules = [
    // {
    //     name: 'imageUploader',
    //     module: ImageUploader,
    //     options: {
    //         upload: (file) => {
    //             return new Promise((resolve, reject) => {
    //                 const formData = new FormData();
    //                 formData.append('image', file);
    //                 axiosIns
    //                     .post('/upload-image', formData)
    //                     .then((res) => {
    //                         console.log(res);
    //                         resolve(res.data.url);
    //                     })
    //                     .catch((err) => {
    //                         reject('Upload failed');
    //                         console.error('Error:', err);
    //                     });
    //             });
    //         }
    //     }
    // },
    {
        name: 'ImageResize',
        module: ImageResize,
        options: {
            modules: ['Resize', 'DisplaySize'],
            handleStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
                // other camelCase styles for size display
            },
            displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
                // other camelCase styles for size display
            }
        }
    }
];
</script>
