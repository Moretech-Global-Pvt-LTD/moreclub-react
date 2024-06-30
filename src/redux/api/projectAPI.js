import axios from 'axios';
import {baseURL} from "../../config/config"
import { setLoading, setError, projectSuccess, projectDetailSuccess } from '../slices/projectSlice';

export const loadProject = () => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await axios.get(`${baseURL}projects/list/`);
        console.log(response);
        dispatch(projectSuccess(response.data.data));
        
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project types'));
        dispatch(setLoading(false));
    }
};

export const projectDetail = (project_id) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await axios.get(`${baseURL}projects/${project_id}/`);
        console.log(response);
        dispatch(projectDetailSuccess(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError('Error fetching project details'));
        dispatch(setLoading(false));
    }
};