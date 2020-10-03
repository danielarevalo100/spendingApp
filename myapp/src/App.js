import React,{Component} from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'
import Login from './pages/login/index.js';
import Dashboard from './pages/dashboard/index.js'
import Activity from './pages/Activity/index.js'

class App extends Component{
    render(){
        return(
            <Router>
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