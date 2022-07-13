import React, { ReactNode, useState } from 'react'

interface AppStateValue {
  username: string
  shoppingCart: { items: { id: number; name: string }[] }
}

const defaultContextValue: AppStateValue = {
  username: '阿莱克斯',
  shoppingCart: { items: [] },
}

export const appContext = React.createContext(defaultContextValue)
export const appSetStateContext = React.createContext<
  React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined)

// 这里的 AppStateProvider 就相当于一个高阶函数 HOC
// 作用：包裹所有子组件并从全局角度提供数据支持

export const AppStateProvider: React.FC<any> = (props: any) => {
  const [state, setState] = useState(defaultContextValue)

  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}
