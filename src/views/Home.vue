<template>
  <div class="home">
    <BasicInfo/>
  </div>
</template>

<script>
import BasicInfo from '@/components/BasicInfo.vue'

export default {
  name: 'Home',
  components: {
    BasicInfo
  }
}
</script>

<style scope>
.home {
  padding-top: calc(4vw + 45px);
}
</style>
