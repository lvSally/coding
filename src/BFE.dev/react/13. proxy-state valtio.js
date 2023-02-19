import React, { useState, useEffect, useCallback } from 'react'

// Cache proxy value with a store
const cache = new WeakMap<object, object>()

export function proxy<T extends object>(initialValue: T): T {
  const rerender = new CustomEvent('rerender')
  const keys: Set<string | symbol> = new Set() 

  // Attempt to get a store from the cache
  if (cache.has(initialValue)) {
    return cache.get(initialValue) as T
  }

  // Configure a store
  const store: T = new Proxy({ ...initialValue }, {
    get: (target, key) => {
      keys.add(key)
      return Reflect.get(target, key)
    },
    set: (target, key, value) => {
      const status = Reflect.set(target, key, value)
      // Trigger re-render if the key is used by a component
      if (status && keys.has(key)) {
        dispatchEvent(rerender)
        // Remove to get it again after re-render
        keys.delete(key)
      }
  
      return status
    }
  })

  // Cache the store for future usage
  cache.set(initialValue, store)

  return store
}

export function useSnapshot<T extends object>(proxy: T): T {
  const [, setDummy] = useState<boolean>(false)
  // Stupid-ass way to re-render the component
  const update = useCallback(() => {
    setDummy(prev => !prev)
  }, [setDummy])

  // Linsten for rerender event to rerender the component
  useEffect(() => {
    window.addEventListener('rerender', update)
    return () => {
      window.removeEventListener('rerender', update)
    }
  }, [])

  return proxy
}