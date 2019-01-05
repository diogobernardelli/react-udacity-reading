import uuid from 'uuid';
import moment from 'moment';

import {
    LIST_POSTS,
    CHANGE_SORT,
    DIALOG_POST_FORM,
    POST_HANDLE_CHANGE,
    POST_CHANGE_CATEGORY,
    UPDATE_POSTS,
    EDIT_POST,
    POST_FORM_SAVE,
    POST_VALID_FORM,
    DETAIL_GET_POST,
    POST_CLEAN_FORM,
    POST_LOAD_DATA,
    POST_REMOVE,
} from '.';

import {
    getAllPosts,
    getPostsDetail,
    getCommentsByPostId,
    savePost,
    editPost,
    removePost,
    votePost
} from '../adapter/api';

import { listCategories } from './categories';

// INDEX
export const listPosts = () => {
  return dispatch => {
      getAllPosts().then(posts => {
          posts.map(post => {
              return getCommentsByPostId(post.id).then(comments => {
                  post.totalComments = comments.length;
                  dispatch({ type: LIST_POSTS, payload: posts })
              });
          });
      });
  }
}

//SHOW
export const getPostDetail = (id) => {
    return dispatch => {
        getPostsDetail(id).then(post => {
            dispatch({ type: DETAIL_GET_POST, payload: post });
        });
    }
}

// ADD
export const postFormSave = (PostModel) => {
    let fieldsErros = [];
    let newPost = { ...PostModel };
    let insert = false;

    // iniciando post
    if (newPost.id === '') {
        insert = true;
        newPost.id = uuid.v1();
        newPost.timestamp = moment().valueOf();
    }

    // validando form
    for (let prop in newPost) {
        if (newPost[prop] === null || newPost[prop] === "") {
            fieldsErros.push(prop);
        }
    }

    // enviando para o servidor
    return dispatch => {
        if (fieldsErros.length === 0) {
            if (insert) {
                savePost(newPost).then(post => {
                    dispatch({ type: POST_FORM_SAVE, payload: { ...newPost, ...post } });
                    dispatch({ type: UPDATE_POSTS, payload: { ...newPost, ...post } });
                    dispatch({ type: DIALOG_POST_FORM, payload: false });
                    dispatch({ type: POST_CLEAN_FORM });
                });
            } else {
                editPost(newPost).then(post => {
                    dispatch({ type: DETAIL_GET_POST, payload: { ...newPost, ...post } });
                    dispatch({ type: EDIT_POST, payload: { ...newPost, ...post } });
                    dispatch({ type: DIALOG_POST_FORM, payload: false });
                    dispatch({ type: POST_CLEAN_FORM });
                });
            }
        } else {
            dispatch({ type: POST_VALID_FORM, payload: fieldsErros });
        }
    }
}

//EDIT
export const postEdit = (PostModel) => {
    return dispatch => {
        dispatch(listCategories());
        dispatch({ type: POST_LOAD_DATA, payload: PostModel });
        dispatch({ type: DIALOG_POST_FORM, payload: true });
    }
}

//DELETE
export const postRemove = (post_id, history) => {
    return dispatch => {
        if (window.confirm("Você confirma a remoção da postagem?")) {
            removePost(post_id).then(post => {
                dispatch({ type: POST_REMOVE, payload: post })
                
                if (history) {
                    history.push("/");
                }
            });
        }
    }
}

// CURTIR / DESCURTIR
export const postVote = (post_id, option) => {
    return dispatch => {
        votePost(post_id, { option }).then(post => {
            dispatch(postFormSave(post));
        });
    }
}

// ORDEM DE PUBLICAÇÕES
export const postHandleChange = (event) => {
    return {
        type: POST_HANDLE_CHANGE,
        field: event.target.name,
        payload: event.target.value
    }
}

export const postChangeCategory = category => {
    return {
        type: POST_CHANGE_CATEGORY,
        payload: category
    }
}

export const changeSort = sort => {
    return dispatch => {
        dispatch({ type: CHANGE_SORT, payload: sort });
        dispatch(listPosts());
    }
}

//POST FORM DIALOG
export const openDialogPost = (openDialogState) => {
    return {
        type: DIALOG_POST_FORM,
        payload: openDialogState
    }
}

export const postFormCancel = () => {
    return dispatch => {
        dispatch({ type: POST_CLEAN_FORM });
        dispatch({ type: DIALOG_POST_FORM, payload: false });
    }
}