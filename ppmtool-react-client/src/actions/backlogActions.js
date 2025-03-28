import axios from 'axios'
import apiClient from '../apiClient';
import { GET_ERRORS, GET_PROJECT_TASK, DELETE_PROJECT_TASK, GET_BACKLOG } from './types'

export const addProjectTask = (backlog_id, project_task, history) => async dispatch => {
    try {
        await apiClient.post(`/api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }    
}

export const getBacklog = (backlog_id) => async dispatch => {
    try {
        const res = await apiClient.get(`/api/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })       
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProjectTask = (backlog_id, pt_id, history) => async dispatch => {
    try {
        const res = await apiClient.get(`/api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch(error) {
        history.push(`/projectBoard/${backlog_id}`);
    };    
};


export const updateProjectTask = (backlog_id, pt_id, project_task, history) => async dispatch => {
    try {
      await apiClient.patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task);
      history.push(`/projectBoard/${backlog_id}`);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };

export const deleteProjectTask = (backlog_id, pt_id) => async dispatch => {
    if(window.confirm(`You are deleteing project task ${pt_id}, this action cannot be undone. Continue?`)) {
       await apiClient.delete(`/api/backlog/${backlog_id}/${pt_id}`)
       dispatch({
           type: DELETE_PROJECT_TASK,
           payload: pt_id
       })
    }
}