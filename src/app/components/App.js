import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Users from './Users';
import User from './User';
import Header from './Header';
// import { data } from '../../../data/customers-sample';

// TODO to functional component
class App extends Component {
    render() {
        return (
            <Fragment>
                <CssBaseline />
                <Router>
                    <div>
                        <Header />
                        {/* TODO - DONT NEED THESE PROPS ANYMORE DO THE SIMPLE WAY */}
                        {/* <Route path="/" Component={Header} /> */}
                        <Switch>
                            <Route exact path="/" render={props => <Users {...props} />} />
                            {/* Put this back when not using local json */}
                            {/* <Route exact path = "/" component={Users} /> */}
                            {/* TODO get id in here */}
                            <Route exact path="/create" render={props => <User {...props} create={true} />} />
                            <Route exact path="/:customerID" render={props => <User {...props} />} />
                            {/* <Route exact path="/:customerID" component={User} /> */}
                        </Switch>
                    </div>
                </Router>
            </Fragment>
        )
    }
}

export default App;