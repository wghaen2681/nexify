<template>
  <div class="[ basicInfo ] [ w-75 mx-auto px-5 pt-5 pb-4 rounded-lg bg-white shadow-sm ]">
    <b-container class="buttons_action">
      <b-row>
        <b-col class="pl-0 text-left">
          <b-button variant="primary shadow-sm" @click="add_data()">Add</b-button>
        </b-col>
        <b-col>
          <b-button variant="success shadow-s" @click="save_data()">Save</b-button>
        </b-col>
        <b-col class="pr-0 text-right">
          <b-button variant="danger shadow-s" @click="get_data()">Update</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-table class="mt-4 pb-4 text-left" responsive :fields="table_fields" :items="data_basicInfo">
      <template #cell(name)="data"> <!-- #head 代表想要編輯 head 的內容 (name) 代表想要設定的是 name 資料欄位的內容 -->
        <input class="pl-2" style="height: 37px;" v-model="data.item.Name">
      </template>
      <template #cell(DateOfBirth)="data">
        <b-form-datepicker class="h-100 border-secondary" style="min-width: max-content;" v-model="data.item.DateOfBirth"></b-form-datepicker>
      </template>
      <template #cell(Salary)="data">
        <progress :value="data.item.Salary" :max="table_salary.max"></progress>
      </template>
      <template #cell(address)="data">
        <input class="pl-2" style="height: 37px;" v-model="data.item.Address">
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      table_fields: [
        {
          key: 'Name',
          thClass: 'border-top-0 border-bottom'
        },
        {
          key: 'DateOfBirth',
          label: 'Birthday',
          thClass: 'border-top-0 border-bottom'
        },
        {
          key: 'Salary',
          thClass: 'border-top-0 border-bottom'
        },
        {
          key: 'Address',
          thClass: 'border-top-0 border-bottom'
        }
      ],
      data_basicInfo: [],
      table_salary: {
        salary: 0,
        max: null
      },
      data_add: {
        display: false,
        name: '',
        dateofbirth: '',
        salary: null,
        address: ''
      }
    }
  },
  methods: {
    add_data: function () {
      if (this.add_data.display) return

      this.data_basicInfo.push({
        Name: '',
        DateOfBirth: '2022-04-03T00:00:00',
        Salary: '77085',
        Address: ''
      })
      this.data_add.display = true
    },
    save_data: function () {
      try {
        this.$axios
          .post('http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords', this.data_basicInfo)
          .then(() => {
            this.get_data()
          })
          .catch(error => {
            console.log(error)
          })
      } catch (error) {
        console.log('儲存資料發生錯誤', error)
      }
    },
    get_data: async function () {
      try {
        const { data } = await this.$axios.get('http://nexifytw.mynetgear.com:45000/api/Record/GetRecords')

        this.data_basicInfo = data.Data
        this.data_add.display = false

        // console.log(this.data_basicInfo)
        this.table_salary.max = Math.max(...this.data_basicInfo.map(item => item.Salary))
        console.log(this.table_salary.max)
      } catch (error) {
        console.log('取得資料發生錯誤', error)
      }
    }
  },
  async mounted () {
    this.get_data()
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
