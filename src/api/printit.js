import axios from "axios";

let client = axios.create({
  baseURL: "https://mongrel-careful-truly.ngrok-free.app/api/v1/",
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

export async function getLocations() {
  // add headers for ngrok
  let res = await client.get("locations");
  return res.data;
}

export async function getPrinter(printerCode) {
  let res = await client.get(`printers/${printerCode}`);
  return res.data;
}
