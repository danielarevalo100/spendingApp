import React from "react"
import {Component} from "react"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Numpad from './NumPad/index.js'
import Api from '../../managers/api'
import Notifications from '../../managers/notifications'

import './styles.css'


class Login extends Component{
  constructor(props){
    super(props)
    this.state ={
      password:"",
      wrongPassword:false
    }
  }
  componentWillMount(){

  }

  componentDidMount(){


    if(localStorage.getItem('token')){
      Api.users.login(null,(result)=>{
        if(result){

          Notifications.post('USER_LOGGED_IN')
          if(result.user.type == 1){
            this.props.history.push('/admin')
          }else{
            this.props.history.push('/dashboard')
          }
        }
      })
    }
  }
  handlePasswordChange(e){
    this.setState({
      password: e.target.value
    })

  }
  handleClick(e,n){
    let aux
    let {password} = this.state
    if(n==17){
      aux = password.slice(0,-1)
    }else if(n==15){
      Notifications.post('SHOW_LOADER')
      aux = ''
      const props = this.props
      Api.users.login(this.state.password,(result)=>{
        Notifications.post('HIDE_LOADER')
        if(result){
          localStorage.setItem('token',result.token)
          Notifications.post('USER_LOGGED_IN')
          if(result.user.type == 1){
            props.history.push('/admin')
          }else{
            props.history.push('/dashboard')
          }
        }else{
          this.setState({
            wrongPassword:true
          })
          setTimeout(()=>this.setState({wrongPassword:false}),1500)
        }
      })

    }else{
      aux = password + n
    }

    this.setState({
      password: aux
    })
  }
  render(){
    let {password} = this.state
    return (
      <div className="container" style={{display:'flex',height:window.innerHeight+"px", alignItems:'center'}}>
        <div className="row">
          <div className="col s12 center-align">
            <AccountBalanceIcon color="primary" style={{fontSize:70}}/>
          </div>
          <div className="col s12 m4 offset-m4 center-align">

            <div className="row">
              <div className="col s12">
                <input value={password?password:""} type="number" placeholder="Password" className="center-align" onChange={ (e) => this.handlePasswordChange(e)}/>
                {this.state.wrongPassword?<div className="login-toast"><p>Wrong Password</p></div>:null}
              </div>
              <div className="col s12 center-align">
                <Numpad handleClick={this.handleClick.bind(this)}/>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}
export default Login
