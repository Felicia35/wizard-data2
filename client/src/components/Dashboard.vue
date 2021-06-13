<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row class="mt-5">
      <v-card
        class="add-card"
        elevation-5
        @click="createDialog = !createDialog"
      >
        <v-card-title>
          <v-icon x-large>mdi-book-plus-multiple-outline</v-icon>
        </v-card-title>
      </v-card>
    </v-row>

    <v-row class="mt-2" v-if="recordData">
      <v-col sm=12 md=6 lg=4 v-for="record in recordData" :key="record.recordName">
        <v-card elevation-5>
        <v-card-title>
          {{record.recordName}}
        </v-card-title>
        <v-card-text>
          {{record.recordCreator}}
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
    

    <v-dialog
      v-model="createDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-card-title>
          <v-toolbar flat color="deep-purple accent-5">
            <v-btn icon @click="createDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Create Recrods</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn text @click="createRecord">
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-form v-model="valid">
              <v-row class="pa-3">
                <v-col cols="5">
                  <v-text-field
                    v-model="recordName"
                    :rules="nameRules"
                    :counter="20"
                    label="Record name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="5">
                  <v-text-field
                    v-model="creator"
                    :rules="nameRules"
                    :counter="20"
                    label="Creator name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  {{ nowTime }}
                </v-col>
              </v-row>
            </v-form>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>Upload CSV 🧾</v-subheader>
            <v-row>
              <v-col cols="3">
                <v-file-input
                  @change="inputFile($event, 'eyeData')"
                  accept="text/csv"
                  show-size
                  label="Eyetracker data"
                ></v-file-input>
              </v-col>
              <v-col cols="3">
                <v-file-input
                  @change="inputFile($event, 'moleData')"
                  show-size
                  label="Mole data"
                ></v-file-input>
              </v-col>
              <v-col cols="3">
                <v-file-input
                  @change="inputFile($event, 'editorData')"
                  show-size
                  label="Editor data"
                ></v-file-input>
              </v-col>
              <v-col cols="3">
                <v-file-input
                  @change="inputFile($event, 'behaviorData')"
                  show-size
                  label="Behavior data"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import csvParser from "csv-parse";
import {mapGetters} from "vuex";

export default {
  namespace: "Dashboard",
  components: {},
  data() {
    return {
      createDialog: false,

      eyeData: {},
      moleData: {},
      editorData: {},
      behaviorData: {},

      valid: false,
      recordName: "",
      creator: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 20 || "Name must be less than 20 characters",
      ],

      createInfo: {},
    };
  },
  computed: {
    ...mapGetters(['recordData']),
    nowTime() {
      return this.$moment().format("YYYY-MM-DD HH:mm:ss");
    },
  },
  methods: {
    async createRecord() {
      console.log(this.eyeCSV);

      this.createInfo = {
        recordName: this.recordName,
        recordCreator: this.creator,
        eyeData: this.eyeData,
        moleData: this.moleData,
        editorData: this.editorData,
        behaviorData: this.behaviorData,
        createdAt: this.$moment().unix(),
      };
      console.log("CI", this.createInfo);

      this.$store
        .dispatch("createRecordData", this.createInfo)
        .then((res) => console.log("RES", res));
    },
    async inputFile(e, name) {
      if (e) {
        const fr = new FileReader();

        fr.onload = f => {
          csvParser(f.target.result, { delimiter: "," }, (err, data) => {
            if (err) console.log(err);
            else {
              this[name].name = `${name}-${this.$moment().unix()}`;
              this[name].data = data;
            }
          });
        };
        console.log(this[name]);
        fr.readAsText(e);
      }
    },
  },
};
</script>

<style scoped>
.add-card {
  border-style: dashed;
  background-color: transparent !important;
  border-color: antiquewhite;
  height: 150px;
  width: 160px;
  max-height: 200px;
  max-width: 210px;
  cursor: pointer;
}

.v-card__title {
  justify-content: center;
  padding-top: 50px;
}
</style>
