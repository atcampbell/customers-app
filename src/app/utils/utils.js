import data from '../../data/data.json';

// TODO update to express
export function fetchUserData() {
    return data;
}

export function saveUserData(users) {
    console.log(users);
    const data = JSON.stringify(users);
    console.log(data);
    const a = document.createElement('a');
    const file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'hey.json';
    a.click();
}
