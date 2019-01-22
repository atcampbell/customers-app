import React, { Component } from 'react';
import { getCustomerData, postCustomerData } from '../utils/fetchCustomerData';
import { selectCustomer } from '../utils/helpers';
import { formatDateToUTC } from '../utils/helpers';
import Customer from './Customer';

class CustomerContainer extends Component {
    state = {
        readOnly: true,
        loading: true,
        create: false,
        customer: {
            name: {
                first: '',
                last: ''
            },
            customerID: null,
            birthday: '',
            gender: '',
            lastContact: '',
            customerLifetimeValue: ''
        },
        title: '',
        customers: []
    };

    async componentDidMount() {
        const { create, match } = this.props;
        const customers = await getCustomerData();

        if (create) {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                readOnly: false,
                title: 'Create New Customer',
                customers
            }));
        } else {
            const customerID = parseInt(match.params.customerID, 10);
            const customer = selectCustomer(customers, customerID);

            if (customer) {
                this.setState(prevState => ({
                    ...prevState,
                    loading: false,
                    title: `${customer.name.first} ${customer.name.last}`,
                    customer,
                    customers
                }));
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    loading: false,
                    customer: null,
                    customers
                }));
            }
        }
    }

    handleSaveClick = async () => {
        const { history } = this.props;
        const { customer, customers } = this.state;

        if (customer.customerID === null) {
            const id =
                customers.reduce((prev, current) => {
                    return prev.customerID > current.customerID
                        ? prev.customerID
                        : current.customerID;
                }, 0) + 1;

            customer.customerID = id;
            customer.lastContact = formatDateToUTC(customer.lastContact);

            const updatedCustomers = [...customers, customer];
            await postCustomerData(updatedCustomers);
            history.push('/');
        } else {
            const filteredCustomers = customers.filter(c => c.customerID !== customer.customerID);
            const updatedCustomers = [...filteredCustomers, customer];
            await postCustomerData(updatedCustomers);
            history.push('/');
        }
    };

    handleEditClick = () => {
        this.setState(prevState => ({
            readOnly: !prevState.readOnly
        }));
    };

    handleCustomerNamePropertyChange = (e, property) => {
        const val = e.target.value;

        this.setState(prevState => ({
            ...prevState,
            customer: {
                ...prevState.customer,
                name: {
                    ...prevState.customer.name,
                    [property]: val
                }
            }
        }));
    };

    handleCustomerPropertyChange = (e, property) => {
        const val = e.target.value;

        this.setState(prevState => ({
            ...prevState,
            customer: {
                ...prevState.customer,
                [property]: val
            }
        }));
    };

    customerDataValid = () => {
        const { customer } = this.state;

        return customer.name.first && customer.name.last ? true : false;
    };

    nameFieldValid = name => {
        const { readOnly } = this.state;

        return !readOnly && !name ? true : false;
    };

    render() {
        const { customer, loading, readOnly, title } = this.state;

        return (
            <Customer
                customer={customer}
                loading={loading}
                readOnly={readOnly}
                title={title}
                nameFieldValid={this.nameFieldValid}
                customerDataValid={this.customerDataValid}
                onCustomerNameChange={this.handleCustomerNamePropertyChange}
                onCustomerFieldChange={this.handleCustomerPropertyChange}
                onEditClick={this.handleEditClick}
                onSaveClick={this.handleSaveClick}
            />
        );
    }
}

export default CustomerContainer;
