<template>
  <div id="home">
    <stat-page>
      <div class="user-stat-legend">
        <div>
          <select name="targetMode" id="targetMode" v-model="selectedMode">
            <option
              @click="changeMode(i.value)"
              v-for="(i, index) in modes"
              :key="index"
              :value="i.value"
            >
              {{ i.title }}
            </option>
          </select>
        </div>

        <div class="user-stat-legend-grid">
          <div class="grid-item" v-for="(i,index) in legend" :key="index">
            <div class="color-box" :style="`background: ${i.color};`"></div>
            <p>{{i.title}}</p>
          
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="user-stat">
          <div
            class="user-stat-row user-stat-row--quarter"
            v-for="i in sortedUsers"
            :key="i.id"
          >
            <div class="user-stat-user">
              <img :src="i.user.avatar" alt="" />
              <div class="user-stat-meta">
                <p class="name">{{ `${i.user.name} ${i.user.midname}` }}</p>
                <p class="role">{{ i.user.account.user_role }}</p>
              </div>
            </div>
            <!-- If all  -->
            <apexchart
              v-if="selectedMode == 1"
              :options="chartOptions"
              :series="chartConfig(i.data)"
            ></apexchart>

            <!-- if quarted -->
            <apexchart
              v-if="selectedMode == 2"
              :options="FQchartOptions"
              :series="firstQuarterConfig(i.data)"
            ></apexchart>
            <apexchart
              v-if="selectedMode == 2"
              :options="SQchartOptions"
              :series="secondQuarterConfig(i.data)"
            ></apexchart>
            <apexchart
              v-if="selectedMode == 2"
              :options="TQchartOptions"
              :series="thirdQuarterConfig(i.data)"
            ></apexchart>
            <apexchart
              v-if="selectedMode == 2"
              :options="FQQchartOptions"
              :series="fourthQuarterConfig(i.data)"
            ></apexchart>
          </div>
        </div>
      </div>
      <footer-stat />
    </stat-page>
  </div>
</template>

<script>
import FooterStat from "../components/footer-stat.vue";
import statPage from "../components/pages/stat-page.vue";
import { mapGetters, mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";

export default {
  components: { statPage, FooterStat, apexchart: VueApexCharts },
  data() {
    return {
      selectedMode: 2,
      modes: [
        {
          title: "Всі",
          value: 1,
        },
        {
          title: "Поквартально",
          value: 2,
        },
      ],
      legend: [
        { id: 0, title: "Лідів згенеровано", color: "#FFA500" },
        { id: 1, title: "Договорів укладено", color: "#0000FF" },
        { id: 2, title: "Угод виграно", color: "#006400" },
      ],
      date: {
        from: "",
        to: "",
      },
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
            from: 1617224400000, // June
            to: 1640988000000, // Jan 2022
          },
        },
      },
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
                 legend: {
    show: false
  },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        xaxis: {
          categories: ["Весь час"],
        },
        fill: {
          colors: ["#FFA500", "#0000FF", "#006400"],
          opacity: 1,
        },
      },
      //QUARTERS
      FQchartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
         legend: {
    show: false
  },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        xaxis: {
          categories: ["Перший квартал - 2021"],
        },
        fill: {
          colors: ["#FFA500", "#0000FF", "#006400"],
          opacity: 1,
        },
      },
      SQchartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
         legend: {
    show: false
  },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        xaxis: {
          categories: ["Другий квартал - 2021"],
        },
        fill: {
          colors: ["#FFA500", "#0000FF", "#006400"],
          opacity: 1,
        },
      },
      TQchartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
                 legend: {
    show: false
  },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        xaxis: {
          categories: ["Третій квартал - 2021"],
        },
        fill: {
          colors: ["#FFA500", "#0000FF", "#006400"],
          opacity: 1,
        },
      },
      FQQchartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
                 legend: {
    show: false
  },
        fill: {
          colors: ["#00FF00"],
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        xaxis: {
          categories: ["Четвертий квартал - 2021"],
        },
        fill: {
          colors: ["#FFA500", "#0000FF", "#006400"],
          opacity: 1,
        },
      },
    };
  },
  methods: {
    changeMode(value) {
      this.$store.commit("mode", value);
    },
    //HARDCODED QUARTER CONFIGS
    firstQuarterConfig(data) {
      let cfg = [
        {
          name: "Лідів згенеровано",
          data: [data[3].leads.quarters.first],
        },
        {
          name: "Договорів укладено",
          data: [data[3].deals.quarters.first],
        },
        {
          name: "Угод виграно",
          data: [data[3].deals.quarters.won.first],
        },
      ];

      return cfg;
    },

    secondQuarterConfig(data) {
      let cfg = [
        {
          name: "Лідів згенеровано",
          data: [data[3].leads.quarters.second],
        },
        {
          name: "Договорів укладено",
          data: [data[3].deals.quarters.second],
        },
        {
          name: "Угод виграно",
          data: [data[3].deals.quarters.won.second],
        },
      ];

      return cfg;
    },
    thirdQuarterConfig(data) {
      let cfg = [
        {
          name: "Лідів згенеровано",
          data: [data[3].leads.quarters.third],
        },
        {
          name: "Договорів укладено",
          data: [data[3].deals.quarters.third],
        },
        {
          name: "Угод виграно",
          data: [data[3].deals.quarters.won.third],
        },
      ];

      return cfg;
    },
    fourthQuarterConfig(data) {
      let cfg = [
        {
          name: "Лідів згенеровано",
          data: [data[3].leads.quarters.fourth],
        },
        {
          name: "Договорів укладено",
          data: [data[3].deals.quarters.fourth],
        },
        {
          name: "Угод виграно",
          data: [data[3].deals.quarters.won.fourth],
        },
      ];

      return cfg;
    },

    chartConfig(data) {
      let cfg = [
        {
          name: "Лідів згенеровано",
          data: [data[0]],
        },
        {
          name: "Договорів укладено",
          data: [data[1]],
        },
        {
          name: "Угод виграно",
          data: [data[2]],
        },
      ];

      return cfg;
    },
  },
  computed: {
    ...mapState(["users", "leads", "deals", "mode"]),
    ...mapGetters([
      "leadsById",
      "dealsById",
      "wonDeals",
      "loadAllDataByUserID",
    ]),
    rowClass() {
      return this.selectedMode == 1
        ? "user-stat-row--all"
        : this.selectedMode == 2
        ? "user-stat-row--quarter"
        : "";
    },
    sortGraphs() {
      let mode = this.selectedMode;
      let graphs = 0;

      // All data
      return mode == 1 ? 1 : 3;
    },
    sortedUsers() {
      let users = this.users;

      let sorted = [];
      let user = {};
      let series = [];

      users.forEach((i) => {
        if (i.bitrix_id != 12 && i.bitrix_id != 726) {
          sorted.push({
            user: i,
            data: [
              this.leadsById(i.bitrix_id),
              this.dealsById(i.bitrix_id),
              this.wonDeals(i.bitrix_id),
              this.loadAllDataByUserID(i.bitrix_id),
            ],
          });
        } else {
        }
      });

      return sorted;
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>
