<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      temporary
      dark
      fixed
      clipped
      v-model="drawer"
      app
    >
       <v-subheader class="mt-3 grey--text text--darken-1">Welcome to the Master Server List</v-subheader>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">SEARCHES & LOOKUPS</v-subheader>
        <v-list>
          <v-list-tile v-for="item in items2" :key="item.text" :to="item.path">
            <!-- <v-list-tile-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
            </v-list-tile-avatar> -->
            <v-list-tile-title style="color: white!important; text-decoration: none;" v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">HELP</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">SETTINGS</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dark
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center" to="/">
        <span class="title">Learningautomation.io Master Server List Database</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <!-- <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          color="white"
          hide-details
        ></v-text-field> -->
      <v-btn class="ml-5" dark flat to="/masterserverlistsearch">Master Server List Search</v-btn>
      <v-btn class="ml-5" dark flat to="/masterserverlistbyservice">Server List by Service</v-btn>
      <v-btn class="ml-5" dark flat>Server List by Hostname</v-btn>
      </v-layout>
    </v-toolbar>
    <v-snackbar
        :timeout="snackbartimeout"
        top
        right
        color="info"
        v-model="browsersnackbar">
        For best performance please use the Google Chrome browser
        <v-btn flat color="pink" @click.native="browsersnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-content>
        <main>
          <router-view></router-view>
        </main>
    </v-content>
  </v-app>
</template>

<script>

 export default {
        data() {
                return {
                drawer: true,
                browsersnackbar: true,
                snackbartimeout: 3000,
                snackbary: 'top',
                snackbarx: 'right',
                items: [
                { icon: 'trending_up', text: 'Dashboard', path: '/' },
                { icon: 'featured_play_list', text: 'Master Server List' },
                { icon: 'insert_chart', text: 'Data Visualization & Charts' }
              ],
              items2: [
                { picture: 28, text: 'Master Server List Full Search', path: '/masterserverlistsearch' },
                { picture: 38, text: 'Server List by Service', path: '/masterserverlistbyservice' },
                { picture: 48, text: 'Server List by Hostname', path: '/'},
              ]
            }},
        props: {
            source: String
            }
 }
</script>