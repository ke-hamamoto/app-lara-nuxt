<template>
  <v-text-field
    v-model="$v.mydata.$model"
    :label="prpForm.label"
    :error-messages="errorsMes()"
    @input="
      $v.mydata.$touch();
      mychange();
    "
    :counter="prpForm.maxLen"
    @blur="$v.mydata.$touch()"
  ></v-text-field>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  //関数形式にするとthisが使える
  validations() {
    return { mydata: this.prpVali };
  },
  async asyncData({ $axios }) {
    return {};
  },
  props: ["cmpName", "prpForm", "prpVali"],
  data() {
    return {
      mydata: "",
    };
  },
  computed: {},
  methods: {
    ...mapMutations("app-utils", ["$updateAppState"]),
    errorsMes() {
      const errors = [];
      if (!this.$v.mydata.$dirty) return errors;

      for (let key of Object.keys(this.$v.mydata)) {
        if (key == "email") {
          !this.$v.mydata[key] && errors.push("メール形式でお願いします。");
        } else if (key == "maxLength") {
          !this.$v.mydata[key] && errors.push("文字数オーバー");
        } else if (key == "required") {
          !this.$v.mydata[key] && errors.push("Form is required!!");
        }
      }
      return errors;
    },
    mychange() {
      this.$updateAppState({
        stateName: "$forms",
        keys: [this.cmpName, "mydata"],
        newData: this.mydata,
      });
    },
  },
  created() {
    if (process.client) {
      this.$updateAppState({
        stateName: "$forms",
        keys: [this.cmpName],
        newData: { mydata: this.$v.mydata.$model },
      });
    }
  },
};
</script>