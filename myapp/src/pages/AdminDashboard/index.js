import React, { Component } from 'react'

/* components*/
import View from '../../components/View'
import Label from '../../components/Label'
import Menu from '../../components/Menu'

/* managers */
import Api from '../../managers/api'
import Notifications from '../../managers/notifications'

/* icons */
import SendIcon from '@material-ui/icons/SendRounded';
import RequestIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import CancelIcon from '@material-ui/icons/CancelRounded';
import WatchIcon from '@material-ui/icons/WatchLaterRounded';
import CheckIcon from '@material-ui/icons/CheckCircleRounded';
import MenuIcon from '@material-ui/icons/MenuRounded';

/* styles */
import './styles.css'

class AdminDashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      transactions: [],
      menu: false
    }
  }

  componentDidMount(){
    Notifications.post('SHOW_LOADER')
    Api.admin.transactions.get((response) => {
      this.setState({ transactions: response })
      Notifications.post('HIDE_LOADER')
    })
  }

  handleChangeStatus(id, status, index) {
    
    Notifications.post('SHOW_LOADER')
    Api.admin.transactions.changeStatus({id, status}, (response) => {
      Notifications.post('HIDE_LOADER')
      console.log(response)

      const aux = [...this.state.transactions]
      aux.splice(index, 1);
      this.setState({
        transactions: aux
      })
    })
  }
  render(){
     const { menu } = this.state;
    return( 
      <View style={{ width: '100%', height: '100vh', justifyContent: 'flex-start'}}>
        <View className='admin-dashboard-header' style={{width:'100%'}}>
          <MenuIcon onClick={() => this.setState({menu:!menu})} style={{fill:'#ffffff',fontSize:35,position:'absolute',left:'15px'}}/>
          <Label color='white' fontSize={2.4}>Pending transactions</Label>
        </View>
        <View style={{flex:'1', width: '100%', justifyContent: 'flex-start'}}>
          { this.state.transactions.map( (transaction, index) => {
            return(<View style={{width:'100%',padding:'10px',borderBottom:'1px solid #dddddd',flexDirection:'row',justifyContent:'flex-start'}} key={transaction._id}>
              <View style={{width:'40px',height:'40px',borderRadius:'50px',backgroundColor:'#8895dc'}}>
                {transaction.type==='SEND'?<SendIcon style={{fill:'#ffffff'}}/>:<RequestIcon style={{fill:'#ffffff'}} />}    
              </View>
              <View style={{marginLeft:'10px', alignItems: 'flex-start'}}>
                <Label fontSize={1.1}>{`${transaction.user.userName} ${ transaction.type === 'SEND' && 'send to: ' || 'Request from: ' } ${ transaction.email} - $${transaction.amount}`}</Label>
                <Label>Transaction date:  {this.getDate(transaction.date)}</Label>
              </View>
              <View onClick={ () => this.handleChangeStatus(transaction._id, 'DONE', index) } style={{marginLeft:'auto'}}>
                <CheckIcon style={{fill:'#049a04',fontSize:'45px'}}/>
              </View>
              <View onClick={ () => this.handleChangeStatus(transaction._id, 'CANCELLED', index) } style={{marginLeft:'15px'}}>
                <CancelIcon style={{fill:'#e31b1b',fontSize:'45px'}}/>
              </View>
            </View>)
          } ) }

        </View>
        <Menu history={this.props.history} show={menu} userName={'Admin'} onClose={ () => this.setState({menu: false}) }/>
      </View> 
    )
  }
  getDate(date){
    const dateObject = new Date(date)
    return dateObject.getDate()+'/'+(dateObject.getMonth() + 1)+'/'+dateObject.getFullYear()
  }
}

export default AdminDashboard
