import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { formatDateFromNow } from '../utils/helpers';

const styles = () => ({
    root: {
        cursor: 'pointer'
    }
});

function CustomerTableItem(props) {
    const { classes, customer, onEditClick, onDeleteClick } = props;

    return (
        <TableRow hover key={customer.customerID} className={classes.root}>
            <TableCell component="th" scope="row" onClick={() => onEditClick(customer.customerID)}>
                {`${customer.name.first} ${customer.name.last}`}
            </TableCell>
            <TableCell onClick={() => onEditClick(customer.customerID)}>
                {customer.birthday}
            </TableCell>
            <TableCell onClick={() => onEditClick(customer.customerID)}>
                {customer.gender}
            </TableCell>
            <TableCell onClick={() => onEditClick(customer.customerID)}>
                {formatDateFromNow(customer.lastContact)}
            </TableCell>
            <TableCell onClick={() => onEditClick(customer.customerID)}>
                {customer.customerLifetimeValue}
            </TableCell>
            <TableCell onClick={() => onDeleteClick(customer.customerID)}>
                <DeleteIcon />
            </TableCell>
        </TableRow>
    );
}

export default withStyles(styles)(CustomerTableItem);
