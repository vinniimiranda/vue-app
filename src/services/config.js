import axios from 'axios'

export const http = axios.create({
    baseURL:'https://vm-api-node.herokuapp.com/api/'
})