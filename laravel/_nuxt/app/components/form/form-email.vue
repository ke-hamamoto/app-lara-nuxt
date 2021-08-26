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
  validations() {
    return { mydata: this.prpVali };
  },
  async asyncData({ $axios }) {
    return {};
  },
  props: ["prpForm", "prpVali"],
  data() {
    return {
      mydata: "",
    };
  },
  computed: {},
  methods: {
    errorsMes() {
      const errors = [];
      if (!this.$v.mydata.$dirty) return errors;
      !this.$v.mydata.email && errors.push("メール形式でお願いします。");
      !this.$v.mydata.maxLength && errors.push("文字数オーバー");
      !this.$v.mydata.required && errors.push("Form is required!!");
      return errors;
    },
    mychange() {},
  },
  created() {},
};
</script>