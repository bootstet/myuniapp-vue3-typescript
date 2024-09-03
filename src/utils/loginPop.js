import { defineComponent } from 'vue'
import login from "@/components/LoginPop/index.vue"; // 引入弹窗组件

const LoginDialog = defineComponent(login);

login.install = function(data) {
  let instance = new LoginDialog().$mount();
  const popupElement = document.getElementById('new_login_popup')
  if (popupElement) return
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.open(data);
  });
};

export default login;

 