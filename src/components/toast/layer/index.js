import Vue from '@/main.js'
import messagesEn from '@/language/en'
import messagesCn from '@/language/cn'
import Template from './index.vue';

let instance;

const globalOptions = {
    show: true,
    mask: true,
    type: '',
    cssClass: {},
    style: {},
    duration: 3000
}

const Layer = function(message, options = {}){

    options.cssClass &&
    (globalOptions.cssClass[options.cssClass] = true) &&
    (options.cssClass = globalOptions.cssClass);

    options = {
        ...globalOptions,
        ...options
    };

    for(let key in options) {
        if(options.hasOwnProperty(key)) {
            instance.$data[key] = options[key];
        }
    }
    instance.$data.message = message;
    document.body.appendChild(instance.$mount().$el);
    if(options.duration !== 0) {
        setTimeout(() => {
            Dismiss();
        }, options.duration);
    }
}


const Success = function(message = '加载成功', options = {}){
    if (Vue.$i18n.locale=='zh_CN'){
      message = messagesCn.toastModalText.loadSuccessText;
    }else if(Vue.$i18n.locale=='en_US'){
      message = messagesEn.toastModalText.loadSuccessText;
    }
    const SuccessOptions = {
        type: 'success',
        mask: false,
        ...options
    }

    Layer(message, SuccessOptions);
}

const Fail = function(message = '加载失败', options = {}){
  if (Vue.$i18n.locale=='zh_CN'){
    message = messagesCn.toastModalText.loadFailureText;
  }else if(Vue.$i18n.locale=='en_US'){
    message = messagesEn.toastModalText.loadFailureText;
  }
    const FailOptions = {
        type: 'fail',
        mask: false,
        ...options
    }

    Layer(message, FailOptions);
}

const Offline = function(message = '网络连接失败', options = {}){
  if (Vue.$i18n.locale=='zh_CN'){
    message = messagesCn.toastModalText.networkConnectionFailure;
  }else if(Vue.$i18n.locale=='en_US'){
    message = messagesEn.toastModalText.networkConnectionFailure;
  }
    const OfflineOptions = {
        type: 'offline',
        mask: false,
        ...options
    }

    Layer(message, OfflineOptions);
}

const Loading = function(message = '加载中...', options = {}){
  if (Vue.$i18n.locale=='zh_CN'){
    message = messagesCn.toastModalText.loadingText;
  }else if(Vue.$i18n.locale=='en_US'){
    message = messagesEn.toastModalText.loadingText;
  }
    const LoadingOptions = {
        type: 'loading',
        mask: false,
        ...options,
        duration: 0
    }
    Layer(message, LoadingOptions);
}

const Dismiss = () => {
    instance.$data.show = false;
}


export default {
    install(Vue) {
        let Tpl = Vue.extend(Template);
        instance = new Tpl();
        Vue.prototype.$Toast.success = Success;
        Vue.prototype.$Toast.fail = Fail;
        Vue.prototype.$Toast.offline = Offline;
        Vue.prototype.$Toast.loading = Loading;
        Vue.prototype.$Toast.Dismiss = Dismiss;
    }
}
