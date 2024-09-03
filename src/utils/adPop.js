import Vue from "vue";
import adComponent from "@/components/AdPop/index.vue"; // 引入弹窗组件

const adDialog = Vue.extend(adComponent);

adComponent.install = function() {
  let instance = new adDialog().$mount();
  const popupElement = document.getElementById('advertising_popup')
  if (popupElement) return
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.open();
  });
};

export default adComponent;

 