<template>
  <b-card title="Custom Table">
    <b-table
      hover
      :items="items"
      :fields="fields"
      selectable
      select-mode="multi"
    >
      <template #cell(action)="row">
        <div style="display: flex">
          <div class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>
          <div class="glyph-icon simple-icon-pencil mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>
          <div class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>
        </div>
      </template>
      <template #cell(status)="row">
        <b-badge pill variant="primary">Pending</b-badge>
      </template>
      <template #cell(selection)="{ rowSelected }">
        <template v-if="rowSelected">
          <div class="glyph-icon simple-icon-check"></div>
        </template>
        <template v-else>
<!--          <div class="glyph-icon simple-icon-user"></div>-->
        </template>
      </template>
    </b-table>
  </b-card>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      fields: [
        {
          key: 'selection',
          label: '',
          // tdClass: 'selectColumn'
        },
        {
          key: 'customer',
          label: 'Customer',
          tdClass: 'firstColumn'
        },
        {
          key: 'vendor',
          label: 'Vendor',
          tdClass: 'text-muted'
        },
        {
          key: 'payment_type',
          label: 'Payment Type',
          tdClass: 'text-muted'
        },
        {
          key: 'price',
          label: 'Order Price',
          tdClass: 'text-muted'
        },
        {
          key: 'time',
          label: 'Order Time',
          tdClass: 'text-muted'
        },
        {
          key: 'delivery',
          label: 'Delivery time',
          tdClass: 'text-muted'
        },
        {
          key: 'status',
          label: 'Status',
          // tdClass: 'secondColumn'
        },
        {
          key: 'action',
          label: 'Action',
          // tdClass: 'thirdRow'
        }
      ],
      items: [
        { customer: 'Dickerson', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 21, last_name: 'Macdonald' },
        { customer: 'Larsen', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 26, last_name: 'Shaw' },
        { customer: 'Geneva', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 15, last_name: 'Wilson',},
        { customer: 'Thor', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 49, last_name: 'MacDonald',},
        { customer: 'Dick', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 53, last_name: 'Dunlap' },
        { customer: 'Dickerson', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 21, last_name: 'Macdonald' },
        { customer: 'Larsen', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 26, last_name: 'Shaw' },
        { customer: 'Geneva', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 15, last_name: 'Wilson',},
        { customer: 'Thor', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 49, last_name: 'MacDonald',},
        { customer: 'Dick', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 53, last_name: 'Dunlap' }
      ]
    }
  }
}
</script>

<style>
.selectColumn {
  width: 2%;
}
.firstColumn {
  width: 20%;
}
.secondColumn {
  width: 25%;
}
.thirdRow {
  width: 15%;
}
.thirdRow {
  width: 8%;
}
</style>
