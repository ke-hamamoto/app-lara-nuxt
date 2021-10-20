<template>
  <v-row>
    <v-container>
      <v-layout class="mb-3">
        <h2>マイページ</h2>
      </v-layout>
      <v-divider class="mb-5"></v-divider>
      <v-card>
        <v-card-title class="pb-0">投稿</v-card-title>
        <v-card-text>
          <FormText
            :cmpObj="$genCmpObj({ name: `comment` })"
            :prpForm="prpForm.conf1"
            :prpVali="prpVali.conf1"
          />
        </v-card-text>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn class="primary mb-2 mr-2" @click="mysubmit()">投稿</v-btn>
        </v-layout>
      </v-card>
      <v-card class="my-2">
        <v-card-title>タイムライン</v-card-title>
        <v-card-text>
          <TimeLine :cmpObj="$genCmpObj({ name: `timeline` })" />
        </v-card-text>
      </v-card>
    </v-container>
  </v-row>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { required, email, maxLength } from "vuelidate/lib/validators";
import FormText from "~/components/form/form-text.vue";
export default {
  components: {
    FormText: () => import("~/components/form/form-text.vue"),
    TimeLine: () => import("~/components/parts/timeline.vue"),
  },
  middleware: ["guestCheck"],
  asyncData() {
    return {};
  },
  data() {
    const confForm = { maxLen: 140 };
    return {
      prpForm: {
        conf1: {
          type: "text",
          label: "適当なコメントをどうぞ",
          maxLen: confForm.maxLen,
        },
      },
      prpVali: {
        conf1: {
          required,
          maxLength: maxLength(confForm.maxLen),
        },
      },
      username: "test",
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapState("app-utils", ["$cmps", "$forms"]),
  },
  methods: {
    ...mapMutations("app-utils", ["$updateAppState"]),
    ...mapActions("app-utils", ["$addcomment"]),
    async mysubmit() {
      const submitData = new FormData();
      submitData.append("userObj", this.currentUser);
      submitData.append("title", this.currentUser.name);
      submitData.append("comment", this.$forms["comment"].mydata);

      let commentArr = await this.$addcomment(submitData);
      this.$forms["comment"].formClear();
      console.log(commentArr);
      this.$cmps["timeline"].updateCommentArr(commentArr);
    },
  },
  created() {
    if (process.server) this.username = this.currentUser.name;
  },
};
</script>