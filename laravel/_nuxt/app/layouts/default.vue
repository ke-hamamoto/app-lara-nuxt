<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items>
        <v-layout align-center>
          <BtnLogout />
        </v-layout>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import BtnLogout from "~/components/btn/logout";
export default {
  components: { BtnLogout },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Signin",
          to: "/signin",
        },
        {
          icon: "mdi-apps",
          title: "Signup",
          to: "/signup",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "message-app",
    };
  },
  computed: {
    ...mapState("app-utils", ["$cmps"]),
    ...mapGetters("auth", ["currentUser"]),
  },
  methods: {
    ...mapMutations("app-utils", ["$initAppState", "$updateAppState"]),
    updateItems() {
      if (this.currentUser) {
        this.items.shift();
        this.items.unshift({
          icon: "mdi-apps",
          title: "Mypage",
          to: "/mypage",
        });
        this.$updateAppState({
          stateName: "$cmps",
          keys: ["layout-app", "items"],
          newData: this.items,
        });
      } else {
        this.items.shift();
        this.items.unshift({
          icon: "mdi-apps",
          title: "Signin",
          to: "/signin",
        });
        this.$updateAppState({
          stateName: "$cmps",
          keys: ["layout-app", "items"],
          newData: this.items,
        });
      }
    },
  },
  created() {
    if (process.client) {
      let myobj = {};
      myobj.items = this.items;
      myobj.updateItems = this.updateItems;
      this.$initAppState({
        stateName: "$cmps",
        key: "layout-app",
        newData: myobj,
      });
      this.updateItems();
    }
  },
  mounted() {},
};
</script>
