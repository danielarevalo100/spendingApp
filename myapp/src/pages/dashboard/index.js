import React, { useCallback } from 'react'
import {Component} from 'react'

import Api from '../../managers/api'
import Notifications from '../../managers/notifications'


//Components

import View from '../../components/View'
import Label from '../../components/Label'
import Send from './Send'
import Request from './Request'
import Menu from '../../components/Menu'
// styles

import './styles.css'

// icons

import SendIcon from '@material-ui/icons/SendRounded';
import RequestIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import MenuIcon from '@material-ui/icons/MenuRounded';

//import ArrowBackIcon from '@material-ui/icons/ArrowBackRounded';


class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            userName:null,
            balance:null,
            showSend:true,
            menu:false,
            type:'SEND',
            toastMessage:null,
            send:{},
            request:{}
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    //Handlers

    handleInputChange(e,type){
        const name = e.target.name
        const value = e.target.value
        const obj = type
        this.setState({
            ...this.state,
            [obj]:{
                ...this.state[obj],
                [name]:value
            }
        })
        
    }
    handleCloseMenu(){
        this.setState({
            menu:false
        })
    }
    handleSendSubmit(){
        
        const {balance,type,send,request}= this.state;
        if(type==='SEND'){
            if(send.email && send.amount && send.emailConfirmation){
                if(send.email === send.emailConfirmation){
                    if(Number(send.amount) <= Number(balance)){
                        Api.transactions.create(send.email,send.amount,type,null,(response)=>{
                            
                            if('newBalance' in response){
                                this.setState({toastMessage:'Transfer successful',balance:Number(response.newBalance.toFixed(1)),send:{}})
                            }
                        })
                    }else{
                        this.setState({toastMessage:'Insuficient founds'})
                    }
                }else{
                    this.setState({toastMessage:'Emails does not match'})
                }
            }else{
                this.setState({toastMessage:'You must fill all form fields'})
            }
        }else if(type==='REQUEST'){
            
            if(request.email&&request.name&&request.amount){
                Api.transactions.create(request.email,request.amount,type,request.name,(response)=>{
                    this.setState({toastMessage:'Transfer successful',request:{}})
                })
            }else{
                this.setState({toastMessage:'You must fill all form fields'})
            }
        }

    }
    // component life cicle
    componentDidUpdate(){
        if(this.state.toastMessage){
            setTimeout(()=>{
                this.setState({
                    toastMessage:null
                })
            },2000)
        }
    }
    componentDidMount(){
        this.checkLogin()
    }
    checkLogin(){
        Notifications.post('SHOW_LOADER')
        Api.users.login(null,(res)=>{
            
            if(res){
                this.setState({
                    userName: res.user.userName,
                    balance: res.user.balance.toFixed(1),
                    
                })
                Notifications.post('HIDE_LOADER')
            }else{
                Notifications.post('HIDE_LOADER')
                this.props.history.push('/')
            }
        })
    }

    render(){
        const {balance,userName,showSend,menu,request,send}=this.state
        return(
            <View className='dashboard'  style={{width:'100%',height:'100%',justifyContent:'flex-start'}}>
                <View className='dashboard-header' style={{width:'100%'}}>
                    <MenuIcon onClick={()=>this.setState({menu:!menu})} style={{fill:'#ffffff',fontSize:35,position:'absolute',left:'15px'}}/>
                    <Label color='white' fontSize={2.4}>Home</Label>
                </View>
                <View className='dashboard-balance'>
                    <Label fontSize={2.5}>{balance?'$'+balance:'$'+0}</Label>
                    <View><Label fontSize={1}>Current balance</Label></View>
                </View>
                <View className='dashboard-actions'>
                    <View className='dashboard-actions-tabs'>
                        <View className='dashboard-actions-tabs-send' onClick={()=>{this.setState({showSend:true,type:'SEND'})}}>
                            <SendIcon/>
                            <Label>send</Label>
                        </View>
                        <View className='dashboard-actions-tabs-request' onClick={()=>{this.setState({showSend:false,type:'REQUEST'})}} style={{borderLeft:'1px solid #cccccc'}}>
                            <RequestIcon/>
                            <Label>request</Label>
                        </View>
                    <View className="dashboard-actions-tabs-marker" style={{left:showSend?'0':'50%'}}></View>
                    </View>
                    {showSend?
                        <Send handleForm={this.handleInputChange} handleSubmit={this.handleSendSubmit.bind(this)} data={{email: send.email||'', emailConfirmation: send.emailConfirmation||'', amount:send.amount||''}}/>:
                        <Request handleSubmit={this.handleSendSubmit.bind(this)} handleForm={this.handleInputChange} data={{email: request.email||'', name: request.name||'', amount:request.amount||''}}/>
                    }
                </View>
                
                <Menu history={this.props.history} show={menu} userName={userName} onClose={this.handleCloseMenu.bind(this)}/>
                <View className='dashboard-toast' style={{width:'100%',position:'absolute',top:this.state.toastMessage?'0':'-30%',transition:'.3s',backgroundColor:'#221858',padding:'20px'}}>
                    <Label fontSize={1.2} color='white'>{this.state.toastMessage}</Label>
                </View>
            </View>
        )
    }
}

export default Dashboard
