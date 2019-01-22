import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CustomerTableItem from './CustomerTableItem';

const styles = {
    root: {
        minWidth: 700
    }
};

class CustomerTable extends Component {
    render() {
        const { customers, classes } = this.props;

        return (
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
                    {customers.map(customer => (
                        <CustomerTableItem
                            key={customer.customerID}
                            customer={customer}
                            {...this.props}
                        />
                    ))}
                </TableBody>
            </Table>
        );
    }
}

export default withStyles(styles)(CustomerTable);
