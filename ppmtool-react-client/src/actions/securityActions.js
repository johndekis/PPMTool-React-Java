import axios from 'axios'
import apiClient from '../apiClient';
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setJWTToken from '../securityUtils/setJWTToken';
import jwt_decode from 'jwt-decode'

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await apiClient.post(`/api/users/register`, newUser);
        history.push(`/login`)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const login = LoginRequest => async dispatch => {
    try {
      
        const res = await apiClient.post(`/api/users/login`, LoginRequest);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        const decoded = jwt_decode(token);
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
        
    } catch (err) {

        console.log({apiClient})
        console.log({err})

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }    
}

export const logout = () => async dispatch => {
    localStorage.removeItem("jwtToken")
    setJWTToken(false)
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
}