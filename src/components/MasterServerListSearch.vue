/* eslint-disable */
<template>
    <v-app>
     <v-container>
     <v-card class="mt-5">
      <v-card-title>
        <v-checkbox :label="`Only Show Active Servers`" v-model="activecheckbox" color="primary"></v-checkbox>
        <v-spacer></v-spacer> 
        <v-text-field
          v-model="searchInput"
          append-icon="search"
          label="Search"
          hint= "Press enter, tab, or leave input to execute search"
          single-line
          @blur="search = searchInput"
          @keyup.enter="search = searchInput"
        ></v-text-field>
        <v-btn color="primary" class="ml-5" style="text-transform: none" v-if="selected.length!=0" @click.stop="selected=[]">Clear All Selections</v-btn>
        <!-- Export Selected Servers to Excel -->
        <v-btn color="primary" class="ml-5" @click.stop="exportexceldialog=true" v-if="selected.length!=0" style="text-transform: none"> Export Selected Servers to Excel</v-btn>
        <v-dialog v-model="exportexceldialog" max-width="500px">
          <v-card>
            <v-toolbar color="indigo" dark>
            <v-toolbar-title>Master Sever List Export to Excel</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
            <v-subheader v-text="'Please select the columns you wish to include in your export'"></v-subheader>
            <v-select @change="enableexport = false"
                :items="exportedheaders"
                v-model="json_temp"
                label="Included Columns"
                multiple
                chips
                item-text="text"
                item-value="value"
                hint="The order in which you select them will determine the order in the excel sheet as well"
                persistent-hint
            ></v-select><v-badge color="green" overlap v-if="enableexport">
            <v-icon color="green">check_circle</v-icon></v-badge><v-btn color="primary" @click.stop="arraytoheaders" v-if="json_temp.length!=0">Confirm Columns to Export</v-btn>
            <download-excel class="btn btn-default success ml-5 pa-1" :data= "selected" :fields= "json_fields" name="Server_List_Export.xls" v-if="enableexport">
            Export Selected Servers to Excel
            </download-excel>
            <v-subheader class="mt-5" v-text="'*Note that you will get a message stating file format and extension dont match when opening up the exported file. This is expected, please click Yes to accept and open the file.'"> </v-subheader>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" flat @click.stop="exportexceldialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End of Export Dialog -->
      </v-card-title>
        <v-data-table :items="filteredServers" :headers="masterserverlistheaders" item-key="masterserverlist_id" :search="search" :pagination.sync="pagination" :rows-per-page-items="rowitems" :loading="loadbar" v-model="selected" select-all>
            <v-progress-linear slot="progress" color="green" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>
                    <v-checkbox
                        v-model='props.selected'
                        primary
                        hide-details
                    ></v-checkbox>
                    </td>
                    <td>{{ props.item.masterserverlist_id }}</td>
                    <td><v-btn small class='primary' dark>{{ props.item.prod_hostname }}</v-btn></td>
                    <td>{{ props.item.mgt_hostname }}</td>
                    <td>{{ props.item.environment }}</td>
                    <td>{{ props.item.archservicename }}</td>
                    <td>{{ props.item.tccservicename }}</td>
                    <td>{{ props.item.active }}</td>
                    <td>{{ props.item.host_type }}</td>
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
     </v-container>
    </v-app>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)

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
                    searchInput: '',
                    activecheckbox: true,
                    //rowitems specifies the items per page settings in table. Default is rowitems: [5,10,25,{"text":"All","value":-1}],
                    rowitems: [10,25,50,100,300],
                    pagination: {},
                    sideNav: false,
                    loadbar: true,
                    masterserverlist_data: [],
                    selected: [],
                    //Header data used for v-data-table
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
                        text: 'Arch Service Name',
                        value: 'archservicename'
                    }, {
                        text: 'TCC Service Name',
                        value: 'tccservicename'
                    }, {
                        text: 'Active',
                        value: 'active'
                    }, {
                        text: 'Host Type',
                        value: 'host_type'
                    }, {
                        text: 'Server Type',
                        value: 'server_type'
                    },{
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
                    }],
                    exportexceldialog: false,
                    //json_fields and json_meta are used for JSON to Excel export feature
                    json_fields: {},
                    json_temp: [],
                    enableexport: false,
                    exportedheaders: [{
                        text: 'ID',
                        value: ["ID", "masterserverlist_id"]
                    }, {
                        text: 'Prod Hostname',
                        value: ["Prod Hostname", "prod_hostname"]
                    }, {
                        text: 'Management Hostname',
                        value: ['Management Hostname', 'mgt_hostname']
                    }, {
                        text: 'Environment',
                        value: ['Environment', 'environment']
                    }, {
                        text: 'Service',
                        value: ['Service', 'service']
                    }, {
                        text: 'Arch Service Name',
                        value: ['Arch Service', 'archservicename']
                    }, {
                        text: 'Active',
                        value: ['Active', 'active']
                    }, {
                        text: 'Host Type',
                        value: ['Host Type', 'host_type']
                    }, {
                        text: 'Server Type',
                        value: ['Server Type', 'server_type']
                    },{
                        text: 'Prod IP',
                        value: ['Prod IP', 'prod_ip']
                    }, {
                        text: 'Management IP',
                        value: ['Management IP', 'mgt_ip']
                    }, {
                        text: 'External IP',
                        value: ['External IP', 'ext_ip']
                    }, {
                        text: 'URLs',
                        value: ['URLs', 'url']
                    }, {
                        text: 'Notes',
                        value: ['Notes', 'notes']
                    }],
                    json_meta: [
                        [
                        {
                            'key': 'charset',
                            'value': 'utf-8'
                        }
                        ]
                    ]
                    //End of Json Excel Data properties
                }
            },
            name: 'App',
            mounted() {
               //var _this = this
                    axios
                    .get(process.env.API_URL + '/getmasterserverlist') // Call the get function passing the url of the API as a parameter
                    .then(response => (this.masterserverlist_data = response.data)) // Setting masterserverlist_data to the data gotten from the API 
                    .catch(function(err) {
                       console.log(err) // This is where you run code if the server returns any errors
                    })
                    this.loadbar = false //Hiding Loadbar after server data is loaded.
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
                },
                arraytoheaders() {
                  this.json_fields=this.json_temp.reduce(function(prev,curr){prev[curr[0]]=curr[1];return prev;},{})
                  this.enableexport = true
                }
             } //end of computed
    }
</script>