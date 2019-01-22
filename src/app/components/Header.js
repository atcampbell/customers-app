import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1
    },
};

class Header extends Component {

    handleTitleClick = () => {
        console.log(this);

        const { history } = this.props;

        console.log('hello?');

        history.push(`/`);
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" color="inherit" className={classes.grow} onClick={this.handleTitleClick}>
                            Webtrekk Users
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header);