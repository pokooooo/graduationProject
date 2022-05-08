import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import "./assets/css/global.css"
import "./assets/css/iconfont.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue()

Vue.filter('dataFormat',originVal => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + '').padStart(2,'0')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('floor',num => {
  return Math.floor(num)
})

Vue.filter('toFixed',num => {
  return num.toFixed(1)
})

Vue.filter('weaponType', type => {
  if(type === 'bow') return '弓'
  if(type === 'catalyst') return '法器'
  if(type === 'sword') return '单手剑'
  if(type === 'claymore') return '双手剑'
  if(type === 'polearm') return '长柄武器'
})


Vue.filter('enemiesType', type => {
  if(type === 'normal') return '普通'
  if(type === 'elite') return '精英'
  if(type === 'boss') return '首领'
})

Vue.filter('domainsType', type => {
  if(type === 'artifact') return '圣遗物'
  if(type === 'role') return '角色突破素材'
  if(type === 'weapon') return '武器突破素材'
  if(type === 'talent') return '角色天赋素材'
})


Vue.filter('partsType', type => {
  if(type === 'flower') return '生之花'
  if(type === 'plume') return '死之羽'
  if(type === 'sands') return '时之沙'
  if(type === 'goblet') return '空之杯'
  if(type === 'circlet') return '理之帽'
})

Vue.filter('effectType', type => {
  if(type === 'ATK') return '攻击力'
  if(type === 'DEF') return '防御力'
  if(type === 'HP') return '生命值'
  if(type === 'CRITRate') return '暴击率'
  if(type === 'CRITDMG') return '暴击伤害'
  if(type === 'energyRecharge') return '充能效率'
  if(type === 'healingBonus') return '治疗加成'
  if(type === 'shieldStrength') return '护盾强效'
  if(type === 'physicalDMGBonus') return '物理伤害加成'
  if(type === 'elementDMGBonus') return '元素伤害加成'
  if(type === 'pyroDMGBonus') return '火元素伤害加成'
  if(type === 'hydroDMGBonus') return '水元素伤害加成'
  if(type === 'electroDMGBonus') return '雷元素伤害加成'
  if(type === 'anemoDMGBonus') return '风元素伤害加成'
  if(type === 'cryoDMGBonus') return '冰元素伤害加成'
  if(type === 'geoDMGBonus') return '岩元素伤害加成'
})

Vue.filter('visionType', type => {
  if(type === 'geo') return '岩'
  if(type === 'anemo') return '风'
  if(type === 'cryo') return '冰'
  if(type === 'electro') return '雷'
  if(type === 'hydro') return '水'
  if(type === 'pyro') return '火'
})


//刷新保存状态
if (sessionStorage.getItem("store")) {
  store.replaceState(
      Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store"))
      )
  );
  sessionStorage.removeItem("store")
}

//监听，在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state));
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
