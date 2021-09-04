<template>
  <div id="profile">
      <h1>Профіль</h1>
      <div class="col-6">
        <div class="input-group">
          <input type="date" name="" v-model="date.from" id="" class="form-control" placeholder="Дата від">
          <input type="date" name="" v-model="date.to" id="" class="form-control" placeholder="Дата до">
          <button @click="getData()" class="btn btn-primary">Фільтрувати</button>
        </div>
      </div>
     <div class="col-6">
        <table class="table">
        <thead>
          <tr>
            <td>#</td>
            <td>Лідів згенеровано</td>
            <td>Угод укладено</td>
            <td>Договорів позитивно завершено</td>
            <td>Коштів залучено</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{{sortedData.leads}}</td>
            <td>{{sortedData.deals}}</td>
            <td>{{sortedData.won}}</td>
            <td>{{sortedData.income}}</td>
          </tr>
        </tbody>
      </table>
     </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data(){
    return{
      date:{
        from: '2020-05-18T21:26:40+03:00',
        to: '2021-06-18T21:26:40+03:00'
      },
      sortedData: {}
    }
  },
  computed:{
    ...mapGetters(["getDataByUserId"]),
    ...mapState(["account"])
  },
  methods:{
    getData(){
      console.log(this.date)
      console.log(this.getDataByUserId(this.date))

      this.sortedData = this.getDataByUserId(this.date)
    }
},
  mounted(){
    this.sortedData = this.getDataByUserId(this.date, this.account.assigned.user.bitrix_id)
  }
}
</script>

<style>

</style>