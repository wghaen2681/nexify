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
    <b-table class="[ b-table ] mt-4 pb-4 text-left" responsive style="overflow-y: visible !important;" :fields="table_fields" :items="data_basicInfo">
      <template #cell(name)="data"> <!-- #head 代表想要編輯 head 的內容 (name) 代表想要設定的是 name 資料欄位的內容 -->
        <input class="pl-2" style="height: 37px;" v-model="data.item.Name">
      </template>
      <template #cell(DateOfBirth)="data">
        <b-form-datepicker class="h-100 border-secondary" dropup style="min-width: max-content;" v-model="data.item.DateOfBirth"></b-form-datepicker>
      </template>
      <template #cell(Salary)="data">
        <div class="progress_container">
          <!-- {{ data.item.Salary / table_salary.max * 100 }} -->
          <b-progress :value="data.item.Salary" :max="table_salary.max"></b-progress>
          <div class="progress_controller" :key="data.index" :style="'left: ' + (data.item.Salary / table_salary.max * 100) + '%'"></div>
        </div>
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
      this.drag_salary()
    },
    save_data: function () {
      this.axios
        .post('http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords', this.data_basicInfo)
        .then(() => {
          this.get_data()
          this.drag_salary()
        })
        .catch(error => {
          console.log('儲存資料發生錯誤', error)
        })
    },
    get_data: function () {
      this.axios
        .get('http://nexifytw.mynetgear.com:45000/api/Record/GetRecords')
        .then(function (data) {
          this.data_basicInfo = data.data.Data
          this.data_add.display = false
          this.table_salary.max = Math.max(...this.data_basicInfo.map(item => item.Salary))
          this.drag_salary()
        }.bind(this))
        .catch(error => {
          console.log('取得資料發生錯誤', error)
        })
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
            console.log(this.offsetLeft)
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

        // console.log(progressController[0].draggable())

        // progressController.forEach(el => {
        //   el.draggable({
        //     axis: 'x', // 限制拖曳僅在 x 軸上
        //     // create: function () {},
        //     // start: function () {},
        //     // drag: function () {},
        //     stop: function () {
        //       const posBasicInfo = el.position().left

        //       switch (true) {
        //         case (posBasicInfo >= 90):
        //           Element.css({ left: 90 })
        //           break
        //         case (posBasicInfo < (-40)):
        //           el.css({ left: -40 })
        //           break
        //       }
        //     }
        //   })
        // })
      }, 500)

      // progressController.draggable({
      //   axis: 'x', // 限制拖曳僅在 x 軸上
      //   // create: function () {},
      //   // start: function () {},
      //   // drag: function () {},
      //   stop: function () {
      //     const posBasicInfo = progressController.position().left

      //     switch (true) {
      //       case (posBasicInfo >= 90):
      //         progressController.css({ left: 90 })
      //         break
      //       case (posBasicInfo < (-40)):
      //         progressController.css({ left: -40 })
      //         break
      //     }
      //   }
      // })
    },
    change_salary: function (index, data) {
      // console.log(index, data)
      const alteration = Math.round(data / 160 * this.table_salary.max)
      // console.log(alteration)
      this.data_basicInfo[index - 1].Salary = alteration
      // console.log(this.data_basicInfo[index - 1].Salary )
    }
  },
  created () {
    this.get_data()
  },
  mounted () {
    this.drag_salary()
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
j
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

.b-table {
  min-height: 450px;
}

.progress_container {
  position: relative;
}

.progress {
  width: 160px;
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
</style>
