<script>
import { reactive, onBeforeMount, watch, ref, computed } from "vue";
import StatusTask from "../../services/status_task.service";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Cycle from "../../services/cycle.service";
import Swal from "sweetalert2";
import { formatDateTime, formatDate } from "../../assets/js/common.js";
import {
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
} from "../../assets/js/common.http";
import {
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
} from "../../assets/js/common.alert";
export default {
  components: {
    Select_Advanced,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    cycles: {
      type: Object,
      default: {},
    },
    cus: {
      type: Object,
      default: {},
    },
    resetData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    watch(
      () => props.resetData,
      async (newValue, oldValue) => {
        await refresh();
      },
      { immediate: true }
      //có props
    );
    const data = reactive({
      renewValue: {
        _id: "",
        start_date: "",
        end_date: "",
        content: "",
        note: "",
        customerId: "",
        cycleId: "",
        Cycle: {
          _id: "",
          name: "",
        },
        leaderId: "",
        Status_Task: {
          _id: "",
          name: "",
        },
      },
    });

    const cycles = reactive({ cycle: [] });
    let selectedOptionCycle = ref("0");
    watch(selectedOptionCycle, async (newValue, oldValue) => {
      // Alert add center
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: cycleName } = await Swal.fire({
            title: "Thêm chu kỳ mới",
            input: "text",
            inputLabel: "Tên chu kỳ",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên chu kỳ không được bỏ trống";
              }
            },
          });

          if (cycleName) {
            const res = await http_create(Cycle, { name: cycleName });
            if (res.error) {
              alert_warning(`Đã tồn tại chu kỳ `, `${cycleName}`);
              return false;
            }
            alert_success(`Đã thêm chu kỳ`, `${cycleName}`);
            props.item.Cycle.name = res.document.name;
            await refresh();
            ctx.emit("newCycle", cycles.cycle);
            selectedOptionCycle.value = res.document._id;
          }
          return true;
        };
        showSweetAlert();
        selectedOptionCycle.value = 0;
      }
      props.item.cycleId = selectedOptionCycle.value;
    });

    const deleteCycle = async (_id) => {
      const cycle = await http_getOne(Cycle, _id);
      const isConfirmed = await alert_delete(
        `Xoá chu kỳ`,
        `Bạn có chắc chắn muốn xoá chu kỳ ${cycle.name} không ?`
      );
      if (isConfirmed == true) {
        const result = await http_deleteOne(Cycle, _id);
        alert_success(
          `Xoá chu kỳ`,
          `Bạn đã xoá thành công chu kỳ ${cycle.name} .`
        );
        refresh();
      }
    };
    const searchCycle = async (value) => {
      await refresh();
      cycles.cycle = cycles.cycle.filter((value1, index) => {
        return value1.name.includes(value) || value.length == 0;
      });
    };

    const refresh = async () => {
      cycles.cycle = await http_getAll(Cycle);
      cycles.cycle.push({
        _id: "other",
        name: "khác",
      });
      // data.cycleSelect = [...rs];
    };

    onBeforeMount(() => {
      refresh();
    });
    const create = () => {
      ctx.emit("initRenewTask", props.item);
    };

    const _formatDate = (value) => {
      return value;
    };

    const showInfo = ref(false);

    watch(
      () => props.item,
      (newValue) => {
        if (newValue) {
          showInfo.value = true;
        }
      },
      { immediate: true }
    );

    return {
      data,
      selectedOptionCycle,
      deleteCycle,
      cycles,
      searchCycle,
      create,
      _formatDate,
      showInfo,
    };
  },
};
</script>
<template>
  <!-- The Modal -->
  <!-- The Modal -->
  <div class="modal" id="model-renew">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Tạo mới phân công theo chu kỳ chăm sóc
          </h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div class="modal-header" v-if="showInfo == true">
          <div class="d-flex flex-column w-100">
            <!-- <h4 class="modal-title" style="font-size: 15px">
              Thông tin phân công chăm sóc khách hàng cũ nhất
            </h4> -->
            <div class="d-flex justify-content-between w-100">
              <div class="d-flex flex-column w-100">
                <div class="d-flex w-100">
                  <div class="form-group w-100 mr-3">
                    <label for="name">Tên khách hàng:</label>
                    <input
                      disabled
                      id=""
                      class="form-control w-100"
                      required
                      v-model="item.Customer.name"
                    />
                  </div>

                  <div class="form-group w-100">
                    <label for="name">Số điện thoại:</label>
                    <input
                      disabled
                      id=""
                      class="form-control w-100"
                      required
                      v-model="item.Customer.phone"
                    />
                  </div>
                </div>

                <div class="d-flex w-100">
                  <div class="form-group w-100 mr-3">
                    <label for="name">Email:</label>
                    <input
                      disabled
                      id=""
                      class="form-control w-100"
                      required
                      v-model="item.Customer.email"
                    />
                  </div>

                  <div class="form-group w-100">
                    <label for="name"
                      >Chu kì chăm sóc khách hàng(<span style="color: red"
                        >*</span
                      >):</label
                    >
                    <input
                      disabled
                      id=""
                      class="form-control w-100"
                      required
                      v-model="item.Cycle.name"
                    />
                  </div>
                </div>

                <div class="d-flex w-100">
                  <div class="form-group w-100 mr-3">
                    <label for="name">Ngày bắt đầu:</label>
                    <input
                      disabled
                      id=""
                      class="form-control w-100"
                      required
                      v-model="item.start_date_format"
                    />
                  </div>

                  <div class="form-group w-100">
                    <label for="name">Ngày kết thúc:</label>
                    <input
                      disabled
                      id=""
                      class="form-control w-100"
                      required
                      v-model="item.end_date_format"
                    />
                  </div>
                </div>
                <div class="d-flex w-100">
                  <div class="form-group w-100">
                    <label for="name">Nội dung chăm sóc</label>
                    <textarea
                      disabled
                      id=""
                      class="form-control w-100"
                      required
                      v-model="item.content"
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column">
                <div class="">
                  <!-- <span
                    ><span style="font-weight: 900">Ngày bắt đầu</span>:
                    {{ item.start_date }}</span
                  > -->
                </div>
                <span class="my-2">
                  <!-- <span
                    ><span style="font-weight: 900">Ngày kết thúc</span>:
                    {{ item.end_date }}</span
                  > -->
                </span>
                <div class="">
                  <!-- <span
                    ><span style="font-weight: 900">Chu kỳ</span>:
                    {{ item.Cycle.name }}</span
                  > -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form class="was-validated">
            <div class="form-group">
              <label for="name"
                >Khách hàng(<span style="color: red">*</span>):</label
              >
              <input
                disabled
                id=""
                class="form-control"
                required
                v-model="item.Customer.name"
              />
            </div>
            <div class="form-group">
              <label for="name"
                >Ngày bắt đầu(<span style="color: red">*</span>):</label
              >
              <input
                type="date"
                class="form-control"
                id=""
                v-model="item.start_date_new"
                required
              />
            </div>

            <div class="form-group">
              <label for="name"
                >Ngày kết thúc(<span style="color: red">*</span>):</label
              >
              <input
                type="date"
                class="form-control"
                id=""
                v-model="item.end_date_new"
                required
              />
            </div>

            <div class="form-group">
              <label for="content"
                >Chu kỳ(<span style="color: red">*</span>):</label
              >
              <Select_Advanced
                style="height: 40px"
                required
                :options="cycles.cycle"
                :modelValue="item.Cycle.name"
                @searchSelect="(value) => searchCycle(value)"
                @delete="(value) => deleteCycle(value._id)"
                @chose="
                  (value, value1) => (
                    (selectedOptionCycle = value),
                    (item.Cycle.name = value1.name)
                  )
                "
              />
            </div>

            <div class="form-group">
              <label for="content"
                >Nội dung chăm sóc(<span style="color: red">*</span>):</label
              >
              <textarea
                class="form-control"
                v-model="item.content"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="content">Chú thích:</label>
              <textarea
                v-model="item.note"
                id="content"
                class="form-control w-100"
                rows="5"
              ></textarea>
            </div>
            <button
              type="button"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
              @click="create"
              id="create"
              data-dismiss="modal"
            >
              <span>Thêm</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.step-id {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}
.step-content {
  border-left: 1px solid var(--gray);
}
input {
  width: 100%;
}
.active-step {
  color: blue;
}
.btn-next {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-next:hover {
  background-color: green;
  color: white;
}

.btn-prev {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-prev:hover {
  background-color: red;
  color: white;
}
</style>
