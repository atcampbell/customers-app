import React, { Component } from 'react';
import { getCustomerData, postCustomerData } from '../utils/fetchCustomerData';
import Customers from './Customers';

class CustomerContainer extends Component {
    state = {
        customers: {},
        loading: true
    };

    async componentDidMount() {
        const customers = await getCustomerData();

        this.setState(() => ({
            ...this.state,
            loading: false,
            customers
        }));
    }

    fetchCustomerData = async () => {
        const customers = await getCustomerData();

        this.setState(prevState => ({
            ...prevState,
            loading: false,
            users: customers
        }));
    };

    handleAddClick = () => {
        const { history } = this.props;

        history.push(`/create`);
    };

    handleEditClick = customerID => {
        const { history } = this.props;

        history.push(`/${customerID}`);
    };

    handleDeleteClick = async customerID => {
        const { customers } = this.state;

        const id = parseInt(customerID, 10);
        const filteredCustomers = customers.filter(c => c.customerID !== id);

        await postCustomerData(filteredCustomers);
        this.setState(prevState => ({
            ...prevState,
            loading: true
        }));
        this.fetchCustomerData();
    };

    render() {
        const { customers, loading } = this.state;

        return (
            <Customers
                customers={customers}
                loading={loading}
                onAddClick={this.handleAddClick}
                onEditClick={this.handleEditClick}
                onDeleteClick={this.handleDeleteClick}
            />
        );
    }
}

export default CustomerContainer;
