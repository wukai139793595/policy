import Vue from 'vue'
import Router from 'vue-router'
import policy from '@/pages/policy'
import policyClassify from '@/pages/policyClassify'
import selectPerson from '@/pages/selectPerson'
import writeInfo from '@/pages/writeInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'policy',
      component: policy
    },{
      path: '/policy',
      name: 'policy',
      component: policy
    },
    {
      path: '/policyClassify',
      name: 'policyClassify',
      component: policyClassify
    },
    {
      path: '/selectPerson',
      name: 'selectPerson',
      component: selectPerson
    },
    {
      path: '/writeInfo',
      name: 'writeInfo',
      component: writeInfo
    },
  ]
})
