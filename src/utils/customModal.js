import Vue from "vue";
import modal from "@/components/CustomModal/index.vue";

const customModal = Vue.extend(modal);

modal.install = function() {
  let instance = new customModal().$mount();
  const popupElement = document.getElementById('shutdownAnnouncement')
  if (popupElement) return
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.open();
  });
};

export default modal;