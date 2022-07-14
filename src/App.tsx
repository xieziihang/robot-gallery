import React, { useState, useEffect } from 'react'
import logo from './assets/icons/logo.svg'
import ShoppingCart from './components/ShoppingCart'
import styles from './App.module.css'
import Robot from './components/Robot'

const App: React.FC = (props) => {
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `机器人画廊`
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const responses = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        const data = await responses.json()
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
      <ShoppingCart />
      {!error || (error !== '' && <div>网站出错: {error}</div>)}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r) => (
            <Robot key={r.id} id={r.id} name={r.name} email={r.email} />
          ))}
        </div>
      ) : (
        <h2>Loading 加载中</h2>
      )}
    </div>
  )
}

export default App
