<template>
  <div id="profile">
    <h1>Планування</h1>
    <section class="col-10" v-if="adminRules">
      <hr />
      <h4>Створення плану</h4>
      <div class="row">
        <div class="col-3">
          <select
            class="form-select"
            v-model="create.assign"
            name="assign"
            id="assign"
          >
            <option value="0">Оберіть співробітника</option>
            <option
              v-for="i in userData"
              :key="i.user.bitrix_id"
              :value="i.user.bitrix_id"
            >
              {{ `${i.user.midname} ${i.user.name}` }}
            </option>
          </select>
        </div>
        <div class="col-4">
          <div class="input-group">
            <input
              type="date"
              v-model="create.date.from"
              placeholder="Дата від"
              class="form-control"
              name="date-from"
            />
            <input
              type="date"
              v-model="create.date.due"
              placeholder="Дата до"
              class="form-control"
              name="date-to"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="input-group">
            <input
              type="text"
              v-model="create.task.brief"
              placeholder="Кількість"
              class="form-control"
              name="task-brief"
            />
            <select
              class="form-select"
              name="task-type"
              id="task-type"
              v-model="create.task.type"
            >
              <option value="0">Оберіть тип задачі</option>
              <option v-for="i in task_type" :key="i.value" :value="i.value">
                {{ i.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-1">
          <button @click="savePlan" class="btn btn-primary">Зберегти</button>
        </div>
      </div>
    </section>
    <section class="col-12" v-if="adminRules">
      <hr />
      <h4>Задачі по співробітникам</h4>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Партнер</th>
            <th>Тип задачі</th>
            <th>Кількість</th>
            <th>Срок виконання</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in plan" :key="index">
            <td>{{ index }}</td>
            <td>{{ getUserBy(i.assign) }}</td>
            <td>{{ getTaskType(i.task.type) }}</td>
            <td>{{ i.task.brief }}</td>
            <td>
              {{
                `${normalizeDate(i.date.from)} - ${normalizeDate(i.date.due)}`
              }}
            </td>
            <td>{{getStatusType(i.status)}}</td>
            <td>Дії</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="col-12" v-if="!adminRules"> 
      <hr />
      <h4>Мій план</h4>
      <table class="table">
        <thead>
          <tr>
            <td>#</td>
            <td>Тип задачі</td>
            <td>Кількість</td>
            <td>Дата</td>
            <td>Статус</td>
            <td>Дії</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,index) in myPlan" :key="index">
            <td>{{index}}</td>
            <td>{{getTaskType(i.task.type) }}</td>
            <td>{{i.task.brief}}</td>
            <td>{{`${normalizeDate(i.date.from)} - ${normalizeDate(i.date.due)}`}}</td>
            <td>{{getStatusType(i.status)}}</td>
            <td>
              <div class="btn-group">
                <button type="button" @click="sendTaskStatus('not_done', i._id)" class="btn btn-danger">Не виконано</button>
                <button type="button" @click="sendTaskStatus('in_work', i._id)" class="btn btn-warning">В роботі</button>
                <button type="button" @click="sendTaskStatus('closed', i._id)" class="btn btn-success">Виконано</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      task_type: [
        {
          value: 1,
          title: "Генерація лідів",
        },
        {
          value: 2,
          title: "Укладення угод",
        },
        {
          value: 3,
          title: "Позитивно завершені угоди",
        },
        {
          value: 4,
          title: "Абонентське обслуговування",
        },
      ],
      create: {
        assign: 0,
        date: {
          from: 0,
          due: 0,
        },
        task: {
          type: 0,
          brief: "",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["userData"]),
    ...mapState(["account", "plan", "myPlan"]),
    adminRules() {
      return this.account.data.user.assignTo == 1 ? true : false;
    },
  },
  methods: {
    sendTaskStatus(status, id){
      let options = {
        url: `plan/task/${id}`,
        method: 'patch',
        data:{
          status: status
        }
      }

      this.$http(options)
      .then(res=>{
        console.log(res.data)
        this.$store.dispatch('getTasksByUser', this.account.data.user.assignTo)
      })
    },
    getStatusType(status){
      let state = ""
      if(status == "awaits"){
        state = "Очікує підтвердження"
      }

      if(status == "in_work"){
        state = "В роботі"
      }

      if(status == "closed"){
        state = "Завершено"
      }

      if(status == "not_done"){
        state = "Не виконано"
      }

      return state
    },
    getTaskType(id) {
      return this.task_type.filter((task) => task.value === id)[0].title;
    },
    getUserBy(assignId) {
      let users = this.$store.state.users;
      let current = users.filter((user) => user.bitrix_id === assignId)[0];
      return `${current.midname} ${current.name}`;
    },
    normalizeDate(date) {
      const formatter = new Intl.DateTimeFormat("ua", { month: "long" });

      let dd = new Date(date).getDay();
      let mm = formatter.format(new Date(date));
      let yy = new Date(date).getFullYear();

      return `${dd} ${mm} ${yy}`;
    },
    savePlan() {
      let options = {
        url: "plan",
        method: "post",
        data: this.create,
      };

      this.$http(options).then((res) => {
        console.log(res);
        alert("План збережено");
        this.$store.dispatch("getTasks");
      });
    },
  },
  async mounted() {
    if (this.adminRules) {
      await this.$store.dispatch("getTasks");
    } 
    else if(!this.adminRules) {
      this.$store.dispatch('getTasksByUser', this.account.data.user.assignTo)
    }
  },
};
</script>

<style>
</style>