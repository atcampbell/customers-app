import React, { Component } from 'react';
import { Button, Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserTableItem from './UserTableItem';

const styles = {
    root: {
        minWidth: 700
    }
}

class UserTable extends Component {
    render() {
        const { users, classes } = this.props;

        return (

            // {/* if no users display warning */}
            // {!users || !users.length
            //     ? <div>No Users</div>
            //     : <div>Eres the table</div>}

            <Table className={classes.root}>
                <TableHead>
                    <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>D.O.B</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Last Contact</TableCell>
                        <TableCell>Lifetime Value</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <UserTableItem key={user.customerID} user={user} {...this.props}/>
                    ))}
                </TableBody>
            </Table>
        )
    }
}

export default withStyles(styles)(UserTable);