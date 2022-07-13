import React, { useState, useEffect } from 'react'
import Robot from './components/Robot'
import RobotDiscount from './components/RobotDiscount'
import logo from './assets/images/logo.svg'
import styles from './App.module.css'
import ShoppingCart from './components/ShoppingChart'

interface Props {}
interface State {
  // 资源来自网络请求，返回的数据类型是不受限制的
  // 前端强行定义API数据类型，违反前后端分离的原则（所以这里的 robotGellery: any[]）
  robotGellery: any[]
  count: number
}

const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    document.title = `点击次数为${count}`
  }, [count])

  // Effect 中使用 async await 异步模式
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        // .then((response) => response.json())
        // .then((data) => setRobotGallery(data))
        const data = await response.json()
        setRobotGallery(data)
      } catch (e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
      </div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}>
        Click
      </button>
      <span>count：{count}</span>
      <ShoppingCart />
      {(error || error !== '') && <div>网站出错：{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r: any, index: number) =>
            index % 2 === 0 ? (
              <RobotDiscount
                key={r.id}
                id={r.id}
                email={r.email}
                name={r.name}
              />
            ) : (
              <Robot key={r.id} id={r.id} email={r.email} name={r.name} />
            )
          )}
        </div>
      ) : (
        <h2>loading 加载中</h2>
      )}
    </div>
  )
}

export default App
