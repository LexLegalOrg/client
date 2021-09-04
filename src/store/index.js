import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import createPersistedState from "vuex-persistedstate";
import VueAxios from "vue-axios"
import { filterDataByDate, filterDataByDateAndUserId, getDataChart } from "./modules/data.config"

Vue.use(Vuex)
Vue.use(VueAxios, axios);

const PORT = 911
const mode = 'dev' // can be 'product'

let url = mode == 'dev' ? `http://localhost:${PORT}/api/` : 'http://3.69.22.152/api/'
Vue.axios.defaults.baseURL = url

export default new Vuex.Store({
  state: {
    account: {
      auth: false,
      data: {},
      assigned: {
        user: {}
      }
    },
    plan: [],
    myPlan: [],
    bonus: {},
    mode: 0,
    users: [],
    leads: [],
    deals: [],
    filter: {
      quarter: {
        first: {
          from: 1609452000000, // Jan
          to: 1617224400000, // March
        },
        second: {
          from: 1617224400000, // April
          to: 1625086800000, // June
        },
        third: {
          from: 1625086800000, // June
          to: 1630443600000, // September
        },
        fourth: {
          from: 1633035600000, // June
          to: 1640642400000, // Jan 2022
        },
      },
    },
  },
  mutations: {
    SET_LOGOUT: (state) => {
      state.account = {
        auth: false,
        data: {},
        assigned: {
          user: {}
        }
      }
    },
    SET_ACCOUNT: (state, data) => {
      state.account = {
        auth: true,
        data: data.data,
        assigned: {
          user: data.user
        }
      }
    },
    SET_PLAN_ADMIN: (state, data) => {
      state.plan = data
    },
    SET_PLAN_USER: (state, data) => {
      state.myPlan = data
    },
    SET_BONUS: (state, bonus) => {
      state.bonus = bonus
    },
    SET_MODE: (state, mode) => {
      state.mode = mode
    },
    SET_USERS: (state, users) => {
      state.users = users
    },
    SET_LEADS: (state, leads) => {
      state.leads = leads
    },
    SET_DEALS: (state, deals) => {
      state.deals = deals
    }
  },

  actions: {
    logout: ({ commit }) => {
      commit('SET_LOGOUT')
    },
    getBonus: ({ dispatch }) => {
      let options = {
        endpoint: 'bonus/get',
        method: 'get',
        headers: {},
        data: {},
        query_params: '',
        commit: 'SET_BONUS'
      }

      dispatch('newQuery', options)
    },
    getUsers: ({ dispatch }) => {
      let options = {
        endpoint: 'users/active',
        method: 'get',
        headers: {},
        data: {},
        query_params: '',
        commit: 'SET_USERS'
      }

      dispatch('newQuery', options)
    },
    getTasks: ({ dispatch }) => {
      let options = {
        endpoint: 'plan',
        method: 'get',
        headers: {},
        data: {},
        query_params: '',
        commit: 'SET_PLAN_ADMIN'
      }

      dispatch('newQuery', options)
    },
    getTasksByUser: ({ dispatch }, assign_id) => {
      let options = {
        endpoint: `plan/user/${assign_id}`,
        method: 'get',
        headers: {},
        data: {},
        query_params: '',
        commit: 'SET_PLAN_USER'
      }

      dispatch('newQuery', options)
    },
    getDeals: ({ dispatch }) => {
      let options = {
        endpoint: 'deals',
        method: 'get',
        headers: {},
        data: {},
        query_params: '',
        commit: 'SET_DEALS'
      }

      dispatch('newQuery', options)
    },
    getLeads: ({ dispatch }) => {
      let options = {
        endpoint: 'leads',
        method: 'get',
        headers: {},
        data: {},
        query_params: '',
        commit: 'SET_LEADS'
      }

      dispatch('newQuery', options)
    },
    newQuery: ({ commit }, params) => {
      let query = {
        url: params.query_params != '' ? url + params.endpoint + params.query_params : url + params.endpoint,
        method: params.method,
        headers: params.headers != {} ? params.headers : undefined,
        data: params.data != {} ? params.data : undefined
      }
      axios(query)
        .then(res => {
          commit(params.commit, res.data)
        })
        .catch(err => console.log(err))
    }

  },
  getters: {
    userData: (state, dispatch) => {
      let users = state.users

      let sorted = []

      users.forEach((i) => {
        if (i.bitrix_id != 12 && i.bitrix_id != 726) {
          sorted.push({
            user: i,
            data: [
              dispatch.leadsById(i.bitrix_id),
              dispatch.dealsById(i.bitrix_id),
              dispatch.wonDeals(i.bitrix_id),
              dispatch.loadAllDataByUserID(i.bitrix_id),
              dispatch.userMoneyInvolved(i.bitrix_id),

            ],
          });
        } else {
        }
      });

      return sorted;
    },
    leadsQuantity: (state) => {
      return state.leads.length
    },
    dealsQuantity: (state) => {
      return state.deals.length
    },
    moneyInvolved: (state) => {
      let sum = 0
      let deals = state.deals

      deals.forEach(i => {
        let money = parseFloat(i.OPPORTUNITY)
        sum += money
      })

      return sum
    },
    userMoneyInvolved: (state) => (id) => {
      let sum = 0

      let deals = state.deals

      deals.forEach(item => {
        if (item.ASSIGNED_BY_ID == id) {
          sum += parseFloat(item.OPPORTUNITY)
        }
      })

      return sum
    },
    dealsClosed: (state) => {
      let dealSum = 0
      let deals = state.deals

      deals.forEach(i => {
        if (i.CLOSED == "Y") {
          dealSum == dealSum++
        }
      })

      return dealSum
    },
    leadsById: (state) => (id) => {
      let leads = state.leads

      return leads.filter(i => i.ASSIGNED_BY_ID == id).length
    },
    dealsById: (state) => (id) => {
      let deals = state.deals

      return deals.filter(i => i.ASSIGNED_BY_ID == id).length
    },
    wonDeals: (state) => (id) => {
      let deals = state.deals

      return deals.filter(i => i.ASSIGNED_BY_ID == id && i.STAGE_ID == "WON").length
    },
    loadAllDataByUserID: (state) => (id) => {
      let leads = state.leads
      let deals = state.deals

      let sortedLeads = {
        first: [],
        second: [],
        third: [],
        fourth: [],
        all: []
      }
      let sortedDeals = {
        first: [],
        second: [],
        third: [],
        fourth: [],
        all: [],
        win: []
      }

      // Won deals by quarters
      let win = {
        first: [],
        second: [],
        third: [],
        fourth: []
      }

      //LEADS

      leads.forEach((i) => {
        //ALL
        if (id == i.ASSIGNED_BY_ID) {
          sortedLeads.all.push(i)
        }

        // load leads by quarters
        if (Date.parse(i.DATE_CREATE) >= state.filter.quarter.first.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.first.to &&
          id == i.ASSIGNED_BY_ID) {
          sortedLeads.first.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.second.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.second.to &&
          id == i.ASSIGNED_BY_ID
        ) {
          sortedLeads.second.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.third.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.third.to &&
          id == i.ASSIGNED_BY_ID
        ) {
          sortedLeads.third.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.fourth.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.fourth.to &&
          id == i.ASSIGNED_BY_ID
        ) {
          sortedLeads.fourth.push(i)
        }
        else { }
      })

      // DEALS 

      deals.forEach((i) => {
        //ALL
        if (id == i.ASSIGNED_BY_ID) {
          sortedDeals.all.push(i)
        }

        if (id == i.ASSIGNED_BY_ID && i.STAGE_ID == "WON") {
          sortedDeals.win.push(i)
        }

        // load deals by quarters
        if (Date.parse(i.DATE_CREATE) >= state.filter.quarter.first.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.first.to &&
          id == i.ASSIGNED_BY_ID) {
          sortedDeals.first.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.second.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.second.to &&
          id == i.ASSIGNED_BY_ID
        ) {
          sortedDeals.second.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.third.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.third.to &&
          id == i.ASSIGNED_BY_ID
        ) {
          sortedDeals.third.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.fourth.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.fourth.to &&
          id == i.ASSIGNED_BY_ID
        ) {
          sortedDeals.fourth.push(i)
        }
        // SORT BY QUARTERS AND WIN
        if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.first.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.first.to &&
          id == i.ASSIGNED_BY_ID && i.STAGE_ID == "WON"
        ) {
          win.first.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.second.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.second.to &&
          id == i.ASSIGNED_BY_ID && i.STAGE_ID == "WON"
        ) {
          win.second.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.third.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.third.to &&
          id == i.ASSIGNED_BY_ID && i.STAGE_ID == "WON"
        ) {
          win.third.push(i)
        }
        else if (
          Date.parse(i.DATE_CREATE) >= state.filter.quarter.fourth.from &&
          Date.parse(i.DATE_CREATE) <= state.filter.quarter.fourth.to &&
          id == i.ASSIGNED_BY_ID && i.STAGE_ID == "WON"
        ) {
          win.fourth.push(i)
        }
        else { }
      })


      return {
        leads: {
          quarters: {
            first: sortedLeads.first.length,
            second: sortedLeads.second.length,
            third: sortedLeads.third.length,
            fourth: sortedLeads.fourth.length,
          },
          all: sortedLeads.all.length
        },
        deals: {
          quarters: {
            first: sortedDeals.first.length,
            second: sortedDeals.second.length,
            third: sortedDeals.third.length,
            fourth: sortedDeals.fourth.length,
            won: {
              first: win.first.length,
              second: win.second.length,
              third: win.third.length,
              third: win.fourth.length,
            }
          },
          all: sortedDeals.all.length,
          win: sortedDeals.win.length,
        }
      }
    },
    // SingleGraph
    getDealSum: (state) => {
      let deals = state.deals

      let result = []

      deals.forEach(i => {
        if (i.CLOSEDATE != NaN) {
          let obj = {
            year: new Date(i.CLOSEDATE).getFullYear(),
            month: new Date(i.CLOSEDATE).getMonth(),
            name: new Date(i.CLOSEDATE).toLocaleString('uk-UA', { month: 'short' }),
          }

          result.push(obj)
        }
      })

      console.log(result)

      return result
    },
    getDataByDate: (state) => (params) => {

      let deals = {
        data: state.deals,
        date: {
          from: params.from,
          to: params.to
        }
      }

      let data = filterDataByDate(deals)
      return data

    },
    getDataByUserId: (state) => (params, id) => {

      let deals = {
        data: state.deals,
        mode: {
          income: false,
          won: false,
        },
        date: {
          from: params.from,
          to: params.to
        }
      }

      let income = {
        data: state.deals,
        mode: {
          income: true,
          won: false,
        },
        date: {
          from: params.from,
          to: params.to
        }
      }

      let leads = {
        data: state.leads,
        mode: {
          income: false,
          won: false,
        },
        date: {
          from: params.from,
          to: params.to
        }
      }

      let won = {
        data: state.deals,
        mode: {
          income: false,
          won: true,
        },
        date: {
          from: params.from,
          to: params.to
        }
      }
      return {
        deals: filterDataByDateAndUserId(deals, id),
        leads: filterDataByDateAndUserId(leads, id),
        income: filterDataByDateAndUserId(income, id),
        won: filterDataByDateAndUserId(won, id),
      }
    },
    getDataForChat: (state) => (params) => {
      let deals = {
        data: state.deals,
        mode: {
          income: false,
          won: false,
        },
        date: {
          from: params.from,
          to: params.to
        }
      }
      
      console.log(getDataChart(deals))

      return {
        deals: getDataChart(deals)
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
