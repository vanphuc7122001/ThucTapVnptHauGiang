<template>
  <div class="border-box d-flex flex-column ml-2">
    <!-- Menu -->
    <div class="report_container">
      <div
        class="mx-1 report__item"
        :style="data.activeMenu == 2 ? { border: '1px solid blue' } : {}"
      >
        <router-link
          :to="!isReadReport() ? '#' : '/report'"
          :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
          class=""
        >
          <span class=""> Khách hàng lâu chưa chăm sóc</span>
          <span class="pl-3" style="margin-top: -4px">
            <span class="material-symbols-outlined"> group </span>
            <span class="text-center"
              >{{ store.countReport }}/{{ store.countCustomer }}</span
            >
          </span>
        </router-link>
      </div>
      <div
        class="mx-1 report__item"
        :style="data.activeMenu == 1 ? { border: '1px solid blue' } : {}"
      >
        <!-- to="/report_assignment_staff" -->
        <router-link
          :to="!isReadReportAssinmentStaff() ? '#' : '/report_assignment_staff'"
          :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
          class=""
        >
          <span class=""> Khách hàng do nhân viên chăm sóc </span>
          <span class="pl-3" style="margin-top: -4px">
            <span class="material-symbols-outlined"> group </span>
            <span class="text-center"
              >{{ store.countReportAssignmentStaff }}/{{
                store.countCustomer
              }}</span
            >
          </span>
        </router-link>
      </div>

      <div
        class="mx-1 report__item"
        :style="data.activeMenu == 0 ? { border: '1px solid blue' } : {}"
      >
        <router-link
          :to="!isReadReportCustomerCycle() ? '#' : '/report_customer_cycle'"
          :class="[data.activeMenu == 0 ? 'active-menu' : 'none-active-menu']"
          class=""
        >
          <span> Khách hàng tới chu kì nhưng chưa chăm sóc </span>
          <span class="pl-3" style="margin-top: -4px">
            <span class="material-symbols-outlined"> group </span>
            <span class="text-center"
              >{{ store.countReportCustomerCycle }}/{{
                store.countCustomer
              }}</span
            >
          </span>
        </router-link>
      </div>

      <div
        class="mx-1 report__item"
        :style="data.activeMenu == 3 ? { border: '1px solid blue' } : {}"
      >
        <router-link
          :to="!isReadReportLeaderCustomer() ? '#' : '/report_leader_customer'"
          :class="[data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']"
          class=""
        >
          <span class=""> Khách hàng do lãnh đạo phụ trách </span>
          <span class="pl-3" style="margin-top: -4px">
            <span class="material-symbols-outlined"> group </span>
            <span class="text-center"
              >{{ store.countLeaderCustomer }}/{{ store.countCustomer }}</span
            >
          </span>
        </router-link>
      </div>
      <div
        class="mx-1 report__item"
        :style="data.activeMenu == 4 ? { border: '1px solid blue' } : {}"
      >
        <router-link
          :to="!isReadReportLeaderStaff() ? '#' : '/report_leader_staff'"
          :class="[data.activeMenu == 4 ? 'active-menu' : 'none-active-menu']"
          class=""
        >
          <span class=""> Nhân viên do lãnh đạo phụ trách </span>
          <span class="pl-3" style="margin-top: -4px">
            <span class="material-symbols-outlined"> group </span>
            <span class="text-center"
              >{{ store.countleaderStaff }}/{{ store.countEmployee }}</span
            >
          </span>
        </router-link>
      </div>
    </div>
    <!-- Filter -->
    <div class="border-hr my-3"></div>
    <!-- Filter -->
    <div class="d-flex flex-column">
      <span class="mx-3 mb-3 h6 size-18">Lọc theo thời gian</span>
      <div class="d-flex mx-3">
        <div class="form-group w-100">
          <!-- entryValue = modelValue -->
          <InputFilter
            @update:entryValue="(value) => (startDateValue = value)"
            :title="`Ngày bắt đầu`"
            :entryValue="`Ngày bắt đầu`"
            style="height: 35px"
          />
        </div>
        <div class="form-group w-100 ml-3">
          <InputFilter
            @update:entryValue="(value) => (endDateValue = value)"
            :title="`Ngày kết thúc`"
            :entryValue="`Ngày kết thúc`"
            style="height: 35px"
          />
        </div>
      </div>
    </div>
    <!-- Search -->
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex justify-content-start">
        <Select
          class="d-flex justify-content-start"
          :options="[
            {
              name: 5,
              value: 5,
            },
            {
              name: 10,
              value: 10,
            },
            {
              name: 20,
              value: 20,
            },
            {
              name: 30,
              value: 30,
            },
          ]"
          style="width: 125px"
          :title="`Số bản ghi`"
          @update:entryValue="handleUpdateEntryValue"
          :entryValue="data.entryValue"
          @refresh="data.entryValue = 'All'"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="(value) => (data.searchText = value)"
          :entryValue="data.searchText"
          @choseSearch="
            async (value) => (
              (data.choseSearch = value), (data.currentPage = 1)
            )
          "
          @refresh="(data.entryValue = 'All'), (data.currentPage = 1)"
          :options="[
            {
              _id: 'name',
              name: 'Tìm kiếm theo tên',
            },
            {
              _id: 'email',
              name: 'Tìm kiếm theo email',
            },
            {
              _id: 'phone',
              name: 'Tìm kiếm theo số điện thoại',
            },
          ]"
        />
      </div>
      <div class="d-flex align-items-start">
        <button
          class="btn btn-warning mx-2"
          data-toggle="modal"
          data-target="#model-form-mail"
          :disabled="isMail() ? false : true"
        >
          <span id="delete-all" class="">Mail</span>
        </button>
        <button
          type="button"
          :disabled="isPrintReport() ? false : true"
          class="btn btn-primary"
          @click="handlePrintReport"
        >
          <span id="add" class="">In</span>
        </button>
      </div>
    </div>

    <Table
      :items="setPages"
      :fields="[
        'Tên khách hàng',
        'Email khách hàng',
        'Số điện thoại khách hàng',
        'Loại khách hàng',
        'Trạng thái chăm sóc',
      ]"
      :labels="[
        'nameCustomer',
        'emailCustomer',
        'phoneCustomer',
        'customerType',
        'statusTask',
      ]"
      @delete="handleDelete"
      @edit="EditEmit"
      :showActionList="[true, false, false]"
      :startRow="data.startRow"
      @view="view"
      :isActiveCheckbox="false"
    />
    <!-- Pagination -->
    <Pagination
      :numberOfPages="data.numberOfPages"
      :totalRow="data.totalRow"
      :startRow="data.startRow"
      :endRow="data.endRow"
      :currentPage="data.currentPage"
      @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3"
    />

    <div class="container pdf-content" ref="pdfContentRef">
      <img
        src="../../../../assets/images/vnpt-logo1.png"
        class="rounded-circle"
        alt="Cinque Terre"
        style="height: 70px"
      />
      <div class="d-flex justify-content-between mt-4">
        <p class="text-center ml-4 font-weight-bold">VNPT Hậu Giang</p>
        <div class="text-center font-weight-bold" style="margin-top: -40px">
          <p>CỘNG HÒA XÃ HỘI CHỦ NGHỈA VIỆT NAM</p>
          <p>Độc lập - Tự do - Hạnh phúc</p>
          <p>-----------------</p>
        </div>
      </div>
      <div class="float-right">
        <p>....ngày....tháng....năm</p>
      </div>
      <div class="text-center mt-4 font-weight-bold">
        <h3 class="font-weight-bold">
          Báo Cáo <br />
          Danh Sách Khách Hàng Do Lãnh Đạo Phụ Trách
        </h3>
      </div>
      <div class="">
        <span>Họ tên: ................................</span>
        <br />
        <span>Chức vụ: .............................</span>
        <br />
        <span>Bộ phận công tác: ............</span>
      </div>
      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th
              v-for="(value, index) in [
                'Stt',
                'Tên',
                'Sdt',
                'Email',
                'Loại',
                'Trạng thái',
              ]"
              :key="index"
            >
              {{ value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data.items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nameCustomer }}</td>
            <td>{{ item.phoneCustomer }}</td>
            <td>{{ item.emailCustomer }}</td>
            <td>{{ item.customerType }}</td>
            <td>{{ item.statusTask }}</td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-around mt-4">
        <p>Phụ trách bộ phận</p>
        <p>Người Báo Cáo</p>
      </div>
    </div>
    <View
      :item="data.viewValue"
      :Events="data.Events"
      :viewCareCus="data.viewCareCus"
    />
    <Mail />
  </div>
</template>

<script>
import { reactive, computed, ref, onBeforeMount, watch } from "vue";
import Table from "../../../../components/table/table-report.vue";
import Mail from "../../mail.vue";

import View from "./view.vue";

import {
  Task,
  http_getAll,
  Pagination,
  Select,
  Search,
  formatDate,
  formatDateTime_2,
  http_getOne,
  Customer,
} from "../../../common/import";
import jsPDF from "jspdf"; //in
import html2canvas from "html2canvas";

import {
  countCustomer,
  countEmployee,
  countElementReportPage,
  countElementReportCustomerCyclePage,
  countElementReportAssignmentStaff,
  countElementReportLeaderCustomer,
  countElementReportLeaderStaff,
} from "../../use/index";

import {
  isReadReport,
  isReadReportLeaderCustomer,
  isReadReportLeaderStaff,
  isReadReportCustomerCycle,
  isReadReportAssinmentStaff,
  isPrintReport,
  isMail,
} from "../../../../use/getSessionItem";

import InputFilter from "../../../../components/form/form_filter_truc.vue";

export default {
  components: {
    Table,
    Pagination,
    Select,
    Search,
    View,
    Mail,
    InputFilter,
  },
  setup() {
    const store = reactive({
      countCustomer: 0,
      countEmployee: 0,
      countReport: 0,
      countReportAssignmentStaff: 0,
      countReportCustomerCycle: 0,
      countLeaderCustomer: 0,
      countleaderStaff: 0,
    });

    const options = [
      {
        name: 5,
        value: 5,
      },
      {
        name: 10,
        value: 10,
      },
      {
        name: 20,
        value: 20,
      },
      {
        name: 30,
        value: 30,
      },
      {
        name: "All",
        value: "All",
      },
    ];

    const data = reactive({
      Events: [],
      items: [],
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 3,
      viewValue: {},
      viewCareCus: [],
    });

    const startDateValue = ref("");
    const endDateValue = ref("");

    const reFresh = async () => {
      store.countCustomer = await countCustomer();
      store.countEmployee = await countEmployee();
      store.countReport = await countElementReportPage();
      store.countReportAssignmentStaff =
        await countElementReportAssignmentStaff();
      store.countReportCustomerCycle =
        await countElementReportCustomerCyclePage();
      store.countLeaderCustomer = await countElementReportLeaderCustomer();
      store.countleaderStaff = await countElementReportLeaderStaff();

      const leaderId = sessionStorage.getItem("employeeId");
      const tasks = await http_getAll(Task);
      const ListTaskId = [];
      tasks.map((task) => {
        ListTaskId.push(task._id);
      });

      const customerArray = [];
      for (const _id of ListTaskId) {
        const rs = await http_getOne(Task, _id);
        customerArray.push(rs);
        // data.items.push(rs);
      }

      data.items = [...customerArray];

      data.items = data.items.filter((item, index, self) => {
        return (
          item.leaderId == leaderId &&
          index ===
            self.findIndex(
              (customer) => customer.Customer._id === item.customerId
            )
        );
      });

      // begin filter
      if (startDateValue.value.length > 0) {
        data.items = data.items.filter((item) => {
          return (
            new Date(item.start_date).getTime() ===
              new Date(startDateValue.value).getTime() ||
            (new Date(item.start_date).getTime() >=
              new Date(startDateValue.value).getTime() &&
              new Date(item.start_date).getTime() <=
                new Date(endDateValue.value).getTime())
          );
        });
      }

      if (endDateValue.value.length > 0) {
        data.items = data.items.filter((item) => {
          return (
            new Date(item.end_date).toLocaleDateString() ===
              new Date(endDateValue.value).toLocaleDateString() ||
            (new Date(item.start_date).getTime() >=
              new Date(startDateValue.value).getTime() &&
              new Date(item.start_date).getTime() <=
                new Date(endDateValue.value).getTime())
          );
        });
      }
      // end filter

      data.items = data.items.map((item) => {
        return {
          nameCustomer: item.Customer.name,
          phoneCustomer: item.Customer.phone,
          emailCustomer: item.Customer.email,
          customerType: item.Customer.Customer_Type.name,
          statusTask: item.Status_Task.name,
          ...item,
        };
      });
    };

    watch(startDateValue, (newValue, oldValue) => {
      if (newValue != "") {
        data.currentPage = 1;
        reFresh();
      } else {
        data.currentPage = 1;
        reFresh();
      }
    });

    watch(endDateValue, (newValue, oldValue) => {
      if (newValue != "") {
        data.currentPage = 1;
        reFresh();
      } else {
        data.currentPage = 1;
        reFresh();
      }
    });

    onBeforeMount(async () => {
      await reFresh();
    });

    // computed
    const toString = computed(() => {
      if (data.choseSearch == "name") {
        return data.items.map((value, index) => {
          return [value.nameCustomer].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "email") {
        return data.items.map((value, index) => {
          return [value.emailCustomer].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "phone") {
        return data.items.map((value, index) => {
          return [value.phoneCustomer].join("").toLocaleLowerCase();
        });
      } else {
        return data.items.map((value, index) => {
          return [value.nameCustomer, value.emailCustomer, value.phoneCustomer]
            .join("")
            .toLocaleLowerCase();
        });
      }
    });
    const filter = computed(() => {
      return data.items.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.items.length;
        return data.items;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.entryValue);
    });
    const setPages = computed(() => {
      if (data.items.length > 0) {
        if (setNumberOfPages.value == 0 || data.entryValue == "All") {
          data.entryValue = data.items.length;
          data.numberOfPages = 1;
        } else data.numberOfPages = setNumberOfPages.value;
        data.startRow = (data.currentPage - 1) * data.entryValue + 1;

        data.endRow = data.currentPage * data.entryValue;
        return filtered.value.filter((item, index) => {
          return (
            index + 1 > (data.currentPage - 1) * data.entryValue &&
            index + 1 <= data.currentPage * data.entryValue
          );
        });
      } else return data.items.value;
    });

    // methods

    const handleUpdateSearchText = (value) => {
      data.searchText = value;
    };

    const pdfContentRef = ref(null);
    const handlePrintReport = () => {
      const printContent = pdfContentRef.value;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContent.innerHTML;
      window.print();

      document.body.innerHTML = originalContents;
    };

    const view = async (item) => {
      console.log("View", item.Customer.gender);

      const res = await http_getOne(Customer, item.Customer._id);
      // console.log('Res', res);
      data.viewCareCus = res.documents.Tasks.map((value) => {
        return {
          name: item.Customer.name,
          start_date: formatDate(value.start_date),
          end_date: formatDate(value.end_date),
          content: value.content,
          cycle: value.Cycle.name,
          statusTask: value.Status_Task.name,
          star: value.Evaluate.star,
          comment: value.Comment.content,
        };
      });

      data.viewValue = {
        Customer: {
          customerType: item.Customer.Customer_Type.name,
          nameCustomer: item.Customer.name,
          phoneCustomer: item.Customer.phone,
          emailCustomer: item.Customer.email,
          gender: item.Customer.gender,
          birthdayCustomer: formatDate(item.Customer.birthday),
          avatarCustomer: item.Customer.avatar,
          addressCustomer: item.Customer.address,
        },
        Customer_Work: {
          position: item.Customer.Customer_Works[0].current_position,
          work_place: item.Customer.Customer_Works[0].current_workplace,
          work_history: item.Customer.Customer_Works[0].work_history,
          work_temp: item.Customer.Customer_Works[0].work_temp,
          companyKH: item.Customer.Customer_Works[0].Company_KH.name,
        },
        Events: [...item.Customer.Events],
        Habits: [...item.Customer.Habits],

        ...item,
      };

      data.Events = item.Customer.Events.map((item) => {
        return {
          name: item.name,
          time_duration: formatDateTime_2(item.time_duration),
          content: item.content,
          place: item.place != null ? item.place : "không có",
        };
      });
    };

    return {
      options,
      data,
      setPages,
      handleUpdateSearchText,
      handlePrintReport,
      pdfContentRef,
      view,
      store,
      isReadReport,
      isReadReportLeaderCustomer,
      isReadReportLeaderStaff,
      isReadReportCustomerCycle,
      isReadReportAssinmentStaff,
      isPrintReport,
      isMail,
      //
      startDateValue,
      endDateValue,
    };
  },
};
</script>

<style scoped>
.pdf-content {
  position: absolute;
  left: -9999px;
  top: -9999px;
}

.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}

.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}

.active-menu {
  color: blue;
}

.none-active-menu {
  color: var(--dark);
}

.border-hr {
  border-top: 1px solid var(--gray);
}

#add,
#delete-all {
  font-size: 14px;
}

.report_container {
  display: flex;
  justify-content: space-between;
  margin: 10px 4px;
}

.mx-1.report__item {
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
}

a.none-active-menu,
a.router-link-active.router-link-exact-active.active-menu {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 5px;
  text-decoration: none;
}

a.router-link-active.router-link-exact-active.active-menu {
  font-weight: bold;
}

a.router-link-active.router-link-exact-active.active-menu
  span.material-symbols-outlined {
  color: blue;
}

span.material-symbols-outlined {
  padding: 5px;
  font-size: 24px;
  color: #000;
}
</style>
