<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'fa-solid fa-gears', to: '/' }]
    },
    {
        label: 'Mục quản ly',
        items: [
            { label: 'Quản lý sản phẩm', icon: 'fa-solid fa-gears', to: '/product' },
            { label: 'Input', icon: 'fa-solid fa-gears', to: '/uikit/input' },
            { label: 'Float Label', icon: 'fa-solid fa-gears', to: '/uikit/floatlabel' },
            {
                label: 'Invalid State',
                icon: 'fa-solid fa-gears',
                to: '/uikit/invalidstate'
            },
            {
                label: 'Button',
                icon: 'fa-solid fa-gears',
                to: '/uikit/button',
                class: 'rotated-icon'
            },
            { label: 'Table', icon: 'fa-solid fa-gears', to: '/uikit/table' },
            { label: 'List', icon: 'fa-solid fa-gears', to: '/uikit/list' },
            { label: 'Tree', icon: 'fa-solid fa-gears', to: '/uikit/tree' },
            { label: 'Panel', icon: 'fa-solid fa-gears', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'fa-solid fa-gears', to: '/uikit/overlay' },
            { label: 'Media', icon: 'fa-solid fa-gears', to: '/uikit/media' },
            { label: 'Menu', icon: 'fa-solid fa-gears', to: '/uikit/menu', preventExact: true },
            { label: 'Message', icon: 'fa-solid fa-gears', to: '/uikit/message' },
            { label: 'File', icon: 'fa-solid fa-gears', to: '/uikit/file' },
            { label: 'Chart', icon: 'fa-solid fa-gears', to: '/uikit/charts' },
            { label: 'Misc', icon: 'fa-solid fa-gears', to: '/uikit/misc' }
        ]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'fa-solid fa-gears', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'fa-solid fa-gears', to: '/uikit/input' },
            { label: 'Float Label', icon: 'fa-solid fa-gears', to: '/uikit/floatlabel' },
            {
                label: 'Invalid State',
                icon: 'fa-solid fa-gears',
                to: '/uikit/invalidstate'
            },
            {
                label: 'Button',
                icon: 'fa-solid fa-gears',
                to: '/uikit/button',
                class: 'rotated-icon'
            },
            { label: 'Table', icon: 'fa-solid fa-gears', to: '/uikit/table' },
            { label: 'List', icon: 'fa-solid fa-gears', to: '/uikit/list' },
            { label: 'Tree', icon: 'fa-solid fa-gears', to: '/uikit/tree' },
            { label: 'Panel', icon: 'fa-solid fa-gears', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'fa-solid fa-gears', to: '/uikit/overlay' },
            { label: 'Media', icon: 'fa-solid fa-gears', to: '/uikit/media' },
            { label: 'Menu', icon: 'fa-solid fa-gears', to: '/uikit/menu', preventExact: true },
            { label: 'Message', icon: 'fa-solid fa-gears', to: '/uikit/message' },
            { label: 'File', icon: 'fa-solid fa-gears', to: '/uikit/file' },
            { label: 'Chart', icon: 'fa-solid fa-gears', to: '/uikit/charts' },
            { label: 'Misc', icon: 'fa-solid fa-gears', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Prime Blocks',
        items: [
            { label: 'Free Blocks', icon: 'fa-solid fa-gears', to: '/blocks', badge: 'NEW' },
            {
                label: 'All Blocks',
                icon: 'fa-solid fa-gears',
                url: 'https://www.primefaces.org/primeblocks-vue',
                target: '_blank'
            }
        ]
    },
    {
        label: 'Utilities',
        items: [
            { label: 'PrimeIcons', icon: 'fa-solid fa-gears', to: '/utilities/icons' },
            {
                label: 'PrimeFlex',
                icon: 'fa-solid fa-gears',
                url: 'https://www.primefaces.org/primeflex/',
                target: '_blank'
            }
        ]
    },
    {
        label: 'Pages',
        icon: 'fa-solid fa-gears',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'fa-solid fa-gears',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'fa-solid fa-gears',
                items: [
                    {
                        label: 'Login',
                        icon: 'fa-solid fa-gears',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'fa-solid fa-gears',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'fa-solid fa-gears',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'fa-solid fa-gears',
                to: '/pages/crud'
            },
            {
                label: 'Timeline',
                icon: 'fa-solid fa-gears',
                to: '/pages/timeline'
            },
            {
                label: 'Not Found',
                icon: 'fa-solid fa-gears',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'fa-solid fa-gears',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'fa-solid fa-gears',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'fa-solid fa-gears',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'fa-solid fa-gears' },
                            { label: 'Submenu 1.1.2', icon: 'fa-solid fa-gears' },
                            { label: 'Submenu 1.1.3', icon: 'fa-solid fa-gears' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'fa-solid fa-gears',
                        items: [{ label: 'Submenu 1.2.1', icon: 'fa-solid fa-gears' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'fa-solid fa-gears',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'fa-solid fa-gears',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'fa-solid fa-gears' },
                            { label: 'Submenu 2.1.2', icon: 'fa-solid fa-gears' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'fa-solid fa-gears',
                        items: [{ label: 'Submenu 2.2.1', icon: 'fa-solid fa-gears' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'fa-solid fa-gears',
                to: '/documentation'
            },
            {
                label: 'Figma',
                url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                icon: 'fa-solid fa-gears',
                target: '_blank'
            },
            {
                label: 'View Source',
                icon: 'fa-solid fa-gears',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            },
            {
                label: 'Nuxt Version',
                url: 'https://github.com/primefaces/sakai-nuxt',
                icon: 'fa-solid fa-gears'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            {{ item.separa }}
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img
                    src="/layout/images/banner-primeblocks.png"
                    alt="Prime Blocks"
                    class="w-full mt-3"
                />
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>
