import React, { Component, Fragment } from 'react';
import { Typography, Grid, Paper, Button, CircularProgress, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserTable from './UserTable';
import { fetchUserData } from '../utils/utils';

// TODO this is a mess but tidy this up then do tests.
// just do whatever and finish

const styles = (theme) => ({
    root: {
        marginTop: 20,
        paddingTop: 20
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    button: {
        marginTop: 20
    },
    container: {
        marginTop: theme.spacing.unit * 5,
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }
});

class Users extends Component {
    state = {
        users: {},
        loading: true
    }

    // THIS GET AND POST TO UTILS
    getCustomerData = async () => {
        // TODO make simple config object
        const response = await fetch('http://localhost:5000/customer-data');

        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }

        return body;
    };

    postCustomerData = async (customers) => {
        const data = JSON.stringify(customers);

        const response = await fetch('http://localhost:5000/customer-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        });

        // TODO what to do with this? just return
        const body = await response.json();
    }

    async componentDidMount() {
        const customers = await this.getCustomerData();

        this.setState({
            ...this.state,
            loading: false,
            users: customers
        });
    };

    handleAddClick = () => {
        const { history } = this.props;

        history.push(`/create`);
    }

    handleEditClick = customerID => {
        const { history } = this.props;

        history.push(`/${customerID}`);
    }

    fetchCustomerData = async () => {
        const customers = await this.getCustomerData();

        this.setState(prevState => ({
            ...prevState,
            loading: false,
            users: customers
        }));
    }

    // this is all thats needed here - duplicate as edit in other file
    handleDeleteClick = async (customerID) => {
        const id = parseInt(customerID, 10);
        const customers = this.state.users.filter(c => c.customerID !== id);

        await this.postCustomerData(customers);
        this.setState(prevState => ({
            ...prevState,
            loading: true
        }));
        this.fetchCustomerData();
    }

    render() {
        const { classes } = this.props;
        const { loading, users } = this.state;

        if (loading) {
            return (
                <div className={classes.container}>
                    <CircularProgress className={classes.loading} />
                </div>
            )
        }

        if (!users || !users.length) {
            return (
                <div className={classes.container}>
                    <Typography variant="h4">No users found</Typography>
                </div>
            )
        }

        return (
            <Grid container className={classes.root}> {/* TODO test if users exist */}
                <Hidden mdDown><Grid item xs={1} /></Hidden>
                <Grid item xs={12} md={10}>
                    <Typography variant="h6" color="inherit" className={classes.grow}>All Users</Typography>
                </Grid>
                <Hidden mdDown><Grid item xs={1} /></Hidden>

                <Hidden mdDown><Grid item xs={1} /></Hidden>
                <Grid item xs={12} md={10}>
                    <Paper className={classes.paper}>
                        <UserTable users={users} handleEditClick={this.handleEditClick} handleDeleteClick={this.handleDeleteClick} />
                    </Paper>
                </Grid>
                <Hidden mdDown><Grid item xs={1} /></Hidden>

                <Hidden mdDown><Grid item xs={1} /></Hidden>
                <Grid item xs={12} md={10}>
                    <Button
                        className={classes.button}
                        id="add-button"
                        color="primary"
                        variant="outlined"
                        className={classes.button}
                        onClick={this.handleAddClick}
                    >
                        Add User
                    </Button>
                </Grid>
                <Hidden mdDown><Grid item xs={1} /></Hidden>
            </Grid>
        )
    }
}

export default withStyles(styles)(Users);