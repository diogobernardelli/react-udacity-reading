import uuid from 'uuid';
import moment from 'moment';

import {
    DETAIL_REMOVE_COMMENT,
    DETAIL_GET_ALL_COMMENTS,
    DETAIL_OPEN_DIALOG_COMMENT,
    DETAIL_GET_COMMENT,
    DETAIL_ADD_COMMENT,
    DETAIL_EDIT_COMMENT,
    DETAIL_COMMENT_FORM_CLEAN,
    DETAIL_POST_HANDLE_CHANGE,
    POST_VALID_FORM
} from '.';
import {
    deleteComment,
    getCommentDetail,
    getCommentsByPostId,
    saveComment,
    editComment,
    voteComment
} from '../adapter/api';

// LIST
export const getAllCommentsByPostId = (id) => {
    return dispatch => {
        getCommentsByPostId(id).then(comments => {
            dispatch({ type: DETAIL_GET_ALL_COMMENTS, payload: comments.filter(c => !c.deleted && !c.parentDeleted) });
        });
    }
}

// SHOW
export const postDetailGetComment = (comment_id) => {
    return dispatch => {
        getCommentDetail(comment_id).then(comment => {
            dispatch({ type: DETAIL_GET_COMMENT, payload: comment });
        });
    }
}

// ADD
export const postDetailCommentSave = (CommentModel, parentId) => {
    let fieldsErros = [];
    let newComment = { ...CommentModel };
    let insert = false;

    // iniciando comentário
    if (newComment.id === '') {
        insert = true;
        newComment.id = uuid.v1();
        newComment.timestamp = moment().valueOf();
        newComment.parentId = parentId;
    }

    // validando form
    for (let prop in newComment) {
        if (newComment[prop] === null || newComment[prop] === "") {
            fieldsErros.push(prop);
        }
    }
    return dispatch => {
        if (fieldsErros.length === 0) {
            if (insert) {
                saveComment(newComment).then(comment => {
                    dispatch({ type: DETAIL_ADD_COMMENT, payload: newComment });
                    dispatch({ type: DETAIL_COMMENT_FORM_CLEAN });
                    dispatch(postDetailOpenDialogComment(false));
                });
            } else {
                editComment(newComment).then(comment => {
                    dispatch({ type: DETAIL_EDIT_COMMENT, payload: newComment });
                    dispatch({ type: DETAIL_COMMENT_FORM_CLEAN });
                    dispatch(postDetailOpenDialogComment(false));
                });
            }
        } else {
            dispatch({ type: POST_VALID_FORM, payload: fieldsErros });
        }
    }
}

// EDIT
export const postDetailCommentEdit = (comment_id) => {
    return dispatch => {
        dispatch(postDetailGetComment(comment_id));
        dispatch(postDetailOpenDialogComment(true));
    }
}

// DELETE
export const postDetailCommentRemove = (comment_id) => {
    return dispatch => {
        if (window.confirm("Você confirma a remoção do comentário?")) {
            deleteComment(comment_id).then(comment => {
                dispatch({ type: DETAIL_REMOVE_COMMENT, payload: comment });
            });
        }
    }
}

// CURTIR / DESCURTIR
export const postDetailCommentVote = (comment_id, option) => {
    return dispatch => {
        voteComment(comment_id, { option }).then(comment => {
            dispatch(postDetailCommentSave(comment, comment.parentId));
        });
    }
}

export const commentHandleChange = (event) => {
    return {
        type: DETAIL_POST_HANDLE_CHANGE
        , field: event.target.name
        , payload: event.target.value
    }
}

// DIALOG
export const postDetailOpenDialogComment = (openDialogState) => {
    return {
        type: DETAIL_OPEN_DIALOG_COMMENT
        , payload: openDialogState
    }
}