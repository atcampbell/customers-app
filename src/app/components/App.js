import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomersContainer from './CustomersContainer';
import CustomerContainer from './CustomerContainer';
import Header from './Header';
class App extends Component {
    render() {
        return (
            <Fragment>
                <CssBaseline />
                <Router>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={CustomersContainer} />
                            <Route
                                exact
                                path="/create"
                                render={props => <CustomerContainer {...props} create={true} />}
                            />
                            <Route exact path="/:customerID" component={CustomerContainer} />
                        </Switch>
                    </div>
                </Router>
            </Fragment>
        );
    }
}

export default App;
