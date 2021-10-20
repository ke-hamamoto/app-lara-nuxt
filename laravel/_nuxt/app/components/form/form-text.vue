<template>
  <v-text-field
    v-model="$v.mydata.$model"
    :type="
      prpForm.type == 'password'
        ? flgShow
          ? 'text'
          : prpForm.type
        : prpForm.type
    "
    :label="prpForm.label"
    :append-icon="
      prpForm.type == 'password' ? (flgShow ? 'mdi-eye' : 'mdi-eye-off') : ''
    "
    :error-messages="errorsMes()"
    @input="
      $v.mydata.$touch();
      mychange();
    "
    :counter="prpForm.maxLen"
    @blur="$v.mydata.$touch()"
    @click:append="flgShow = !flgShow"
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
  props: ["cmpObj", "prpForm", "prpVali"],
  data() {
    return {
      mydata: "",
      flgShow: false,
    };
  },
  computed: {},
  methods: {
    ...mapMutations("app-utils", ["$initAppState", "$updateAppState"]),
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
        keys: [this.$genCmpKey(this.cmpObj), "mydata"],
        newData: this.mydata,
      });
    },
    formClear() {
      this.$v.$reset();
      this.mydata = "";
      this.$updateAppState({
        stateName: "$forms",
        keys: [this.$genCmpKey(this.cmpObj), "mydata"],
        newData: "",
      });
    },
  },
  created() {
    if (process.client) {
      this.$initAppState({
        stateName: "$forms",
        key: this.$genCmpKey(this.cmpObj),
        newData: { mydata: this.$v.mydata.$model, formClear: this.formClear },
      });
    }
  },
};
</script>