import React,{Component} from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'
import Login from './pages/login/index.js';
import Dashboard from './pages/dashboard/index.js'
import Activity from './pages/Activity/index.js'
import View from "./components/View/index.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import Notifications from './managers/notifications'

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            showLoader:false
        }
    }
    componentDidMount(){
        Notifications.listen('SHOW_LOADER',()=>{this.setState({showLoader: true})})


        Notifications.listen('HIDE_LOADER',()=>{this.setState({showLoader: false})})
    }
    render(){
        return(
            <Router>
                {this.state.showLoader?<View style={{position:'fixed',top:'0',left:'0',width:'100%',height:'100vh',zIndex:'10',backgroundColor:'#ffffff'}}><CircularProgress/></View>:null}
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path='/activity'component={Activity}/>
                </Switch>
            </Router>
        )
    }
}

export default App