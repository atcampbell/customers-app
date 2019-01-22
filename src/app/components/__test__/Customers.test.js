import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Customers from '../Customers';

describe('<Customers />', () => {
    const getTypography = () => wrapper.find('WithStyles(Typography)');
    const getPaper = () => wrapper.find('WithStyles(Paper)');
    const getCustomerTable = () => wrapper.find('WithStyles(CustomerTable)');
    const getButton = () => wrapper.find('WithStyles(Button)');
    const getLoading = () => wrapper.find('WithStyles(CircularProgress)');
    const shallow = createShallow({ dive: true });
    let wrapper, props;

    beforeEach(() => {
        props = {
            customers: [
                {
                    customerID: 1,
                    name: {
                        first: 'Peter',
                        last: 'Smith'
                    }
                },
                {
                    customerID: 2,
                    name: {
                        first: 'John',
                        last: 'Smith'
                    }
                }
            ]
        };

        wrapper = shallow(<Customers {...props} />);
    });

    describe('when rendering customers with customers', () => {
        it('should render Title', () => {
            expect(getTypography()).toHaveLength(1);
        });

        it('should render paper', () => {
            expect(getPaper()).toHaveLength(1);
        });

        it('should render customer table', () => {
            expect(getCustomerTable()).toHaveLength(1);
        });

        it('should render add button', () => {
            expect(getButton()).toHaveLength(1);
        });
    });

    describe('when rendering while loading', () => {
        beforeEach(() => {
            props = {
                loading: true,
                customers: []
            };

            wrapper = shallow(<Customers {...props} />);
        });

        it('should render loading component', () => {
            expect(getLoading()).toHaveLength(1);
        });
    });

    describe('when loaded and no customers', () => {
        beforeEach(() => {
            props = {
                loading: false,
                customers: []
            };

            wrapper = shallow(<Customers {...props} />);
        });

        it('should render message', () => {
            expect(getTypography()).toHaveLength(1);
        });
    });
});
