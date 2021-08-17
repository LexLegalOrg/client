<template>
  <div class="container">
    <div class="row" v-for="user in userData" :key="user.bitrix_id">
      <div class="col">
        <div class="user-item">
          <img :src="user.user.avatar" alt="" />
          <div class="user-item-meta">
            <h6>{{ `${user.user.name} ${user.user.midname}` }}</h6>
            <p class="text-muted">{{ user.user.account.user_role }}</p>
          </div>
        </div>
      </div>
      <div class="col" v-for="i in settings" :key="i.id">
        <apexchart
          :options="chartConfig(i)"
          :series="quarterConfig(user.data, i.id)"
        ></apexchart>
      </div>
    
    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";
import {
  quarterConfig,
  chartConfig,
} from "../../store/modules/data.config";
export default {
    components:{
        apexchart: VueApexCharts,
    },
  data() {

            return {
      chartConfig,
      quarterConfig,
      settings: [
        {
          id: 0,
          isQuarter: true,
          category: "Перший квартал - 2021",
        
        },
        {
          id: 1,
          isQuarter: true,
          category: "Другий квартал - 2021",
        },
        {
          id: 2,
          isQuarter: true,
          category: "Третій квартал - 2021",
        },
        {
          id: 3,
          isQuarter: true,
          category: "Четвертий квартал - 2021",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {

  },
};
</script>

<style>
</style>