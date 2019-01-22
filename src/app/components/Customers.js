import React from 'react';
import { Typography, Grid, Paper, Button, CircularProgress, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CustomerTable from './CustomerTable';

const styles = theme => ({
    root: {
        marginTop: 20,
        paddingTop: 20
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
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

function Customers(props) {
    const { classes, loading, customers, onAddClick, onDeleteClick, onEditClick } = props;

    if (loading) {
        return (
            <div className={classes.container}>
                <CircularProgress className={classes.loading} />
            </div>
        );
    }

    if (!customers || !customers.length) {
        return (
            <div className={classes.container}>
                <Typography variant="h4">No customers found</Typography>
            </div>
        );
    }

    return (
        <Grid container className={classes.root}>
            <Hidden mdDown>
                <Grid item xs={1} />
            </Hidden>
            <Grid item xs={12} md={10}>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    All Customers
                </Typography>
            </Grid>
            <Hidden mdDown>
                <Grid item xs={1} />
            </Hidden>
            <Hidden mdDown>
                <Grid item xs={1} />
            </Hidden>
            <Grid item xs={12} md={10}>
                <Paper className={classes.paper}>
                    <CustomerTable
                        customers={customers}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    />
                </Paper>
            </Grid>
            <Hidden mdDown>
                <Grid item xs={1} />
            </Hidden>
            <Hidden mdDown>
                <Grid item xs={1} />
            </Hidden>
            <Grid item xs={12} md={10}>
                <Button
                    className={classes.button}
                    id="add-button"
                    color="primary"
                    variant="outlined"
                    className={classes.button}
                    onClick={onAddClick}
                >
                    Add User
                </Button>
            </Grid>
            <Hidden mdDown>
                <Grid item xs={1} />
            </Hidden>
        </Grid>
    );
}

export default withStyles(styles)(Customers);
