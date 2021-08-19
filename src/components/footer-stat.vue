<template>
  <div class="footer">
      <div class="footer-col">
          <p>Бонусний фонд компанії</p>
          <h4>{{bonus.sum}} грн</h4>
      </div>
      <div class="footer-col">
          <p>Всього лідів</p>
          <h4>{{leadsQuantity}}</h4>
      </div>
      <div class="footer-col">
          <p>Всього залучено коштів</p>
          <h4>{{moneyInvolved}} грн</h4>
      </div>
      <div class="footer-col">
          <p>Всього укладено угод</p>
          <h4>{{dealsQuantity}}</h4>
      </div>
      <div class="footer-col">
          <p>Всього закрито угод</p>
          <h4>{{dealsClosed}}</h4>
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