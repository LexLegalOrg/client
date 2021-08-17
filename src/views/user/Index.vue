<template>
  <div id="user">
    <div class="profile-wrapper">
      <div class="profile-sidebar p-3">
        <h4>Інформаційний стенд</h4>
        <ul class="nav flex-column">
          <li class="nav-item" v-for="(i,index) in navs" :key="index">
             <router-link active-class="active" class="nav-link" :to="{name: i.name}" >
            {{i.title}}
          </router-link>
          </li>
          <li class="nav-item">
            <p class="nav-link text-danger" @click="logout">Вихід</p>
          </li>
         
        </ul>
      </div>
      <div class="profile-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import navbarRegular from "../../components/navbar-regular.vue";
export default {
  components: { navbarRegular },
  data() {
    return {
      navs: [
                {
          name: "Home",
          title: 'Головна'
        },
                {
          name: "Profile",
          title: 'Профіль'
        },
        {
          name: "Bonuses",
          title: 'Бонуси'
        },
        {
          name: "Planning",
          title: 'Планування'
        },
        {
          name: "Settings",
          title: 'Налаштування'
        },
      ],
    };
  },
  computed: {
    ...mapState(["account"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
</style>