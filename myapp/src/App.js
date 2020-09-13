import React,{Component} from "react";
import Login from './pages/login';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'

class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App