<template>
  <div class="[ basicInfo ] [ w-75 mx-auto px-5 pt-5 pb-4 rounded-lg bg-white shadow-sm ]">
    <b-container>
      <b-row>
        <b-col class="pl-0 text-left">
          <b-button variant="primary shadow-sm" @click="add_data()">Add</b-button>
        </b-col>
        <b-col>
          <b-button variant="success shadow-sm" @click="save_data()">Save</b-button>
        </b-col>
        <b-col class="pr-0 text-right">
          <b-button variant="danger shadow-sm" @click="get_data()">Update</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-table class="[ mt-4 pb-4 text-left ]" responsive :fields="table_fields" :items="data_basicInfo">
      <template #cell(name)="data"> <!-- #head 代表想要編輯 head 的內容 (name) 代表想要設定的是 name 資料欄位的內容 -->
        <input class="[ pl-2 ]" style="height: 37px;" v-model="data.item.Name">
      </template>
      <template #cell(DateOfBirth)="data">
        <b-form-datepicker class="[ b-datepicker ] [ h-100 border-secondary ]" dropup v-model="data.item.DateOfBirth"></b-form-datepicker>
      </template>
      <template #cell(Salary)="data">
        <div class="[ progress_container ]">
          <b-progress :value="data.item.Salary" :max="table_salary.max"></b-progress>
          <div class="[ progress_controller ]" :key="data.index" :style="'left: ' + (data.item.Salary / table_salary.max * 100) + '%'"></div>
        </div>
      </template>
      <template #cell(address)="data">
        <input class="[ b-address ] [ pl-2 ]" v-model="data.item.Address">
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
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
      table_add: {
        name: '',
        dateofbirth: '',
        salary: null,
        address: ''
      }
    }
  },
  methods: {
    get_data: function () {
      this.axios
        .get('http://nexifytw.mynetgear.com:45000/api/Record/GetRecords')
        .then(function (data) {
          this.data_basicInfo = data.data.Data
          this.table_salary.max = Math.max(...this.data_basicInfo.map(item => item.Salary))
          this.drag_salary()
        }.bind(this))
        .catch(error => {
          console.log('取得資料發生錯誤', error)
        })

      this.height_table()
    },
    height_table: function () {
      const row = this.$('[role="row"]')

      row.children('td').css('padding-bottom', 20)

      setTimeout(function () {
        const bTable = this.$('.b-table')
        const heightBtable = parseInt(bTable.css('height'))
        const adjustHeightTable = 450 - heightBtable
        const lastRow = this.$('[role="row"]').last()

        if (heightBtable >= 450) return

        lastRow.children('td').css('padding-bottom', adjustHeightTable)
      }.bind(this), 200)
    },
    drag_salary: function () {
      const $this = this

      setTimeout(function () {
        $this.$('.progress_controller').draggable({
          axis: 'x',
          drag: function () {
            const index = Array.prototype.indexOf.call(this.closest('tr').parentNode.childNodes, this.closest('tr'))

            switch (true) {
              case (this.offsetLeft >= 160):
                $this.change_salary(index, 160)
                break
              case (this.offsetLeft >= 0):
                $this.change_salary(index, this.offsetLeft)
                break
              case (this.offsetLeft < 0):
                $this.change_salary(index, 0)
                break
            }
          },
          stop: function () {
            switch (true) {
              case (this.offsetLeft >= 160):
                this.style.left = '160px'
                break
              case (this.offsetLeft < 0):
                this.style.left = 0
                break
            }
          }
        })
      }, 500)
    },
    add_data: function () {
      this.data_basicInfo.push({
        Name: '',
        DateOfBirth: '',
        Salary: 0,
        Address: ''
      })
      this.height_table()
      this.drag_salary()
    },
    save_data: function () {
      var strAll = '' // 設定紀錄錯誤訊息的文字變數

      this.data_basicInfo.forEach(el => {
        const strName = (el.Name.length === 0) ? 'Name, ' : ''
        const strDateOfBirth = (el.DateOfBirth.length === 0) ? 'Birthday, ' : ''
        const strSalary = (el.Salary.length === 0) ? 'Salary, ' : ''
        const strAddress = (el.Address.length === 0) ? 'Address ' : ''

        if (!strName && !strDateOfBirth && !strSalary && !strAddress) return // 如果都沒有錯誤資料的話，就 return 出 function

        strAll = strName + strDateOfBirth + strSalary + strAddress
      })

      if (strAll) {
        alert(`Error:

The are data without assigning information about ${strAll} please assign them first before saving.`)
      } else {
        this.axios
          .post('http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords', this.data_basicInfo)
          .then(() => {
            this.get_data()
            this.drag_salary()
          })
          .catch(error => {
            console.log('儲存資料發生錯誤', error)
          })
      }
    },
    change_salary: function (index, data) {
      const alteration = Math.round(data / 160 * this.table_salary.max)

      this.data_basicInfo[index - 1].Salary = alteration
    }
  },
  mounted () {
    this.get_data()
    this.drag_salary()
  }
}
</script>

<style>
.b-table {
  padding-bottom: 500px;
}

.b-datepicker {
  min-width: max-content;
}

.progress_container {
  position: relative;
  width: 160px;
}

.progress {
  width: 100%;
  height: 8px;
  border: 1px solid #ccc;
}

.progress_controller {
  position: absolute;
  top: calc(50% - 15px / 2);
  transform: translateX(-50%);
  width: 15px;
  aspect-ratio: 1/1;
  background: #007bff;
  border-radius: 50%;
}

.progress-bar {
  transition: width 0s !important;
}

[role="row"] td {
  vertical-align: middle;
  padding: 20px 45px 20px 10px;
}

.b-address {
  height: 37px;
}
</style>
