import React, { Component } from 'react'

/* components*/
import View from '../../components/View'
import Label from '../../components/Label'

/* managers */
import Api from '../../managers/api'
/* icons */
import SendIcon from '@material-ui/icons/SendRounded';
import RequestIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import CancelIcon from '@material-ui/icons/CancelRounded';
import WatchIcon from '@material-ui/icons/WatchLaterRounded';
import CheckIcon from '@material-ui/icons/CheckCircleRounded';

/* styles */
import './styles.css'

class AdminDashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      transactions: []
    }
  }

  componentDidMount(){
    Api.admin.transactions.get((response) => {
      this.setState({ transactions: response })
    })
  }
  render(){
    return( 
      <View style={{ width: '100%', height: '100vh', justifyContent: 'flex-start'}}>
        <View className='admin-dashboard-header' style={{width:'100%'}}>
          <Label color='white' fontSize={2.4}>Pending transactions</Label>
        </View>
        <View style={{flex:'1', width: '100%', justifyContent: 'flex-start'}}>
          { this.state.transactions.map( transaction => {
            return(<View style={{width:'100%',padding:'10px',borderBottom:'1px solid #dddddd',flexDirection:'row',justifyContent:'flex-start'}} key={transaction._id}>
              <View style={{width:'40px',height:'40px',borderRadius:'50px',backgroundColor:'#8895dc'}}>
                {transaction.type==='SEND'?<SendIcon style={{fill:'#ffffff'}}/>:<RequestIcon style={{fill:'#ffffff'}} />}    
              </View>
              <View style={{marginLeft:'10px', alignItems: 'flex-start'}}>
                <Label fontSize={1.1}>{`${transaction.user.userName} ${ transaction.type === 'SEND' && 'send to: ' || 'Request from: ' } ${ transaction.email} - $${transaction.amount}`}</Label>
                <Label>Transaction date:  {this.getDate(transaction.date)}</Label>
              </View>
              <View style={{marginLeft:'auto'}}>
                <CheckIcon style={{fill:'#049a04',fontSize:'45px'}}/>
              </View>
              <View style={{marginLeft:'15px'}}>
                <CancelIcon style={{fill:'#e31b1b',fontSize:'45px'}}/>
              </View>
            </View>)
          } ) }

        </View>
      </View> 
    )
  }
  getDate(date){
    const dateObject = new Date(date)
    return dateObject.getDate()+'/'+(dateObject.getMonth() + 1)+'/'+dateObject.getFullYear()
  }
}

export default AdminDashboard
