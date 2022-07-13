import React from 'react'
import Robot from './components/Robot'
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

class App extends React.Component<Props, State> {
  // * 生命周期第一阶段：初始化
  // 初始化 state
  constructor(props: any) {
    super(props)
    this.state = {
      robotGellery: [],
      count: 0,
    }
  }
  // 在组件创建好 dom 元素之后、挂载进页面的时候使用
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => this.setState({ robotGellery: data }))
  }

  // * 生命周期第二阶段：更新
  // 在组件接收到一个新的 prop （更新后）时被调用。
  // componentWillReceiveProps

  // 组件初始化以及组件更新的时候都会调用（作用：对比当前的 props 和之前的 state 的变化）
  // getDerivedStateFromProps(nextProps, preState) {}

  // shouldComponentUpdate(nextProps, nextState) {
  //   // 返回 false 不更新，返回 true 更新
  //   return nextState.some !== this.state.some
  // }

  // 组件更新后调用
  // componentDidUpdate() {}

  // * 生命周期第三个阶段：销毁
  // 组件销毁后调用
  // 可以当作析构函数 destructor
  componentWillUnmount() {}
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
        </div>
        <button
          onClick={() => {
            this.setState(
              (preState, preProps) => {
                return { count: preState.count + 1 }
              },
              () => {
                console.log(this.state.count)
              }
            )
            this.setState(
              (preState, preProps) => {
                return { count: preState.count + 1 }
              },
              () => {
                console.log(this.state.count)
              }
            )
          }}>
          Click
        </button>
        <span>{this.state.count}</span>
        <ShoppingCart />
        <div className={styles.robotList}>
          {this.state.robotGellery.map((r) => (
            <Robot key={r.id} id={r.id} email={r.email} name={r.name} />
          ))}
        </div>
      </div>
    )
  }
}

export default App
