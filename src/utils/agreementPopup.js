// import Vue from "vue"
import { defineComponent } from 'vue'
import agreementPopup from "@/components/UserAgreementPopup/index.vue"
const agreementDialog = defineComponent(agreementPopup)
agreementPopup.install = function(data) {
  const instance = new agreementDialog().$mount()
  const popupElement = document.getElementById('user-agreement-popup')
  if (popupElement) return
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.open(data)
  });
};

export default agreementPopup