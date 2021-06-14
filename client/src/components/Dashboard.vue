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
      <v-col cols="4" v-for="record in recordData" :key="record.recordName">
        <v-card elevation-5 @click="openDetail(record)">
          <v-card-title>
            {{ record.recordName }}
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-subheader>REPORTS</v-subheader>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{record.recordCreator}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>

          <v-card-title>Data Availability</v-card-title>
          <v-card-text>
            <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
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
import {mapGetters, mapActions} from "vuex";

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
    ...mapActions(['getRecordData']),
    async createRecord() {

      this.createInfo = {
        recordName: this.recordName,
        recordCreator: this.creator,
        eyeData: this.eyeData,
        moleData: this.moleData,
        editorData: this.editorData,
        behaviorData: this.behaviorData,
        createdAt: this.$moment().unix(),
      };

      this.$store
          .dispatch("createRecordData", this.createInfo)
          .then(() => {
            if(confirm('Create Record Success')) {
              this.createDialog = false
              this.getRecordData().catch(console.error);
            }
          });
    },
    async inputFile(e, name) {
      if (e) {
        const fr = new FileReader();

        fr.onload = f => {
          csvParser(f.target.result, {delimiter: ","}, (err, data) => {
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
    openDetail(e) {
      this.$router.push({
        path: `/record/${e.id}`,
        query: {recordDetail: e}
      })
    }
  },
  async mounted() {
    await this.getRecordData().catch(console.error);
  }
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

.add-card .v-card__title {
  justify-content: center;
  padding-top: 50px;
}
</style>
