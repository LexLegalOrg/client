<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12"></div>
      <div class="col-5">
            <div class="text-success mt-2 mb-1">Фільтр даних за датою з: {{date.from}} до {{date.to}}</div>

        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Партнер</th>
              <th>Лідів згенеровано</th>
              <th>Договорів укладено</th>
              <th>Угод завершено позитивно</th>
              <th>Залучено коштів</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-success">
              <td>0</td>
              <td>За весь час:
              </td>
              <td>{{leadsQuantity}}</td>
              <td>{{dealsQuantity}}</td>
              <td>{{dealsClosed}}</td>
              <td>{{`${moneyInvolved} грн.`}}</td>
            </tr>
            <tr v-for="(i, index) in usersGraphs" :key="index">
              <td>{{ i.account.bitrix_id }}</td>
              <td>{{ `${i.account.name} ${i.account.midname}` }}</td>
              <td>{{ i.data.leads }}</td>
              <td>{{ i.data.deals }}</td>
              <td>{{ i.data.won }}</td>
              <td>{{ `${i.data.income} грн.` }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-7">
        <div class="input-group mb-3 mt-3">
          <input
            v-model="date.from"
            type="date"
            aria-label="from"
            class="form-control"
          />
          <input
            v-model="date.to"
            type="date"
            aria-label="to"
            class="form-control"
          />
          <button @click="loadData" class="btn btn-primary">Фільтрувати</button>
        </div>
        <apexchart :options="chartOptions" :series="series"> </apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      usersGraphs:[],
      date: {
        from: "2020-05-05",
        to: "2021-08-24",
      },
      chartOptions: {
      series: [],

        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true
          }
        },
        annotations: {
          yaxis: [{
            y: 30,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Support',
              style: {
                color: "#fff",
                background: '#00E396'
              }
            }
          }],
          xaxis: [{
            x: new Date('14 Nov 2012').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Rally',
              style: {
                color: "#fff",
                background: '#775DD0'
              }
            }
          }]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date('01 Mar 2012').getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },
    };
  },
  computed: {
    ...mapState(["deals"]),
    ...mapGetters(["getDealSum", "userData", "leadsQuantity", "dealsQuantity", "moneyInvolved","dealsClosed"]),
  },
  methods: {
    loadGraphs(){
      this.chartOptions.series = [{
        name: 'deals',
        data: this.$store.getters.getDataForChat(this.date).deals}
      ]
    },
    loadData() {
    this.usersGraphs = []
     let users = this.userData

     users.forEach(item => {
       let user = this.$store.getters.getDataByUserId(this.date, item.user.bitrix_id)
      this.usersGraphs.push({
        account: item.user,
        data: user
      })
     })

     console.log('Loaded with: ', this.date)
    },
  },
  mounted() {
    // this.getDealSum
    this.loadData()
    this.loadGraphs()
  },
};
</script>

<style>
</style>