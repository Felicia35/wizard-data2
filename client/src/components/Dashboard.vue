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
              <v-btn text @click="createDialog = false">
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-list three-line subheader>
            <v-subheader>Upload CSV 🧾</v-subheader>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="csvFiles"
                  color="deep-purple accent-4"
                  counter
                  label="Import CSV"
                  multiple
                  placeholder="Select your CSV files"
                  prepend-icon="mdi-paperclip"
                  outlined
                  :show-size="1000"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="text-overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="recordName"
                      :rules="nameRules"
                      :counter="20"
                      label="Record name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="creator"
                      :rules="nameRules"
                      :counter="20"
                      label="Creator name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    {{nowTime}}
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  namespace: "Dashboard",
  components: {},
  data() {
    return {
      createDialog: false,
      csvFiles: [],

      valid: false,
      recordName: "",
      creator: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 20 || "Name must be less than 20 characters",
      ],
    };
  },
  computed: {
    nowTime() {
      return this.$moment().format("YYYY-MM-DD HH:mm:ss");
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
