<template>
  <div class="footer">
      <div class="footer-col">
          <p>Бонусний фонд компанії</p>
          <h2>{{bonus.sum}} грн</h2>
      </div>
      <div class="footer-col">
          <p>Всього лідів</p>
          <h2>{{leadsQuantity}}</h2>
      </div>
      <div class="footer-col">
          <p>Всього залучено коштів</p>
          <h2>{{moneyInvolved}} грн</h2>
      </div>
      <div class="footer-col">
          <p>Всього укладено угод</p>
          <h2>{{dealsQuantity}}</h2>
      </div>
      <div class="footer-col">
          <p>Всього закрито угод</p>
          <h2>{{dealsClosed}}</h2>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
    computed:{
        ...mapState(["bonus"]),
        ...mapGetters(["leadsQuantity", "dealsQuantity", "moneyInvolved","dealsClosed"])
    }
}
</script>

<style>

</style>