import React, { Component, Fragment } from 'react';
import { Typography, Grid, Paper, Button, CircularProgress, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserTable from './UserTable';
import { fetchUserData } from '../utils/utils';

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
    loadingContainer: {
        margin: 40,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: 'auto'
    }
});

// Have users in state here

class Users extends Component {

    state = {
        users: {},
        loading: true
    }

    componentDidMount() {
        const users = fetchUserData();

        this.setState({
            ...this.state,
            loading: false,
            users
        });
    };

    handleAddClick = () => {
        console.log('Add user');
    }

    handleEditClick = customerID => {
        this.props.history.push(`/${customerID}`);
    }

    handleDeleteClick = customerID => {
        console.log(`DELETE ${customerID}`);
    }

    render() {
        const { classes } = this.props;
        const { users, loading } = this.state;

        return (
            loading
                ? (
                    <div className={classes.loadingContainer}>
                        <CircularProgress className={classes.loading} />
                    </div>
                )
                :
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