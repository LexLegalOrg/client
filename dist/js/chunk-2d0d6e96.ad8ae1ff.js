(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6e96"],{7524:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"}),e("div",{staticClass:"col-5"},[e("div",{staticClass:"text-success mt-2 mb-1"},[t._v("Фільтр даних за датою з: "+t._s(t.date.from)+" до "+t._s(t.date.to))]),e("table",{staticClass:"table"},[t._m(0),e("tbody",[e("tr",{staticClass:"table-success"},[e("td",[t._v("0")]),e("td",[t._v("За весь час: ")]),e("td",[t._v(t._s(t.leadsQuantity))]),e("td",[t._v(t._s(t.dealsQuantity))]),e("td",[t._v(t._s(t.dealsClosed))]),e("td",[t._v(t._s(t.moneyInvolved+" грн."))])]),t._l(t.usersGraphs,(function(a,s){return e("tr",{key:s},[e("td",[t._v(t._s(a.account.bitrix_id))]),e("td",[t._v(t._s(a.account.name+" "+a.account.midname))]),e("td",[t._v(t._s(a.data.leads))]),e("td",[t._v(t._s(a.data.deals))]),e("td",[t._v(t._s(a.data.won))]),e("td",[t._v(t._s(a.data.income+" грн."))])])}))],2)])]),e("div",{staticClass:"col-7"},[e("div",{staticClass:"input-group mb-3 mt-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.date.from,expression:"date.from"}],staticClass:"form-control",attrs:{type:"date","aria-label":"from"},domProps:{value:t.date.from},on:{input:function(a){a.target.composing||t.$set(t.date,"from",a.target.value)}}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.date.to,expression:"date.to"}],staticClass:"form-control",attrs:{type:"date","aria-label":"to"},domProps:{value:t.date.to},on:{input:function(a){a.target.composing||t.$set(t.date,"to",a.target.value)}}}),e("button",{staticClass:"btn btn-primary",on:{click:t.loadData}},[t._v("Фільтрувати")])]),e("apexchart",{attrs:{options:t.chartOptions,series:t.series}})],1)])])},o=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",[t._v("#")]),e("th",[t._v("Партнер")]),e("th",[t._v("Лідів згенеровано")]),e("th",[t._v("Договорів укладено")]),e("th",[t._v("Угод завершено позитивно")]),e("th",[t._v("Залучено коштів")])])])}],r=e("5530"),i=(e("159b"),e("1321")),d=e.n(i),n=e("2f62"),l={components:{apexchart:d.a},data:function(){return{usersGraphs:[],date:{from:"2020-05-05",to:"2021-08-24"},chartOptions:{series:[],chart:{id:"area-datetime",type:"area",height:350,zoom:{autoScaleYaxis:!0}},annotations:{yaxis:[{y:30,borderColor:"#999",label:{show:!0,text:"Support",style:{color:"#fff",background:"#00E396"}}}],xaxis:[{x:new Date("14 Nov 2012").getTime(),borderColor:"#999",yAxisIndex:0,label:{show:!0,text:"Rally",style:{color:"#fff",background:"#775DD0"}}}]},dataLabels:{enabled:!1},markers:{size:0,style:"hollow"},xaxis:{type:"datetime",min:new Date("01 Mar 2012").getTime(),tickAmount:6},tooltip:{x:{format:"dd MMM yyyy"}},fill:{type:"gradient",gradient:{shadeIntensity:1,opacityFrom:.7,opacityTo:.9,stops:[0,100]}}}}},computed:Object(r["a"])(Object(r["a"])({},Object(n["c"])(["deals"])),Object(n["b"])(["getDealSum","userData","leadsQuantity","dealsQuantity","moneyInvolved","dealsClosed"])),methods:{loadGraphs:function(){this.chartOptions.series=[{name:"deals",data:this.$store.getters.getDataForChat(this.date).deals}]},loadData:function(){var t=this;this.usersGraphs=[];var a=this.userData;a.forEach((function(a){var e=t.$store.getters.getDataByUserId(t.date,a.user.bitrix_id);t.usersGraphs.push({account:a.user,data:e})})),console.log("Loaded with: ",this.date)}},mounted:function(){this.loadData(),this.loadGraphs()}},c=l,u=e("2877"),m=Object(u["a"])(c,s,o,!1,null,null,null);a["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d0d6e96.ad8ae1ff.js.map