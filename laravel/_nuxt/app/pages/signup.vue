<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form>
        <v-card>
          <v-card-title class="">サインアップ</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="model"
              :counter="max"
              :rules="rules"
              label="メールアドレス"
            ></v-text-field
          ></v-card-text>
          <v-card-text>
            <v-text-field
              v-model="model"
              :counter="max"
              :rules="rules"
              label="メールアドレス：（確認）"
            ></v-text-field
          ></v-card-text>
          <v-card-text>
            <v-text-field
              v-model="model"
              :counter="max"
              :rules="rules"
              label="パスワード"
            ></v-text-field>
            <v-text-field
              v-model="model"
              :counter="max"
              :rules="rules"
              label="パスワード：（確認）"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/signin">登録</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
