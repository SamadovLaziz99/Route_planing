(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d077657"],{"28c1":function(t,e,a){t.exports=a.p+"assets/img/empty.47865182.svg"},3224:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"error"},[a("h1",[t._v("No data")]),t._v(" "),a("img",{attrs:{src:t.empty,alt:""}})])},s=[],n=a("28c1"),r=a.n(n),o={name:"EmptyBpx",data:function(){return{empty:r.a}}},l=o,c=a("2877"),u=Object(c["a"])(l,i,s,!1,null,"57d2a538",null);e["a"]=u.exports},"7deb":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.error?a("error-page",{attrs:{error:t.error}}):a("b-row",[a("b-colxx",{staticClass:"disable-text-selection"},[a("list-page-heading",{attrs:{title:t.$t("menu.orders_list"),rangepicker:!0,changeOrderBy:t.changeOrderBy,searchChange:t.searchChange,from:t.from,to:t.to,total:t.pagination.total,perPage:15}},[a("b-row",{staticStyle:{padding:"0 10px"}},[a("b-colxx",{attrs:{xxs:"12",md:"2"}},["order_list"===t.$route.name?a("v-select",{staticClass:"mb-2",staticStyle:{width:"100%"},attrs:{options:t.vendors,placeholder:t.$t("vendors")},on:{input:t.changeVendor},model:{value:t.filters.vendor,callback:function(e){t.$set(t.filters,"vendor",e)},expression:"filters.vendor"}}):t._e()],1),t._v(" "),a("b-colxx",{attrs:{xxs:"12",md:"2"}},["order_list"===t.$route.name?a("v-select",{staticClass:"mb-2",staticStyle:{width:"100%"},attrs:{options:t.foods,placeholder:t.$t("foods")},on:{input:t.changeFood},model:{value:t.filters.food,callback:function(e){t.$set(t.filters,"food",e)},expression:"filters.food"}}):t._e()],1),t._v(" "),a("b-colxx",{attrs:{xxs:"12",md:"2"}},["order_list"===t.$route.name?a("v-select",{staticClass:"mb-2",staticStyle:{width:"100%"},attrs:{options:t.couriers,placeholder:t.$t("couriers")},on:{input:t.changeCouriers},model:{value:t.filters.courier,callback:function(e){t.$set(t.filters,"courier",e)},expression:"filters.courier"}}):t._e()],1),t._v(" "),a("b-colxx",{attrs:{xxs:"12",md:"2"}},["order_list"===t.$route.name?a("v-select",{staticClass:"mb-2",staticStyle:{width:"100%"},attrs:{options:t.payment_types,placeholder:t.$t("payment_type")},on:{input:t.changePaymentType},model:{value:t.filters.payment_type,callback:function(e){t.$set(t.filters,"payment_type",e)},expression:"filters.payment_type"}}):t._e()],1),t._v(" "),a("b-colxx",{attrs:{xxs:"12",md:"3"}},[a("div",{staticClass:"d-inline-block mb-2 float-md-left align-top w-100"},["order_list"===t.$route.name?a("b-input",{staticClass:"search_input",attrs:{placeholder:t.$t("search")+", "+t.$t("menu.users")+", "+t.$t("phone")},on:{input:t.search},model:{value:t.filters.search,callback:function(e){t.$set(t.filters,"search",e)},expression:"filters.search"}}):t._e()],1)]),t._v(" "),a("b-colxx",{attrs:{xxs:"12",md:"1"}},[a("div",{staticClass:"float-md-right pt-1"},[a("span",{staticClass:"text-muted text-small mr-1 mb-2"},[t._v(t._s(t.from)+"-"+t._s(t.to)+" of "+t._s(t.pagination.total))])])])],1)],1),t._v(" "),a("b-tabs",{attrs:{card:""},on:{input:t.changeTabs},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},t._l(t.orderStats,(function(e){return a("b-tab",{key:e.name,staticStyle:{padding:"0.6rem"},scopedSlots:t._u([{key:"title",fn:function(){return[a("div",{staticStyle:{display:"flex"}},[a("div",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t.$t(e.name)))]),t._v(" "),e.count>0?a("b-badge",{attrs:{variant:"primary"}},[t._v(t._s(e.count))]):t._e()],1)]},proxy:!0}],null,!0)})})),1),t._v(" "),a("b-card",{attrs:{title:t.$t("order."+t.$route.query.type)}},[a("b-table",{attrs:{hover:"",items:t.data,fields:t.fields,busy:t.load,"show-empty":"",responsive:""},scopedSlots:t._u([{key:"empty",fn:function(){return[a("EmptyBox",{staticStyle:{"margin-top":"50px"}})]},proxy:!0},{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center text-primary my-2"},[a("b-spinner",{staticClass:"align-middle"}),t._v(" "),a("strong",[t._v(t._s(t.$t("loading"))+"...")])],1)]},proxy:!0},{key:"cell(action)",fn:function(e){var i=e.item;return[a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"glyph-icon simple-icon-eye mr-2 w-100 text-center action_button",staticStyle:{"font-size":"16px","font-weight":"700",color:"#6B7280",cursor:"pointer"},attrs:{id:"view_button"},on:{click:function(e){return t.$router.push({name:"order_details",params:{id:i.id}})}}})])]}},{key:"cell(status)",fn:function(e){var i=e.item;return[a("b-badge",{attrs:{pill:"",variant:t.badgeType(i.status)}},[t._v(t._s(t.$t("order."+i.status)))])]}},{key:"cell(time)",fn:function(e){var a=e.item;return[t._v("\n            "+t._s(t.moment(a.created_at).format("YYYY-MM-DD HH:mm"))+"\n          ")]}},{key:"cell(id)",fn:function(e){var i=e.item;return[a("div",[t._v("#"+t._s(i.id))])]}},{key:"cell(delivery_time)",fn:function(e){var a=e.item;return[t._v("\n            "+t._s(t.moment(a.delivery_time).format("YYYY-MM-DD HH:mm"))+"\n          ")]}},{key:"cell(vendor)",fn:function(e){var a=e.item;return[t._v("\n            "+t._s(a.vendor.user.first_name+" "+a.vendor.user.last_name)+"\n          ")]}},{key:"cell(customer)",fn:function(e){var a=e.item;return[t._v("\n            "+t._s(a.user.first_name+" "+a.user.last_name)+"\n          ")]}}],null,!1,911406818)}),t._v(" "),t.load?t._e():a("Pagination",{attrs:{page:t.pagination.page,"per-page":t.pagination.limit,total:t.pagination.total},on:{changePagination:t.changePagination}})],1)],1)],1)],1)},s=[],n=a("5530"),r=(a("ac1f"),a("841c"),a("b0c0"),a("4e82"),a("d81d"),a("fb6a"),a("4de4"),a("01c9")),o=a("04cc"),l=a("dcdb"),c=a("3224"),u=a("2f62"),d=a("b012"),h=a.n(d),p=a("c1df"),f=a.n(p),m="orders",v=Object(l["a"])(m),y=v.get,g=(v.getById,{components:{"list-page-heading":r["a"],Pagination:o["a"],EmptyBox:c["a"]},data:function(){return this.search=h()(this.search,800),{activeTab:0,fields:[{key:"id",label:this.$t("id"),tdClass:"firstColumn"},{key:"customer",label:this.$t("customer"),tdClass:"firstColumn"},{key:"vendor",label:this.$t("vendor"),tdClass:"text-muted"},{key:"additional_phone",label:this.$t("phone"),tdClass:"text-muted"},{key:"payment_type",label:this.$t("payment_type"),tdClass:"text-muted",class:"text-center"},{key:"order_price",label:this.$t("order_price"),tdClass:"text-muted",class:"text-center"},{key:"time",label:this.$t("order_time"),tdClass:"text-muted"},{key:"delivery_time",label:this.$t("delivery_time"),tdClass:"text-muted"},{key:"status",label:this.$t("status"),class:"text-center"},{key:"action",label:this.$t("action"),class:"text-center"}],page:1,from:0,to:0,payment_types:[{label:this.$t("cash"),value:"cash"},{label:this.$t("card"),value:"card"}],filters:{type:"pending",search:null,vendor:null,food:null,courier:null,payment_type:null}}},methods:{moment:f.a,search:function(t){this.page=1,this.routePusher(),this.getData()},changeVendor:function(t){this.page=1,this.routePusher(),this.getData()},changeFood:function(t){this.page=1,this.routePusher(),this.getData()},changeCouriers:function(t){this.page=1,this.routePusher(),this.getData()},changePaymentType:function(t){this.page=1,this.routePusher(),this.getData()},changePagination:function(t){this.page=t,this.getData()},changeTabs:function(t){this.findRoutesWithKey(t)},routePusher:function(){var t,e,a,i,s=Object(n["a"])({},this.$route.query);s.food_id=null===(t=this.filters.food)||void 0===t?void 0:t.value,s.courier_id=null===(e=this.filters.courier)||void 0===e?void 0:e.value,s.vendor_id=null===(a=this.filters.vendor)||void 0===a?void 0:a.value,s.q=this.filters.search,s.payment_type=null===(i=this.filters.payment_type)||void 0===i?void 0:i.value,this.$router.push({name:this.name,query:s}).catch((function(){}))},changeActiveTab:function(t){this.activeTab=t},changeRoutetypeWithKey:function(t){var e=Object(n["a"])({},this.$route.query);e.type=t,this.page=1,this.filters.type=t,this.$router.push({name:this.name,query:e}).catch((function(){})),this.getData()},findRoutesWithKey:function(t){switch(t){case 0:this.changeRoutetypeWithKey("pending");break;case 1:this.changeRoutetypeWithKey("accepted");break;case 2:this.changeRoutetypeWithKey("in_process");break;case 3:this.changeRoutetypeWithKey("shipping");break;default:break}},badgeType:function(t){switch(t){case"pending":return"info";case"accepted":return"secondary";case"in_process":return"light";case"shipping":return"dark";case"finished":return"success";case"cancelled":return"danger";default:return"primary"}},findTabsWithType:function(t){switch(t){case"pending":this.changeActiveTab(0);break;case"accepted":this.changeActiveTab(1);break;case"in_process":this.changeActiveTab(2);break;case"shipping":this.changeActiveTab(3);break;default:break}},changeOrderBy:function(t){this.sort=t},searchChange:function(t){this.search=t,this.page=1},getData:function(){var t,e,a,i,s=this;this.$store.dispatch(y,{page:this.page,status:this.$route.query.type,food_id:null===(t=this.filters.food)||void 0===t?void 0:t.value,vendor_id:null===(e=this.filters.vendor)||void 0===e?void 0:e.value,courier_id:null===(a=this.filters.courier)||void 0===a?void 0:a.value,q:this.filters.search,payment_type:null===(i=this.filters.payment_type)||void 0===i?void 0:i.value}).then((function(t){console.log(t),console.log(s.pagination),s.to=15*s.pagination.page>s.pagination.total?s.pagination.total:15*s.pagination.page,s.from=15*(s.pagination.page-1)}))}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(u["c"])(Object(l["b"])(m))),Object(u["c"])(["orderStats","dataVendors","dataFood","dataCouriers"])),{},{vendors:function(){return this.dataVendors.map((function(t){var e=t.user,a=e.first_name,i=e.last_name;return{label:a+" "+i,value:t.id}}))},foods:function(){return this.dataFood.map((function(t){return{label:t.name,value:t.id}}))},couriers:function(){return this.dataCouriers.map((function(t){return{label:t.name,value:t.id}}))}}),watch:{},mounted:function(){var t=this,e=this.$route.query;this.$store.dispatch("getVendors",{no_page:!0}),this.$store.dispatch("getFood"),this.$store.dispatch("getCouriers"),this.$store.dispatch("getOrderStats");var a,i=this.$route.hash;if(i&&(a=this.$route.hash.slice(this.$route.hash.length-1),this.page=parseInt(a)),e){var s=e.food_id,n=e.courier_id,r=e.vendor_id,o=e.q,l=e.type,c=e.payment_type;this.filters.food=this.foods.filter((function(t){return t.value===parseInt(s)}))[0],this.filters.vendor=this.vendors.filter((function(t){return t.value===parseInt(r)}))[0],this.filters.courier=this.couriers.filter((function(t){return t.value===parseInt(n)}))[0],this.filters.payment_type=this.payment_types.filter((function(t){return t.value===parseInt(c)}))[0],this.filters.search=o,this.filters.type=l,setTimeout((function(){t.findTabsWithType(l),t.getData()}),100)}}}),b=g,_=a("2877"),x=Object(_["a"])(b,i,s,!1,null,null,null);e["default"]=x.exports},b012:function(t,e){function a(t,e,a){var i,s,n,r,o;function l(){var c=Date.now()-r;c<e&&c>=0?i=setTimeout(l,e-c):(i=null,a||(o=t.apply(n,s),n=s=null))}null==e&&(e=100);var c=function(){n=this,s=arguments,r=Date.now();var c=a&&!i;return i||(i=setTimeout(l,e)),c&&(o=t.apply(n,s),n=s=null),o};return c.clear=function(){i&&(clearTimeout(i),i=null)},c.flush=function(){i&&(o=t.apply(n,s),n=s=null,clearTimeout(i),i=null)},c}a.debounce=a,t.exports=a}}]);