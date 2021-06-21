<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row class="mt-5">
      <v-card
          class="add-card"
          elevation-5
          color="cyan"
          @click="createDialog = !createDialog"
      >
        <v-card-title>
          <v-icon x-large>mdi-book-plus-multiple-outline</v-icon>
        </v-card-title>
      </v-card>
    </v-row>

    <v-row class="mt-2" v-if="recordData">
      <v-col cols="4" v-for="record in recordData" :key="record.recordName">
        <v-card elevation-5 @click="openDetail(record)" color="cyan darken-4">
          <v-card-title>
            Name: {{ record.recordName }}
          </v-card-title>
          <v-divider class="mx-1"></v-divider>
          <v-card-text>
            <v-list dense color="cyan darken-4">
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ record.recordCreator }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-clock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ record.timestamp }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip color="lime darken-4" v-if="record.visOneData">{{record.visOneData}}</v-chip>
              <v-chip v-if="record.visTwoData">{{record.visTwoData}}</v-chip>
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
            <v-toolbar-title>Create Records</v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-form v-model="valid">
              <v-row class="pa-3">
                <v-col cols="12" v-text="nowTime"/>
                <v-col cols="12">
                  <v-text-field
                      v-model="recordName"
                      :rules="nameRules"
                      :counter="20"
                      label="Record name"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      v-model="creator"
                      :rules="nameRules"
                      :counter="20"
                      label="Creator name"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-file-input
                      @change="inputFile($event, 'vis1Data')"
                      show-size
                      accept="xls/xlsx"
                      label="Visualize One Data"
                  ></v-file-input>
                </v-col>
                <v-col cols="6">
                  <v-file-input
                      @change="inputFile($event, 'vis2Data')"
                      accept="text/csv"
                      show-size
                      label="Visualize Two Data"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="createRecord" large color="deep-purple">
            <v-icon class="mr-3">mdi-file</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import excelToJson  from "convert-excel-to-json";
import {mapActions, mapGetters} from "vuex";
import XLSX from "xlsx";

export default {
  namespace: "Dashboard",
  components: {},
  data() {
    return {
      createDialog: false,

      vis1Data: {},
      vis2Data: {},

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
        visOneData: this.vis1Data ? this.vis1Data : null,
        visTwoData: this.vis2Data ? this.vis2Data : null,
        createdAt: this.$moment().unix(),
      };

      this.$store
          .dispatch("createRecordData", this.createInfo)
          .then(() => {
            if (confirm('Create Record Success')) {
              this.createDialog = false
              this.getRecordData().catch(console.error);
            }
          });
    },
    async inputFile(e, name) {
      if (e) {
        const fileReader = new FileReader();
        const nowTime = this.$moment().unix();
        fileReader.onload = async ev => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: "binary"
            });
            const toJson = await XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
            let visOneData = [];
            await toJson.map(j => {
              // value, timestamp, start, end, recordName
              let d = [];
              d.push(j['type']);
              ('value' in j) ? d.push(j['value']) : d.push(null);
              ('timestamp' in j) ? d.push(j['timestamp']) : d.push(null);
              ('start' in j) ? d.push(j['start']) : d.push(null);
              ('end' in j) ? d.push(j['end']) : d.push(null);
              d.push(`${name}-${nowTime}`)
              visOneData.push(d)
            })
            this[name].name = `${name}-${nowTime}`;
            this[name].data = visOneData;

          } catch (e) {
            return false;
          }
        };
        fileReader.readAsBinaryString(e);
        console.log(this[name]);
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
