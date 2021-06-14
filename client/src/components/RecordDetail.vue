<template>
  <v-container>
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
          <v-card-text>
            <component :is="item.content" :key="value" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import MoleLog from './DataVisualization/MoleLog';

export default {
  namespace: "RecordDetail",
  components: {
    MoleLog,
  },
  data() {
    return {
      recordDetail: {},

      tab: null,
      items: [
        {
          title: 'Mole Logs',
          content: 'MoleLog',
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    ...mapActions(['getEyeData', 'getEditorData', 'getBehaviorData', 'getMoleData']),
  },
  async created() {
    if (this.$route.query) {
      this.recordDetail = this.$route.query.recordDetail
      const { eyeData, moleData, behaviorData, editorData} = this.recordDetail;

      await this.getEyeData(eyeData).catch(console.error);
      await this.getEditorData(editorData).catch(console.error);
      await this.getBehaviorData(behaviorData).catch(console.error);
      await this.getMoleData(moleData).catch(console.error);
    }
  }
};
</script>

<style scoped>
</style>
