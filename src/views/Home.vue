<template>
  <div class="home">
    <BasicInfo msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicInfo from '@/components/BasicInfo.vue'

export default {
  name: 'Home',
  components: {
    BasicInfo
  }
}
</script>
