import type { App } from 'vue'
import { createStore, StoreOptions, Store, ModuleTree } from 'vuex'
import IRootState from '@/store/interface'

const moduleFiles = import.meta.globEager('./modules/**/*.ts');

const modules: { [key: string]: ModuleTree<any> } = {}

Object.keys(moduleFiles).forEach(key => {
  const name = (key.split('/').pop() as string).split('.')[0]
  modules[name] = moduleFiles[key].default || {};
})

// 创建 store 容器实例.
const store = createStore<IRootState>({
  state: () => ({

  }),
  mutations: {
    increment(state: IRootState) { }
  },
  modules
})

export const setupStore = (app: App) => {
  app.use(store)
}

export default store