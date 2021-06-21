<template>
  <div class="pa-2">
    {{ recordDetail }}
    <v-tabs
        v-model="tab"
        align-with-title
    >
      <v-tabs-slider color="#ff9900"></v-tabs-slider>
      <v-tab
          v-for="item in items"
          :key="item.title"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
          v-for="item in items"
          :key="item.title"
      >
        <v-card flat>
          <component :is="item.content"/>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import AllLog from './DataVisualization/AllLog';

export default {
  namespace: "RecordDetail",
  components: {
    AllLog,
  },
  data() {
    return {
      recordDetail: {},

      tab: null,
      items: [
        {
          title: 'All Logs',
          content: 'AllLog',
        },
      ],
    };
  },
  computed: {},
  methods: {
    ...mapActions(['getVisOneData']),
  },
  async created() {
    if (this.$route.query) {
      this.recordDetail = this.$route.query.recordDetail
      const {visOneData} = this.recordDetail;

      await this.getVisOneData(visOneData).catch(console.error);
    }
  }
};
</script>

<style scoped>
</style>
