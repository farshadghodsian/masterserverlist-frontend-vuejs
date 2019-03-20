import Vue from 'vue'
import Router from 'vue-router'
import MasterServerListSearch from '@/components/MasterServerListSearch'
import MasterServerListbyService from '@/components/MasterServerListbyService'
import Dashboard from '@/components/Dashboard'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/masterserverlistsearch',
      name: 'MasterServerListSearch',
      component: MasterServerListSearch
    },
    {
      path: '/masterserverlistbyservice',
      name: 'MasterServerListbyService',
      component: MasterServerListbyService
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
