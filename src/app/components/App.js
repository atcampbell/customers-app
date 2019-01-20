import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Users from './Users';
import User from './User';
import Header from './Header';
// import 'typeface-roboto';
import { data } from '../../../data/customers-sample';

class App extends Component {
    render() {
        return (
            <Fragment>
                <CssBaseline />
                <Header />
                <Router>
                    <Switch>
                        <Route exact path="/" render={props => <Users {...props} users={data} />} />
                        {/* Put this back when not using local json */}
                        {/* <Route exact path = "/" component={Users} /> */}
                        {/* TODO get id in here */}
                        <Route exact path="/create" render={props => <User {...props} create={true} />} />
                        <Route exact path="/:customerID" render={props => <User {...props} users={data} />} />
                        {/* <Route exact path="/:customerID" component={User} /> */}
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}

export default App;