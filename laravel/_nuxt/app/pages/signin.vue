<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form>
        <v-card>
          <v-card-title class="">サインイン</v-card-title>
          <v-card-text>
            <v-text-field label="メールアドレス"></v-text-field
          ></v-card-text>
          <v-card-text>
            <v-text-field label="パスワード"></v-text-field>
          </v-card-text>
          <v-card-text class="justify-center">
            <v-btn color="primary" nuxt to="/"> 確認 </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/register"> ユーザー登録 </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const $axios8080 = $axios
    $axios8080.defaults.baseURL = process.client
      ? 'http://localhost:8080'
      : 'http://nginx:80'
    const testapi = await $axios8080.$get('/api/test').then(
      (data) => {
        return data
      },
      (err) => {
        console.log(err)
      }
    )
    return { testapi }
  },
  data() {
    return {}
  },
  async created() {
    console.log(this.testapi)
  },
}
</script>
