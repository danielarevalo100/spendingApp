import React from "react"
import {Component} from "react"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Numpad from './NumPad/index.js'

class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
            password:""
        }
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
        console.log(this.state)
    }
    handleClick(e,n){
        let aux
        let {password} = this.state
        if(n==17){
            aux = password.slice(0,-1)
        }else if(n==15){
            aux = password
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