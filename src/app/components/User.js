import React, { Component, Fragment } from 'react';
import { Paper, List, ListItem, Typography, Grid, TextField, Button, CircularProgress, MenuItem, Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { fetchUserData, saveUserData } from '../utils/utils';

// TODO split out loading component

const styles = () => ({
    root: {
        margin: 20,
        padding: 20
    },
    item: {
        width: '100%',
        padding: 20
    },
    button: {
        margin: 10
    },
    loadingContainer: {
        margin: 40,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: 'auto'
    },
    loading: {
    }
})

class User extends Component {
    state = {
        readOnly: true,
        loading: true,
        create: false,
        user: {
            name: {
                first: '',
                last: ''
            },
            birthday: '',
            gender: '',
            lastContact: '',
            customerLifetimeValue: ''
        },
        title: ''
    }

    handleEditClick = () => {
        this.setState(() => ({
            readOnly: !this.state.readOnly
        }));
    }

    // TODO refactor and test some of these functions
    handleSaveClick = () => {
        const { create } = this.props;
        const { user } = this.state;

        // TODO get a better way of getting users in here
        // either in state and just store the one user along side?
        // function to format the users
        saveUserData(user);

        create
            ? console.log('CREATE')
            : console.log('UPDATE');
    }

    formatDate = (date) => {
        const formattedDate = moment(date, "YYYYMMDD").fromNow();
        return formattedDate;
    }

    handleNameChange = (e, property) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                name: {
                    ...this.state.user.name,
                    [property]: e.target.value
                }
            }
        });
    }

    handleUserPropertyChange = (e, property) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [property]: e.target.value
            }
        });
    }

    getUser = (users, customerID) => {
        const user = users.find(u => u.customerID === customerID);

        return user ? user : null;
    }

    inputIsValid = () => {
        const { user } = this.state;
        return user.name.first && user.name.last ? true : false;
    }

    isFieldValid = name => {
        const { readOnly } = this.state;

        return !readOnly && !name ? true : false;
    }

    componentDidMount() {
        const { match, create } = this.props;

        const users = fetchUserData();

        if (!create) {
            const customerID = parseInt(match.params.customerID, 10);
            const user = this.getUser(users, customerID);

            user
                ? (
                    this.setState({
                        ...this.state,
                        loading: false,
                        title: `${user.name.first} ${user.name.last}`,
                        user
                    }))
                : (
                    this.setState({
                        ...this.state,
                        loading: false,
                        user: null
                    }));
        } else {
            this.setState({
                ...this.state,
                loading: false,
                title: 'Create New User'
            })
        }
    }

    render() {
        const { classes, create } = this.props;
        const { readOnly, user, loading, title } = this.state;

        const genderOptions = ['', 'm', 'f'];

        const isValid = this.inputIsValid();

        return (
            loading
                ? (
                    <div className={classes.loadingContainer}>
                        <CircularProgress className={classes.loading} />
                    </div>
                )
                : user === null
                    ? <Typography>User not found</Typography> //TODO new styled component
                    : (
                        <Grid container className={classes.root}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="inherit" className={classes.grow}>{title}</Typography>
                            </Grid>
                            {/* TODO reactive */}
                            <Grid item xs={12} md={5} >
                                <TextField
                                    disabled={readOnly}
                                    error={this.isFieldValid(user.name.first)}
                                    className={classes.item}
                                    fullWidth
                                    name="firstName"
                                    label="First Name"
                                    value={user.name.first}
                                    margin="normal"
                                    onChange={e => this.handleNameChange(e, 'first')}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    disabled={readOnly}
                                    error={this.isFieldValid(user.name.last)}
                                    className={classes.item}
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    value={user.name.last}
                                    margin="normal"
                                    onChange={e => this.handleNameChange(e, 'last')}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    disabled={readOnly}
                                    fullWidth
                                    className={classes.item}
                                    name="dob"
                                    label="Date of Birth"
                                    value={user.birthday}
                                    type="date"
                                    margin="normal"
                                    onChange={e => this.handleUserPropertyChange(e, 'birthday')}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                {/* TODO refator to new file? */}
                                <TextField
                                    disabled={readOnly}
                                    fullWidth
                                    className={classes.item}
                                    name="gender"
                                    label="Gender"
                                    value={user.gender}
                                    margin="normal"
                                    select
                                    onChange={e => this.handleUserPropertyChange(e, 'gender')}
                                >
                                    {genderOptions.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {!create &&
                                <Fragment>
                                    <Grid item xs={12} md={5}>
                                        <TextField
                                            fullWidth
                                            disabled
                                            className={classes.item}
                                            name="lastContact"
                                            label="Last Contact"
                                            value={this.formatDate(user.lastContact)}
                                            margin="normal"
                                            onChange={e => this.handleUserPropertyChange(e, 'lastContact')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <TextField
                                            fullWidth
                                            disabled
                                            className={classes.item}
                                            name="customerLifetimeValue"
                                            label="Customer Lifetime Value"
                                            value={user.customerLifetimeValue}
                                            margin="normal"
                                            onChange={e => this.handleUserPropertyChange(e, 'customerLifetimeValue')}
                                        />
                                    </Grid>
                                </Fragment>
                            }
                            <Grid item xs={12}>
                                <Button
                                    className={classes.button}
                                    id="edit-button"
                                    color="primary"
                                    variant="outlined"
                                    onClick={this.handleEditClick}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className={classes.button}
                                    id="save-button"
                                    color="secondary"
                                    variant="outlined"
                                    onClick={this.handleSaveClick}
                                    disabled={!isValid}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    )
        )
    }
}

export default withStyles(styles)(User);