import moment from 'moment';

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DDTHH:mm');
}

export function formatDateFromNow(date) {
    return moment(date, 'YYYYMMDD').fromNow();
}

export function formatDateToUTC(date) {
    return moment(date)
        .utc()
        .format();
}

export function selectCustomer(customers, customerID) {
    const customer = customers.find(u => u.customerID === customerID);

    return customer ? customer : null;
}
