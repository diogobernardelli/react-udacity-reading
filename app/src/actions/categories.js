import {
    LIST_CATEGORIES,
    CHANGE_CATEGORY
} from '.';

import {
    listPosts
} from './posts'

import {
    getAllCategories
} from '../adapter/api';

export const changeCategory = (category, history) => {
    return dispatch => {        
        dispatch({ type: CHANGE_CATEGORY, payload: category });        
        dispatch(listPosts(category));
        if (history) {
            history.push(`/${category}`);
        }        
    }
}

export const listCategories = () => {
  return dispatch => {
      getAllCategories().then(categories => {
          dispatch({ type: LIST_CATEGORIES, payload: categories })
      });
  }
}