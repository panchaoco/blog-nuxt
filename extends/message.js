import Vue from 'vue'
import MessageToast from '@/components/message/toast'

const MessageConstructor = Vue.extend(MessageToast)

let messageInstance

const MessageInstance = (options = {}) => {
  if (messageInstance) {
    return messageInstance
  }

  const parent = document.body

  const opts = {
    ...options,
    value: true
  }

  const instance = new MessageConstructor({
    propsData: opts
  }).$mount()

  parent.appendChild(instance.$el)

  Vue.nextTick(() => {
    setTimeout(() => {
      messageInstance = undefined
    }, 3000)
  })

  messageInstance = instance

  MessageInstance.hide = instance.hide.bind(instance)
}

MessageConstructor.prototype.hide = function() {
  if (messageInstance) {
    messageInstance = undefined
  }
  this.visible = false

  setTimeout(() => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  }, 300)
}


export default {
  install: Vue => {
    Vue.prototype.$message = MessageInstance
  }
}
