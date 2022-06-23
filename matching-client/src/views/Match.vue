<template>
  <b-jumbotron class="p-5 border">
    <template #header>Good Matching App</template>
    <template #lead>
      Get a match rating for two names or a list of names
    </template>

    <hr class="my-4" />
    <div class="row p-2">
      <div class="col-6 p-5 border">
        <div class="pb-2">
          <p class="font-weight-bold">Single Match Action</p>
        </div>
        <div class="row pb-5">
          <div class="col-9">
            <b-form-input
              v-model="names.nameOne"
              placeholder="Enter name one..."
            />
            matches
            <b-form-input
              v-model="names.nameTwo"
              placeholder="Enter name two..."
            />
          </div>
          <div class="col-3 align-self-center">
            <b-button
              variant="primary"
              :disabled="!(names.nameTwo || names.nameTwo)"
              @click="matchNames(names)"
              >Match</b-button
            >
          </div>
        </div>

        <hr class="my-4" />
        <div class="pb-2">
          <p class="font-weight-bold">Bulk Match Action</p>
        </div>
        <div class="row">
          <div class="col-6 align-self-cente">
            <b-form-file v-model="csvFile" accept="text/csv" plain />
          </div>
          <div class="col-3 align-self-center">
            <b-button
              variant="primary"
              size-m
              :disabled="!csvFile"
              @click="bulkMatchNames(csvFile)"
              >Match</b-button
            >
          </div>
          <div class="col-3 align-self-center">
            <b-button
              variant="primary"
              :disabled="!csvFile"
              @click="averageBulkMatchNames(csvFile)"
              >Average Match</b-button
            >
          </div>
        </div>
      </div>
      <div class="col-6 p-5 border">
        <div><p class="font-weight-bold">Output Data:</p></div>
        <div class="row">
          <p style="white-space: pre-line">{{ matchResult }}</p>
        </div>
      </div>
    </div>
  </b-jumbotron>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { IMatch } from "../interfaces/match.interfaces";

const match = namespace("match");

@Component({
  components: {},
})
export default class Match extends Vue {
  public csvFile: any = null;

  public names: IMatch = {
    nameOne: "",
    nameTwo: "",
  };

  @match.State
  public matchResult!: string;

  /* eslint-disable */
  @match.Action
  public matchNames!: (names: IMatch) => void;
  @match.Action
  public bulkMatchNames!: (csvFile: any) => void;
  @match.Action
  public averageBulkMatchNames!: (csvFile: any) => void;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
