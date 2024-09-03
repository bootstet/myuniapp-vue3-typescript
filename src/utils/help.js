import Vue from "vue";
import helpComponent from "@/components/Help/index.vue"; // 引入弹窗组件

const help = Vue.extend(helpComponent);

helpComponent.install = function(data) {
  let instance = new help().$mount();
  const popupElement = document.getElementById('help-pop-model')
  if (popupElement) return
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.showHandle(data);
  });
};

helpComponent.hide = function() {
  const popupElement = document.getElementById('help-pop-model')
  if (popupElement) {
    document.body.removeChild(popupElement)
  }
}

export default helpComponent;

 