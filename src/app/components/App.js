import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomersContainer from './CustomersContainer';
import CustomerContainer from './CustomerContainer';
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
                            {/* <Route exact path="/" render={props => <Customers {...props} />} /> */}
                            {/* Put this back when not using local json */}
                            <Route exact path="/" component={CustomersContainer} />
                            {/* TODO get id in here */}
                            <Route
                                exact
                                path="/create"
                                render={props => <CustomerContainer {...props} create={true} />}
                            />
                            <Route exact path="/:customerID" component={CustomerContainer} />
                            {/* <Route exact path="/:customerID" render={props => <Customer {...props} />} /> */}
                            {/* <Route exact path="/:customerID" component={User} /> */}
                        </Switch>
                    </div>
                </Router>
            </Fragment>
        );
    }
}

export default App;
