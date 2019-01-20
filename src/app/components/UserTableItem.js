import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = () => ({
    root: {
        cursor: 'pointer'
    }
});

function UserTableItem(props) {
    const { user, classes, handleEditClick, handleDeleteClick } = props;

    return (
        <TableRow hover key={user.customerID} className={classes.root}>
            <TableCell component="th" scope="row" onClick={() => handleEditClick(user.customerID)}>
                {`${user.name.first} ${user.name.last}`}
            </TableCell>
            <TableCell onClick={() => handleEditClick(user.customerID)}>{user.birthday}</TableCell>
            <TableCell onClick={() => handleEditClick(user.customerID)}>{user.gender}</TableCell>
            <TableCell onClick={() => handleEditClick(user.customerID)}>{user.lastContact}</TableCell>
            <TableCell onClick={() => handleEditClick(user.customerID)}>{user.customerLifetimeValue}</TableCell>
            <TableCell onClick={() => handleDeleteClick(user.customerID)}><DeleteIcon /></TableCell>
        </TableRow>
    )
}

export default withStyles(styles)(UserTableItem);