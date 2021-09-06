<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form>
        <v-card>
          <v-card-title class="">サインイン</v-card-title>
          <v-card-text>
            <FormEmail
              cmpName="email"
              :prpForm="prpForm1"
              :prpVali="prpVali1"
            />
          </v-card-text>
          <v-card-text>
            <FormEmail cmpName="pass" :prpForm="prpForm2" :prpVali="prpVali2" />
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
import FormEmail from "~/components/form/form-email.vue";
export default {
  components: { FormEmail },
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
    return {
      prpForm1: { label: "メールアドレス", maxLen: 32 },
      prpForm2: { label: "パスワード", maxLen: 32 },
      prpVali1: null,
      prpVali2: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLogin"]),
    ...mapState("app-utils", ["$forms"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapActions("init", ["nuxtServerInit"]),
    async mysubmit() {
      const submitData = new FormData();
      submitData.append("email", this.$forms["email"].mydata);
      submitData.append("password", this.$forms["pass"].mydata);
      await this.login(submitData);
      await this.nuxtServerInit();
      if (this.isLogin) {
        this.$router.push("/mypage");
      }
    },
  },
  created() {
    this.prpVali1 = {
      email,
      required,
      maxLength: maxLength(this.prpForm1.maxLen),
    };
    this.prpVali2 = {
      required,
      maxLength: maxLength(this.prpForm2.maxLen),
    };
    console.log(this.testapi);
  },
  mounted() {},
};
</script>
