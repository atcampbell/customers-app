import React from 'react';
import {
    Typography,
    Grid,
    TextField,
    Button,
    CircularProgress,
    MenuItem,
    Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { formatDate } from '../utils/helpers';

const styles = theme => ({
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
        marginTop: theme.spacing.unit * 3
    }
});

function Customer(props) {
    const {
        classes,
        customer,
        loading,
        readOnly,
        title,
        nameFieldValid,
        customerDataValid,
        onCustomerNameChange,
        onCustomerFieldChange,
        onEditClick,
        onSaveClick
    } = props;

    const genderOptions = ['', 'm', 'f'];

    if (loading) {
        return (
            <div className={classes.container}>
                <CircularProgress />
            </div>
        );
    }

    if (customer === null) {
        return (
            <div className={classes.container}>
                <Typography variant="h4">Customer not found</Typography>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit">
                {title}
            </Typography>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            disabled={readOnly}
                            error={nameFieldValid(customer.name.first)}
                            className={classes.item}
                            name="firstName"
                            label="First Name"
                            value={customer.name.first}
                            margin="normal"
                            onChange={e => onCustomerNameChange(e, 'first')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            disabled={readOnly}
                            error={nameFieldValid(customer.name.last)}
                            className={classes.item}
                            name="lastName"
                            label="Last Name"
                            value={customer.name.last}
                            margin="normal"
                            onChange={e => onCustomerNameChange(e, 'last')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            disabled={readOnly}
                            className={classes.item}
                            name="dob"
                            label="Date of Birth"
                            value={customer.birthday}
                            type="date"
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => onCustomerFieldChange(e, 'birthday')}
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
                            value={customer.gender}
                            margin="normal"
                            onChange={e => onCustomerFieldChange(e, 'gender')}
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
                            value={formatDate(customer.lastContact)}
                            margin="normal"
                            onChange={e => onCustomerFieldChange(e, 'lastContact')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            disabled={readOnly}
                            className={classes.item}
                            name="customerLifetimeValue"
                            label="Customer Lifetime Value"
                            value={customer.customerLifetimeValue}
                            margin="normal"
                            onChange={e => onCustomerFieldChange(e, 'customerLifetimeValue')}
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
                    onClick={onEditClick}
                >
                    Edit
                </Button>
                <Button
                    className={classes.button}
                    id="save-button"
                    color="secondary"
                    variant="outlined"
                    onClick={() => onSaveClick()}
                    disabled={!customerDataValid()}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(Customer);
