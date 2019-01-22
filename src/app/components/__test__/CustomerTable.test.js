import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import CustomerTable from '../CustomerTable';

describe('<CustomerTable />', () => {
    const getTable = () => wrapper.find('WithStyles(Table)');
    const getTableHead = () => wrapper.find('WithStyles(TableHead)');
    const getTableCell = () => wrapper.find('WithStyles(TableCell)');
    const getCustomerItem = () => wrapper.find('WithStyles(CustomerTableItem)');
    const shallow = createShallow({ dive: true });
    let wrapper, props;

    beforeEach(() => {
        props = {
            customers: [
                {
                    customerID: 1
                },
                {
                    customerID: 2
                }
            ]
        };

        wrapper = shallow(<CustomerTable {...props} />);
    });

    describe('when rendering customer table', () => {
        it('should render table', () => {
            expect(getTable()).toHaveLength(1);
        });

        it('should render headings', () => {
            expect(getTableHead()).toHaveLength(1);
            expect(getTableCell()).toHaveLength(6);
        });

        it('should render customers', () => {
            expect(getCustomerItem()).toHaveLength(2);
        });
    });
});
