<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form>
        <v-card>
          <v-card-title class="">サインイン</v-card-title>
          <v-card-text>
            <FormText
              :cmpObj="$genCmpObj({ name: `email` })"
              :prpForm="prpForm.conf1"
              :prpVali="prpVali.conf1"
            />
          </v-card-text>
          <v-card-text>
            <FormText
              :cmpObj="$genCmpObj({ name: `pass` })"
              :prpForm="prpForm.conf2"
              :prpVali="prpVali.conf2"
            />
          </v-card-text>
          <v-card-text class="justify-center">
            <v-btn color="primary" @click="mysubmit()"> 確認 </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/signup"> ユーザー登録 </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { required, email, maxLength } from "vuelidate/lib/validators";
import FormText from "~/components/form/form-text.vue";
export default {
  components: { FormText },
  middleware: ["loginCheck"],
  async asyncData({ $axios }) {
    const $axios8080 = $axios;
    $axios8080.defaults.baseURL = process.client
      ? "http://localhost:8080"
      : "http://nginx:80";

    const testapi = await $axios8080.$get("/api/test").then(
      (data) => {
        return data;
      },
      (err) => {
        console.log(err);
      }
    );
    return { testapi };
  },
  data() {
    const confForm = { maxLen: 140 };
    return {
      prpForm: {
        conf1: {
          type: "text",
          label: "メールアドレス",
          maxLen: confForm.maxLen,
        },
        conf2: {
          type: "password",
          label: "パスワード",
          maxLen: confForm.maxLen,
        },
      },
      prpVali: {
        conf1: { email, required, maxLength: maxLength(confForm.maxLen) },
        conf2: { required, maxLength: maxLength(confForm.maxLen) },
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["isLogin"]),
    ...mapState("app-utils", ["$cmps", "$forms"]),
  },
  methods: {
    ...mapActions("auth", ["$login"]),
    async mysubmit() {
      const submitData = new FormData();
      console.log(this.$forms);
      submitData.append("email", this.$forms["email"].mydata);
      submitData.append("password", this.$forms["pass"].mydata);
      await this.$login(submitData);
      if (this.isLogin) {
        this.$cmps["layout-app"].updateItems();
        this.$router.push("/mypage");
      }
    },
  },
  created() {
    console.log(this.testapi);
  },
  mounted() {},
};
</script>
