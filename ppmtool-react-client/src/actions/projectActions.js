import axios from 'axios'
import apiClient from '../apiClient';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from './types'

export const createProject = (project, history) => async dispatch => {
    try {
        await apiClient.post("/api/project", project)
        history.push('/dashboard')
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

export const getProjects = () => async dispatch => {
    const res = await apiClient.get("/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
};

export const getProject = (id, history) => async dispatch => {
    try {
        const res = await apiClient.get(`/api/project/${id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    } catch(error) {
        history.push('/dashboard');
    };    
};

export const deleteProject = (id, history) => async dispatch => {
    // TODO: replace with react modal 
    if(window.confirm('Are you sure you want to delete this project?')) {
       await apiClient.delete(`/api/project/${id}`)
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        }) 
    }    
}