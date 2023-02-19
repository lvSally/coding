


// // This is a React coding question from BFE.dev

import React from 'react'

export function useClickOutside<T extends HTMLDivElement>(callback: () => void):React.RefObject<T> {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    function clickFn({target}:Event) {
      if(target && ref.current && ref.current.contains(target as Node)) {
        callback()
      }
    }
    document.addEventListener('click', clickFn)
    return document.removeEventListener('click', clickFn)
  })

  return ref
}

// to try your code on the right panel
// export App() component like below

export function App() {
  const ref = useClickOutside(() => {
    console.log('clicked outside')
  });
  
  return <div ref={ref} onClick={() => {
    console.log(ref)
  }}>点击这里</div>
}