import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import UserTableItem from '../UserTableItem';

describe('<UserTableItem />', () => {
    const getDeleteIcon = () => wrapper.find('<Pure(DeleteIcon) />');
    const getTableCell = () => wrapper.find('WithStyles(TableCell)');
    const shallow = createShallow({ dive: true });
    let wrapper, props;

    beforeEach(() => {
        props = {
            user: {
                customerID: 1,
                name: {
                    first: 'Peter',
                    last: 'Smith'
                },
                birthday: '1996-10-12',
                gender: 'm',
                lastContact: '2017-06-01T23:28:56.782Z',
                customerLifetimeValue: 191.12
            }
        }

        wrapper = shallow(<UserTableItem {...props} />);
    });

    describe('when rendering user item', () => {
        it('should render all table cells', () => {
            expect(getTableCell()).toHaveLength(6);
            console.log(wrapper.debug());
        });

        it('should render user name', () => {
            expect(getTableCell().at(0).props().children).toEqual('Peter Smith');
        });

        it('should render user birthday', () => {
            expect(getTableCell().at(1).props().children).toEqual('1996-10-12');
        });

        it('should render user gender', () => {
            expect(getTableCell().at(2).props().children).toEqual('m');
        });

        it('should render user last contact', () => {
            expect(getTableCell().at(3).props().children).toEqual('2017-06-01T23:28:56.782Z');
        });

        it('should render user gender', () => {
            expect(getTableCell().at(4).props().children).toEqual(191.12);
        });
    });
});