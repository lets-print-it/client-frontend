// write code for working with api (getting locations) using axios

import axios from 'axios';

export async function getLocations() {
    // add headers for ngrok
    let res = await axios.get('https://mongrel-careful-truly.ngrok-free.app/api/v1/locations/', {
        headers:{
            "ngrok-skip-browser-warning": "69420",
        },
    })

    return res.data;
}

export async function getPrinter(printerCode) {
    let res = await axios.get(`https://mongrel-careful-truly.ngrok-free.app/api/v1/printers/${printerCode}/`, {
        headers:{
            "ngrok-skip-browser-warning": "69420",
        },
    })
    return res.data;
}