import React,{Component} from 'react'
import View from '../../components/View'
import Label from '../../components/Label'
import MenuIcon from '@material-ui/icons/MenuRounded';
import SendIcon from '@material-ui/icons/SendRounded';
import RequestIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import CancelIcon from '@material-ui/icons/CancelRounded';
import WatchIcon from '@material-ui/icons/WatchLaterRounded';
import CheckIcon from '@material-ui/icons/CheckCircleRounded';
import Menu from '../../components/Menu'
import Api from '../../managers/api'
import Notifications from '../../managers/notifications'
import CircularProgress from '@material-ui/core/CircularProgress';


import './styles.css'

class Activity extends Component{
    constructor(props){
        super(props)
        this.state={
            menu:false,
            userName:null,
            balance:0,
            id:null,
            transactions:[],
            showLoader:true
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
                    balance: res.user.balance,
                    id: res.user._id
                })
                
                const id = this.state.id
                Api.transactions.get((response)=>{
                    
                    this.setState({
                        transactions:response,
                        showLoader:false
                    })
                })
                Notifications.post('HIDE_LOADER')
            }else{
                Notifications.post('HIDE_LOADER')
                this.props.history.push('/')
            }
        })
    }


    render(){
        const {menu,userName,transactions,showLoader} = this.state
        return(
            <View className='activity' style={{width:'100%',height:'100%',justifyContent:'flex-start'}}>
                <View className='activity-header' style={{width:'100%'}}>
                    <MenuIcon onClick={()=>this.setState({menu:!menu})} style={{fill:'#ffffff',fontSize:35,position:'absolute',left:'15px'}}/>
                    <Label color='white' fontSize={2.4}>Activity</Label>
                </View>
                <View className='activity-container' style={{width:'100%'}}>
                    {showLoader ? <View style={{padding:'40px'}}><CircularProgress/></View> : null}
                    {transactions.map(transaction=>{
                        return(<View style={{width:'100%',padding:'10px',borderBottom:'1px solid #dddddd',flexDirection:'row',justifyContent:'flex-start'}} key={transaction._id}>
                            <View style={{width:'40px',height:'40px',borderRadius:'50px',backgroundColor:'#8895dc'}}>
                                {transaction.type==='SEND'?<SendIcon style={{fill:'#ffffff'}}/>:<RequestIcon style={{fill:'#ffffff'}} />}    
                            </View>
                            <View style={{marginLeft:'10px'}}>
                              <Label fontSize={1.1}>{`${ transaction.type === 'SEND' && 'To: ' || 'From: ' } ${ transaction.email}`}</Label>
                            </View>
                            <View style={{marginLeft:'auto'}}>
                                {transaction.status == 'PENDING'?<WatchIcon style={{fill:'#ffcf64',fontSize:'35px'}}/>:transaction.status == 'DONE'?<CheckIcon style={{fill:'#049a04',fontSize:'35px'}}/>:<CancelIcon style={{fill:'#e31b1b',fontSize:'35px'}}/>}
                                <Label fontSize={.9}>{`${transaction.type=='SEND'?'-':''} $${transaction.amount}`}</Label>
                            </View>
                        </View>)
                    })}
                </View>
                <Menu history={this.props.history} show={menu} userName={userName} onClose={()=>this.setState({menu:false})}/>
            </View>
        )
    }
}

export default Activity
