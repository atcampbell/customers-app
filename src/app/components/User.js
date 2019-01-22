import React, { Component } from 'react';
import { Typography, Grid, TextField, Button, CircularProgress, MenuItem, Paper } from '@material-ui/core';
import { fetchUserData, saveUserData } from '../utils/utils';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = (theme) => ({
    root: {
        margin: theme.spacing.unit * 3,
        flexGrow: 1
    },
    item: {
        width: '90%',
        margin: theme.spacing.unit * 3
    },
    button: {
        margin: 10
    },
    container: {
        marginTop: theme.spacing.unit * 5,
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    buttons: {
        marginTop: theme.spacing.unit * 3,
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
        this.setState(prevState => ({
            readOnly: !prevState.readOnly
        }));
    }

    handleSaveClick = () => {
        const { create } = this.props;
        const { user } = this.state;

        saveUserData(user);

        create
            ? console.log('CREATE')
            : console.log('UPDATE');
    }

    // TODO convert date back
    formatDate = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD[T]HH:mm:ss');

        return formattedDate;
    }

    handleNameChange = (e, property) => {
        this.setState(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                name: {
                    ...prevState.name,
                    [property]: e.target.value
                }
            }
        }));
    }

    handleUserPropertyChange = (e, property) => {
        const val = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                [property]: val
            }
        }));
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

        if (create) {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                title: 'Create New User'
            }));
        } else {
            const customerID = parseInt(match.params.customerID, 10);
            const user = this.getUser(users, customerID);

            if (user) {
                this.setState(prevState => ({
                    ...prevState,
                    loading: false,
                    title: `${user.name.first} ${user.name.last}`,
                    user
                }));
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    loading: false,
                    user: null
                }));
            }
        }
    }

    render() {
        const { classes, create } = this.props;
        const { readOnly, user, loading, title } = this.state;

        const genderOptions = ['', 'm', 'f'];

        if (loading) {
            return (
                <div className={classes.container}>
                    <CircularProgress />
                </div>
            );
        }

        if (user === null) {
            return (
                <div className={classes.container}>
                    <Typography variant="h4">User not found</Typography>
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {title}
                    </Typography>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12} md={6} >
                                <TextField
                                    fullWidth
                                    disabled={readOnly}
                                    error={this.isFieldValid(user.name.first)}
                                    className={classes.item}
                                    name="firstName"
                                    label="First Name"
                                    value={user.name.first}
                                    margin="normal"
                                    onChange={e => this.handleNameChange(e, 'first')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    disabled={readOnly}
                                    error={this.isFieldValid(user.name.last)}
                                    className={classes.item}
                                    name="lastName"
                                    label="Last Name"
                                    value={user.name.last}
                                    margin="normal"
                                    onChange={e => this.handleNameChange(e, 'last')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    disabled={readOnly}
                                    className={classes.item}
                                    name="dob"
                                    label="Date of Birth"
                                    value={user.birthday}
                                    type="date"
                                    margin="normal"
                                    onChange={e => this.handleUserPropertyChange(e, 'birthday')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    disabled={readOnly}
                                    className={classes.item}
                                    name="gender"
                                    label="Gender"
                                    value={user.gender}
                                    margin="normal"
                                    onChange={e => this.handleUserPropertyChange(e, 'gender')}
                                >
                                    {genderOptions.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    disabled={readOnly}
                                    className={classes.item}
                                    name="lastContact"
                                    label="Last Contact"
                                    type="datetime-local"
                                    value={this.formatDate(user.lastContact)}
                                    margin="normal"
                                    onChange={e => this.handleUserPropertyChange(e, 'lastContact')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    disabled={readOnly}
                                    className={classes.item}
                                    name="customerLifetimeValue"
                                    label="Customer Lifetime Value"
                                    value={user.customerLifetimeValue}
                                    margin="normal"
                                    onChange={e => this.handleUserPropertyChange(e, 'customerLifetimeValue')}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <div className={classes.buttons}>
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
                            disabled={!this.inputIsValid()}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )
        }
    }
}

export default withStyles(styles)(User);