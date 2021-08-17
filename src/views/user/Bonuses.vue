<template>
  <div id="profile">
    <h1>Бонуси</h1>
        <section class="col-10" v-if="bonus != {}">
      <hr />
      <h4>Поточна сума бонусу становить:</h4>
      <h1 class="text-success">{{ bonus.sum }} грн.</h1>
    </section>
    <section class="col-10" v-if="adminRules && bonusChangeMode == true">
      <hr />
      <h4>Встановлення бонусу</h4>
      <div class="mt-3 col-4">
        <div class="">
          <label for="bonusSum">Вкажіть суму бонусу</label>
          <input
            v-model="dataBonus.sum"
            type="text"
            name="bonusSum"
            id="bonusSum"
            class="form-control"
          />
          <button @click="setBonus" class="btn btn-primary mt-3">
            Зберегти
          </button>
        </div>
      </div>
    </section>

    <section class="col-10" v-if="adminRules && bonusChangeMode == false">
      <hr />
      <h4>Зміна суми бонусу</h4>
      <div class="mt-3 col-4">
        <div class="">
          <label for="bonusSum">Вкажіть суму бонусу</label>
          <input
            v-model="dataBonus.sum"
            type="text"
            name="bonusSum"
            id="bonusSum"
            class="form-control"
          />
          <button @click="editBonus" class="btn btn-primary mt-3">
            Зберегти
          </button>
        </div>
      </div>
    </section>

    <section class="col-10" v-if="!adminRules">
      <hr>
      <h4>Хочу бонус</h4>
      <div class="form">
        <div class="form">
          <label for="enterSumm">Введіть суму</label>
        <input type="text" name="enterSumm" class="form-control" v-model="catchBonusData.await_summ">
        <small v-if="validateEdits.error">{{validateEdits.msg}}</small>
        </div>
          <button @click="catchBonus" class="btn btn-primary mt-3" :disabled="validateEdits.error">
            Відправити заявку
          </button>
      </div>
    </section>

    <section class="col-10" v-if="!adminRules">
      <hr>
      <h4>Мої заявки</h4>
      <table class="table">
        <thead>
          <tr>
            <td>#</td>
            <td>Сума</td>
            <td>Дата створення</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(i,index) in tickets" :key="index">
            <td>{{index}}</td>
            <td>{{i.await_summ}} грн.</td>
            <td>{{i.created_at}}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="col-10" v-if="adminRules">
      <hr />
      <h4>Бажаючі отримати бонус</h4>
       <table class="table">
        <thead>
          <tr>
            <td>#</td>
            <td>Сума</td>
            <td>Ким створено заявку</td>
            <td>Дата створення</td>
            <td>Дії</td>
            
          </tr>
        </thead>

        <tbody>
          <tr v-for="(i,index) in bonus.tickets" :key="index">
            <td>{{index}}</td>
            <td>{{i.await_summ}} грн.</td>
            <td>{{getUserBy(i.user_id)}}</td>
            <td>{{i.created_at}}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" @click="accept(i,false)" class="btn btn-danger">Відхилити</button>
  <button type="button" @click="accept(i,true)" class="btn btn-success">Прийняти</button>
</div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tickets:[],
      dataBonus: {
        sum: 0,
      },
      catchBonusData:{
        await_summ: 0
      }
    };
  },
  computed: {
    ...mapState(["account", "bonus"]),
    validateEdits(){
      let state = {
        msg: '',
        error: false
      }
      if(this.catchBonusData.await_summ > this.bonus.sum){
        state = {
          msg: 'Сума не може перевищувати поточний бонус',
          error: true
        }
      }

      if(this.catchBonusData.await_summ < 0){
                state = {
          msg: 'Сума не може бути менше нуля',
          error: true
        }
      }

      return state
    },
    adminRules() {
      return this.account.data.user.assignTo == 1 ? true : false;
    },
    bonusChangeMode() {
      // Init and patch
      return this.bonus == {} || this.bonus == "" ? true : false;
    },
  },
  methods: {
    getUserBy(assignId){
      let users = this.$store.state.users 
      let current = users.filter(user => user.bitrix_id === assignId)[0]
      return `${current.midname} ${current.name}`
      
    },
    accept(data,bool){
      let options = {
        url: 'bonus/accept',
        method:'patch',
        data:{
          created_at: data.created_at,
          accept: bool
        }
      }

      this.$http(options)
      .then(res=>{
        alert('Статус змінено!')
        console.log(res)
        this.getBonus()
      })
    },
    getMyTickets(){
      let options = {
        url: "bonus/get/"+this.account.data.user.assignTo,
        method: "get",
      };

      this.$http(options)
      .then(res=>this.tickets = res.data)
    },
    getBonus() {
      let options = {
        url: "bonus/get",
        method: "get",
      };

      this.$http(options).then((res) => {
        this.$store.commit("SET_BONUS", res.data);
      });
    },
    setBonus() {
      let options = {
        url: "bonus/init",
        method: "post",
        data: this.dataBonus,
      };

      this.$http(options).then((res) => {
        alert("Бонус встановлено!");
        this.getBonus();
      });
    },
    catchBonus(){
      let data = {
        await_summ: this.catchBonusData.await_summ,
        user_id: this.account.data.user.assignTo
      }

      let options = {
        url: 'bonus/catch',
        method: 'patch',
        data: data
      }

      this.$http(options)
      .then(res=>{
        console.log(res)
        alert('Успішно відправлено')

        this.getMyTickets()
      })
    },
    editBonus() {
      let options = {
        url: "bonus/edit",
        method: "patch",
        data: this.dataBonus,
      };

      this.$http(options).then((res) => {
        alert("Суму бонусу змінено");
        this.getBonus();
      });
    },
  },
  async mounted() {
    await this.getBonus();
    await this.getMyTickets()
  },
};
</script>

<style>
</style>