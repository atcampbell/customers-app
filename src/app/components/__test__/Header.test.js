import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Header from '../Header';

describe('<Header />', () => {
    const getAppBar = () => wrapper.find('WithStyles(AppBar)');
    const getTypography = () => wrapper.find('WithStyles(Typography)');
    const shallow = createShallow({ dive: true });
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    describe('when rendering header', () => {
        it('should render app bar', () => {
            expect(getAppBar()).toHaveLength(1);
        });

        it('should render menu bar text', () => {
            expect(getTypography()).toHaveLength(1);
            expect(getTypography().props().children).toEqual('Webtrekk Users');
        });
    });
});