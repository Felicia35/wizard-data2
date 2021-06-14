<template>
  <div>{{ behaviorMoleDatas }}</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MoleLog",
  props: {
    // value: Type
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(['behaviorMoleDatas', 'moleDatas', 'editorDatas', 'eyeDatas']),
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>
