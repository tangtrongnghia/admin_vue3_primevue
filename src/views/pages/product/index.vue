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
                    <div>
                        <div class="font-medium text-3xl text-900">Quản lý sản phẩm</div>
                        <div class="flex align-items-center text-700 flex-wrap">
                            <div class="mr-5 flex align-items-center mt-3">
                                <i class="pi pi-users mr-2"></i>
                                <span>332 Active Users</span>
                            </div>
                            <div class="mr-5 flex align-items-center mt-3">
                                <i class="pi pi-globe mr-2"></i>
                                <span>9402 Sessions</span>
                            </div>
                            <div class="flex align-items-center mt-3">
                                <i class="pi pi-clock mr-2"></i>
                                <span>2.32m Avg. Duration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 pt-1">
            <div class="flex justify-content-end mb-2">
                <div class="mt-3 lg:mt-0">
                    <Button
                        label="Xóa"
                        class="mr-2"
                        icon="pi pi-times-circle"
                        severity="danger"
                    ></Button>
                    <router-link to="/product/add">
                        <Button label="Thêm mới" icon="pi pi-plus-circle"></Button>
                    </router-link>
                </div>
            </div>

            <div class="card p-fluid">
                <h5>Danh sách sản phẩm</h5>
                <DataTable
                    :value="customers"
                    lazy
                    paginator
                    :first="first"
                    :rows="10"
                    ref="dt"
                    dataKey="id"
                    :totalRecords="totalRecords"
                    :loading="loading"
                    @page="onPage($event)"
                    @sort="onSort($event)"
                    v-model:selection="selectedCustomers"
                    :selectAll="selectAll"
                    @select-all-change="onSelectAllChange"
                    @row-select="onRowSelect"
                    @row-unselect="onRowUnselect"
                >
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="country.name" header="Country" sortable>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <img
                                    alt="flag"
                                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                    :class="`flag flag-${data.country.code}`"
                                    style="width: 24px"
                                />
                                <span>{{ data.country.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="company" header="Company" sortable></Column>
                    <Column field="representative.name" header="Company" sortable>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <img
                                    :alt="data.representative.name"
                                    :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                                    style="width: 32px"
                                />
                                <span>{{ data.representative.name }}</span>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/service/CustomerService.js';

const service = CustomerService;

onMounted(() => {
    loading.value = true;

    lazyParams.value = {
        first: 0,
        rows: 10,
        sortField: null,
        sortOrder: null
    };

    loadLazyData();
});

const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const customers = ref();
const selectedCustomers = ref();
const selectAll = ref(false);
const first = ref(0);
const lazyParams = ref({});

const loadLazyData = (event) => {
    loading.value = true;
    lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };

    setTimeout(() => {
        service.getCustomers({ lazyEvent: JSON.stringify(lazyParams.value) }).then((data) => {
            customers.value = data.customers;
            totalRecords.value = data.totalRecords;
            loading.value = false;
        });
    }, Math.random() * 1000 + 250);
};
const onPage = (event) => {
    lazyParams.value = event;
    loadLazyData(event);
};
const onSort = (event) => {
    lazyParams.value = event;
    loadLazyData(event);
};

const onSelectAllChange = (event) => {
    selectAll.value = event.checked;

    if (selectAll) {
        service.getCustomers().then((data) => {
            selectAll.value = true;
            selectedCustomers.value = data.customers;
        });
    } else {
        selectAll.value = false;
        selectedCustomers.value = [];
    }
};
const onRowSelect = () => {
    selectAll.value = selectedCustomers.value.length === totalRecords.value;
};
const onRowUnselect = () => {
    selectAll.value = false;
};
</script>
