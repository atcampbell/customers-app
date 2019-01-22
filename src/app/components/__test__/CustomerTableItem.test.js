import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import CustomerTableItem from '../CustomerTableItem';

describe('<CustomerTableItem />', () => {
    const getTableCell = () => wrapper.find('WithStyles(TableCell)');
    const shallow = createShallow({ dive: true });
    let wrapper, props;

    beforeEach(() => {
        props = {
            customer: {
                customerID: 1,
                name: {
                    first: 'Peter',
                    last: 'Smith'
                },
                birthday: '1996-10-12',
                gender: 'm',
                lastContact: '2017-01-01T23:28:56.782Z',
                customerLifetimeValue: 191.12
            }
        };

        wrapper = shallow(<CustomerTableItem {...props} />);
    });

    describe('when rendering customer item', () => {
        it('should render all table cells', () => {
            expect(getTableCell()).toHaveLength(6);
        });

        it('should render customer name', () => {
            expect(
                getTableCell()
                    .at(0)
                    .props().children
            ).toEqual('Peter Smith');
        });

        it('should render customer birthday', () => {
            expect(
                getTableCell()
                    .at(1)
                    .props().children
            ).toEqual('1996-10-12');
        });

        it('should render customer gender', () => {
            expect(
                getTableCell()
                    .at(2)
                    .props().children
            ).toEqual('m');
        });

        it('should render customer last contact', () => {
            expect(
                getTableCell()
                    .at(3)
                    .props().children
            ).toEqual('2 years ago');
        });

        it('should render customer gender', () => {
            expect(
                getTableCell()
                    .at(4)
                    .props().children
            ).toEqual(191.12);
        });
    });
});
