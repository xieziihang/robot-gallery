import React, { useContext } from 'react'
import styles from './Robot.module.css'
import { appContext, appSetStateContext } from '../AppState'
import { withAddToCart } from './AddToCart'

export interface RobotProps {
  id: number
  name: string
  email: string
  addToCart: (id: number, name: string) => void
}

// 这里的 FC 是 functional component 的缩写
const Robot: React.FC<RobotProps> = ({ id, name, email, addToCart }) => {
  const value = useContext(appContext)

  return (
    // 旧版 React.createContext(defaultContextValue) 接收方法
    // <appContext.Consumer>
    //   {(value) => {
    //     return (
    <div className={styles.cardContainer}>
      <img src={`https://robohash.org/${id}`} alt="robot" />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={() => addToCart(id, name)}>加入购物车</button>
    </div>
    //     )
    //   }}
    // </appContext.Consumer>
  )
}

export default withAddToCart(Robot)
