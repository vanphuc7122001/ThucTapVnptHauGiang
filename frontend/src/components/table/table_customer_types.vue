<script>
import { reactive, ref } from "vue";
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: ["Name", "Age", "Payment"],
    },
    labels: {
      type: Array,
      default: [],
    },
    actionList: {
      type: Array,
      default: [],
    },
    activeAction: {
      type: Boolean,
      default: true,
    },
    borderTableAll: {
      type: Boolean,
      default: false,
    },
    showActionList: {
      type: Array,
      default: [true, true, true],
    },
    startRow: {
      type: Number,
      default: 1,
    },
    isActiveCheckbox: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, ntx) {

  },
};
</script>

<template>
<div>
  <table
    class="my-table mb-2"
    :class="[borderTableAll ? 'border-table-all' : '']"
  >
    <thead>
      <tr >
        <th class="size-16" v-if="isActiveCheckbox"></th>
        <th class="size-16" >Stt</th>
        <th class="size-16" v-for="(value, index) in fields" :key="index">{{ value }}</th>
        <th class="size-16" v-if="activeAction == true">Hành động</th>
      </tr>
    </thead>
    <tbody>
      <!-- {{ startRow }} -->
      <tr v-for="(item, index) in items" :key="index">
        <td class="size-16" v-if="isActiveCheckbox" ><input type="checkbox" v-model="item.checked" name="" id="" /></td>
        <td class="size-16" >{{ startRow + Math.ceil(index)}}</td>
        <td class="size-16" v-for="(label, index1) in labels" :key="index1">{{ item[label] }}</td>
        <td class="size-16" v-if="activeAction == true">
          <button
            v-if="showActionList[0] == true"
            type="button"
            class="format-btn"
            data-toggle="modal"
            data-target="#model-view"
          >
            <span
              id="view"
              class="material-symbols-outlined d-flex align-items-center"
              @click="$emit('view', item)"
            >
              visibility
            </span>
          </button>
          <button
            v-if="showActionList[1] == true"
            type="button"
            class="mx-2 format-btn"
            data-toggle="modal"
            data-target="#model-edit"
          >
            <span
              id="edit"
              class="material-symbols-outlined d-flex align-items-center justify-content-center"
              @click="$emit('edit', item, true)"
            >
              edit
            </span>
          </button>
          <span
            v-if="showActionList[2] == true"
            id="delete"
            class="material-symbols-outlined format-btn"
            @click="$emit('delete', item._id, item)"
          >
            delete
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-if="items.length == 0" class="text-center mt-2">
    Không tồn tại bản ghi.
  </p>
</div>
</template>

<style scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;
}

.border-table-all {
  border: 1px solid var(--gray);
}

.my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
}

.my-table th {
  font-weight: 900;
  font-size: 14px;
}

.my-table tbody tr:nth-child(even) {
  font-size: 13px;
}

#view,
#edit,
#delete {
  font-size: 18px;
  cursor: pointer;
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1px;
}
#view:hover {
  color: var(--blue);
}
#edit:hover {
  color: var(--yellow);
}
#delete:hover {
  color: var(--red);
}
</style>