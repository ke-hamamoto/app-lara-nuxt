<template>
  <v-list class="pb-0">
    <v-list-item-content
      class="pb-0"
      v-for="(comment, idx) in commentArr"
      :key="idx"
    >
      <v-list-item-title>{{ comment.title }}</v-list-item-title
      ><v-list-item>{{ comment.body }}</v-list-item>
    </v-list-item-content>
  </v-list>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  async asyncData({ $axios }) {
    return {};
  },
  props: ["cmpObj"],
  data() {
    return {
      commentArr: [],
    };
  },
  computed: {
    ...mapState("app-utils", ["$cmps", "$forms"]),
  },
  methods: {
    ...mapMutations("app-utils", ["$initAppState", "$updateAppState"]),
    ...mapActions("app-utils", ["$getcomment"]),
    updateCommentArr(newCommentArr) {
      this.$updateAppState({
        stateName: "$cmps",
        keys: ["timeline", "commentArr"],
        newData: newCommentArr,
      });
      this.commentArr = newCommentArr;
    },
  },
  async created() {
    this.commentArr = await this.$getcomment();

    if (process.client) {
      this.$initAppState({
        stateName: "$cmps",
        key: this.$genCmpKey(this.cmpObj),
        newData: {
          commentArr: this.commentArr,
          updateCommentArr: this.updateCommentArr,
        },
      });
    }
  },
};
</script>