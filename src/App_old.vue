/* eslint-disable */
<template>
    <v-app>
    <v-toolbar dark>
      <v-toolbar-side-icon
        class=""></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5">Learningautomation.io Master Server List Database</v-toolbar-title>
      <v-btn class="ml-5" dark flat>Master Server List</v-btn>
      <v-btn class="ml-5" dark flat>Server List by Service</v-btn>
      <v-btn class="ml-5" dark flat>Server List by Hostname</v-btn>
    </v-toolbar>
     <v-card class="mt-5">
      <v-card-title>
        <v-checkbox :label="`Only Show Active Servers`" v-model="activecheckbox" color="primary"></v-checkbox>
        <v-spacer></v-spacer> 
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
        <v-data-table :items="filteredServers" :headers="masterserverlistheaders" item-key="masterserverlist_id" :search="search" :pagination.sync="pagination" :rows-per-page-items="rowitems" :loading="loadbar">
            <v-progress-linear slot="progress" color="green" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.masterserverlist_id }}</td>
                    <td><v-btn small class='primary' dark>{{ props.item.prod_hostname }}</v-btn></td>
                    <td>{{ props.item.mgt_hostname }}</td>
                    <td>{{ props.item.environment }}</td>
                    <td>{{ props.item.service }}</td>
                    <td>{{ props.item.active }}</td>
                    <td>{{ props.item.server_type }}</td>
                    <td>{{ props.item.prod_ip }}</td>
                    <td>{{ props.item.mgt_ip }}</td>
                    <td>{{ props.item.ext_ip }}</td>
                    <td>{{ props.item.url }}</td>
                    <td>{{ props.item.notes }}</td>
                </tr>
            </template>
            <!-- <template slot="expand" slot-scope="props">
                <v-card flat>
                    <v-card-text>
                        <strong>VM Configuration: </strong>{{ props.item.vmConfig}}</br>
                        <br/>
                        <strong>VM OS Type: </strong>{{ props.item.vmOSType}}</br>
                        <br/>
                        <strong>VM Lifecycle: </strong>{{ props.item.vmLifeCycle }}</br>
                        <br/>
                        <strong>VM Use: </strong>{{ props.item.vmUse }}</br>
                        <br/>
                        <strong>VM Justification: </strong>{{ props.item.vmJustification }}
                    </v-card-text>
                </v-card>
            </template> -->
        <!-- Setting the alert when no data is present     -->
            <template slot="no-data">
            <v-alert :value="true" color="success" icon="info">
             Data is loading...
            </v-alert>
            </template>
         <!-- Setting the alert when no results found    -->   
            <template slot="no-results">
            <v-alert :value="true" color="error" icon="warning">
             Your search for "{{ search }}" found no results.
            </v-alert>
            </template>
        </v-data-table>
<!--         Setting Exernal Pagination   
             <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div> -->
        </v-card>
    </v-app>
</template>

<script>
    export default {
        data() {
                return {
                    clipped: false,
                    drawer: true,
                    fixed: false,
                    items: [{
                        icon: 'bubble_chart',
                        title: 'Inspire'
                    }],
                    miniVariant: false,
                    right: true,
                    rightDrawer: false,
                    title: 'Learningautomation.io Master Server List Database',
                    search: '',
                    activecheckbox: true,
                    rowitems: [10,25,50,100,300,500,{"text":"All","value":-1}],
                    pagination: {},
                    sideNav: false,
                    loadbar: true,
                    masterserverlist_data: [],
                    masterserverlistheaders: [{
                        text: 'ID',
                        value: 'masterserverlist_id'
                    }, {
                        text: 'Prod Hostname',
                        value: 'prod_hostname'
                    }, {
                        text: 'Management Hostname',
                        value: 'mgt_hostname'
                    }, {
                        text: 'Environment',
                        value: 'environment'
                    }, {
                        text: 'Service',
                        value: 'service'
                    }, {
                        text: 'Active',
                        value: 'active'
                    }, {
                        text: 'Server Type',
                        value: 'server_type'
                    }, {
                        text: 'Prod IP',
                        value: 'prod_ip'
                    }, {
                        text: 'Management IP',
                        value: 'mgt_ip'
                    }, {
                        text: 'External IP',
                        value: 'ext_ip'
                    }, {
                        text: 'URLs',
                        value: 'url'
                    }, {
                        text: 'Notes',
                        value: 'notes'
                    }]
                }
            },
            name: 'App',
            mounted() {
                var _this = this
                fetch('/getmasterserverlist') // Call the fetch function passing the url of the API as a parameter
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function(resp) { // Your code for handling the data you get from the API
                        _this.masterserverlist_data = resp //Getting masterserverlist Requests function
                    })
                    .catch(function(err) {
                        console.log(err) // This is where you run code if the server returns any errors
                    })
                     .then(function(resp) { // Your code for handling the data you get from the API
                        _this.loadbar = false 
                    })
            }, //end of mounted
            computed: {
                // pages () { //computed property for external pagination
                //  if (this.pagination.rowsPerPage == null ||
                // this.pagination.totalItems == null
                // ) return 0

                //  return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
                //  },
                filteredServers() { //computed property for active servers filter
                let unfiltered = !this.activecheckbox;
                return this.masterserverlist_data.filter(function(server) {
                return unfiltered || (server.active === 'Y');
                })
                } //end of computed
             }
    }
</script>