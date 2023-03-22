import {derived, writable} from 'svelte/store'

export default function createMapStore(initial) {
  const store = writable(initial)
  const set = (key, value) => store.update((m) => Object.assign({}, m, {[key]: value}))
  const results = derived(store, (s) => ({
    keys: Object.keys(s),
    values: Object.values(s),
    entries: Object.entries(s),
    set(k, v) {
      store.update((s) => Object.assign({}, s, {[k]: v}))
    },
    remove(k) {
      store.update((s) => {
        delete s[k]
        return s
      })
    },
  }))
  return {
    subscribe: results.subscribe,
    set: store.set,
  }
}
