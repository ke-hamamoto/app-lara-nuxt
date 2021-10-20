<template>
  <v-btn class="primary" @click="mylogout" v-if="currentUser">ログアウト</v-btn>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  async asyncData({ $axios }) {
    return {};
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapState("app-utils", ["$cmps"]),
  },
  methods: {
    ...mapActions("auth", ["$logout"]),
    async mylogout() {
      await this.$logout();
      if (!this.currentUser) {
        this.$cmps["layout-app"].updateItems();
        this.$router.push("/signin");
      }
    },
  },
  created() {},
};
</script>