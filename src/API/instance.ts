import axios from "axios"
import { generateXAuth } from "../util";


export const instance = axios.create({
  baseURL: "http://api.valantis.store:40000/",
  headers: {
    'X-Auth': generateXAuth('Valantis'),
  }
})