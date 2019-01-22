export const getCustomerData = async () => {
    const response = await fetch('http://localhost:5000/customer-data');
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
};

export const postCustomerData = async customers => {
    const data = JSON.stringify(customers);

    const response = await fetch('http://localhost:5000/customer-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    });

    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
};
