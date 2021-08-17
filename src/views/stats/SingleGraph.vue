<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12"></div>
      <div class="col-5">
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
            <tr v-for="(i, index) in userData" :key="index">
              <td>{{ i.user.bitrix_id }}</td>
              <td>{{ `${i.user.name} ${i.user.midname}` }}</td>
              <td>{{ i.data[0] }}</td>
              <td>{{ i.data[1] }}</td>
              <td>{{ i.data[2] }}</td>
              <td>{{ `${i.data[4]} грн.` }}</td>
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
      date: {
        from: "",
        to: "",
      },
      series: [
        {
          name: "Загальна дохідність компанії",
          data: [12, 24, 58, 68, 34, 82, 43, 12, 43, 95, 34],
        },
        {
          name: "Загальна кількість угод",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 1, 2, 322],
        },
        {
          name: "Закрито позитивно угод",
          data: [1, 2, 4, 20, 25, 56, 24, 29, 49, 41, 60, 43],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень",
          ],
        },
      },
    };
  },
  computed: {
    ...mapState(["deals"]),
    ...mapGetters(["getDealSum", "userData", "leadsQuantity", "dealsQuantity", "moneyInvolved","dealsClosed"]),
  },
  methods: {
    loadData() {
      if (this.date.from != "" && this.date.to != "") {
        this.$store.getters.getDataByDate(this.date);
        console.warn("loadData(): Fields are filled!");
      } else {
        console.error("loadData(): Fields can not be empty");
      }

      console.warn("INIT loadData()");
    },
  },
  mounted() {
    // this.getDealSum
  },
};
</script>

<style>
</style>