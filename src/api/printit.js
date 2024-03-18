// write code for working with api (getting locations) using axios

import axios from 'axios';

export async function getLocations() {
    let res = await axios.get('http://10.74.1.93:8000/api/v1/locations/');
    return res.data;
}

export async function getPrinter(printerCode) {
    let res = await axios.get(`http://10.74.1.93:8000/api/v1/printers/${printerCode}/`);
    return res.data;
}