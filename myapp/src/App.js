import React,{Component} from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'
import Login from './pages/login/index.js';
import Dashboard from './pages/dashboard/index.js';
import AdminDashboard from './pages/AdminDashboard/index.js';
import Activity from './pages/Activity/index.js';
import View from "./components/View/index.js";
import Label from "./components/Label/index.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import Notifications from './managers/notifications'
import Api from './managers/api'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      showLoader:false,
      userAuth: false
    }
  }
  componentDidMount(){
    Notifications.listen('SHOW_LOADER',()=>{this.setState({showLoader: true})})
    Notifications.listen('USER_LOGGED_IN',()=>{this.setState({userAuth: true})})
    Notifications.listen('USER_LOGGED_OUT',()=>{this.setState({userAuth: false})})


    Notifications.listen('HIDE_LOADER',()=>{this.setState({showLoader: false})})

    this.checkLogin();
  }

  checkLogin(){
    Notifications.post('SHOW_LOADER')
    Api.users.login(null,(res) => {
      Notifications.post('HIDE_LOADER')
      console.log('here')
      if(res){
        this.setState({
          userAuth: true
        })
      }
    })
  }

  render(){
    const { showLoader, userAuth } =  this.state;
    return(
      <Router>
        {showLoader ? <View style={{position:'fixed',top:'0',left:'0',width:'100%',height:'100vh',zIndex:'10',backgroundColor:'#ffffff'}}><Label fontSize='3' color='#3f51b5'>Arevalo Banking</Label><CircularProgress/></View>:null}
        <Switch>
          { userAuth && <Route exact path="/dashboard" component={Dashboard} /> }
          { userAuth && <Route exact path="/admin" component={AdminDashboard} /> }
          { userAuth && <Route exact path="/activity" component={Activity} /> }
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    )
  }
}

export default App
