import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Person from '@/components/Person'
import CreatePerson from '@/components/CreatePerson'

Vue.use(Router)

export default new Router({
  	routes: [
  	{
     	path: '/',
      	name: 'Home',
      	component: Home
    },
    {
    	path: '/person',
    	name: 'Person',
    	component: Person
    },
    {
    	path: '/create-person',
    	name: 'CreatePerson',
    	component: CreatePerson
    }
  ]
})
