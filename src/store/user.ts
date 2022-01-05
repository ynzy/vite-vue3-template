import { defineStore } from 'pinia'
import { useAppStore } from './app';

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三',
      age: 18
    }
  },
  getters: {
    fullName: (state) =>{
      return state.name + '丰'
    }
  },
  actions: {
    updateState(data:any) {
      this.$state = data
      this.updateAppConfig()
    },
    updateAppConfig(){
      const appStore = useAppStore()
      appStore.setData('app-update')
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      // {
      //   // 持久化state所有数据
      //   key: 'user',
      //   storage: localStorage,
      // }
      {
          // 持久化state部分数据
        storage: localStorage,
        paths: ['name']
      }
    ]
  }
})

