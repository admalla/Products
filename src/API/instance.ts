import axios from "axios"
import { generateXAuth } from "../util";


export const instance = axios.create({
  baseURL: "https://api.valantis.store:41000/",
  headers: {
    'X-Auth': generateXAuth('Valantis'),
  }
})