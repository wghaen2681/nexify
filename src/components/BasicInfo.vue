<template>
  <div class="[ basicInfo ] [ w-75 mx-auto p-5 rounded-lg bg-white shadow-sm ]">
    <b-container class="buttons_action">
      <b-row>
        <b-col>
          <b-button variant="primary shadow-sm">Add</b-button>
        </b-col>
        <b-col>
          <b-button variant="success shadow-s">Save</b-button>
        </b-col>
        <b-col>
          <b-button variant="danger shadow-s">Update</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-table class="mt-4" hover :items="items"></b-table>
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
      items: [
        { Name: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { Name: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { Name: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { Name: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
  // mounted () {
    
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
