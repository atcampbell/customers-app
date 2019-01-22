import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1
    }
};

function Header(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" color="inherit" className={classes.root}>
                        Webtrekk Users
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);
