import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './App'
import Test1 from "./pages/Test1";
class Router extends Component {
    render() {
        return (
            //展示区
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={App} exact>
                    </Route>
                    <Route path='/test1' component={Test1}>
                    </Route>
                    {/*<Route path='/useEffect' component={useEffect}>*/}
                    {/*</Route>*/}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
