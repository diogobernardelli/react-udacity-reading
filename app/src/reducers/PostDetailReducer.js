import {
  DETAIL_GET_POST,
  DETAIL_GET_ALL_COMMENTS,
  DETAIL_OPEN_DIALOG_COMMENT,
  DETAIL_POST_HANDLE_CHANGE,
  DETAIL_GET_COMMENT,
  DETAIL_ADD_COMMENT,
  DETAIL_EDIT_COMMENT,
  DETAIL_REMOVE_COMMENT,
  DETAIL_COMMENT_FORM_CLEAN
} from '../actions';

const PostModel = {
    id: '',
    timestamp: 0,
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: 1,
    deleted: false,
    totalComments: 0
}
const CommentModel = {
    id: '',
    parentId: '',
    timestamp: 0,
    body: '',
    author: '',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
}

const INITIAL_STATE = {
  PostModel,
  CommentModel,
  comments: [],
  fieldsErros: [],
  openDialogState: false,
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case DETAIL_GET_POST:
          return { ...state, PostModel: { ...action.payload }, loading: true }
      case DETAIL_GET_ALL_COMMENTS:
          return { ...state, comments: [...action.payload] }
      case DETAIL_OPEN_DIALOG_COMMENT:
          return { ...state, openDialogState: action.payload }
      case DETAIL_POST_HANDLE_CHANGE:
          return { ...state, CommentModel: { ...state.CommentModel, [action.field]: action.payload } }
      case DETAIL_GET_COMMENT:
          return { ...state, CommentModel: { ...action.payload } }
      case DETAIL_ADD_COMMENT:
          return { ...state, comments: [...state.comments, action.payload] }
      case DETAIL_EDIT_COMMENT:
          return { ...state, comments: state.comments.map(c => (c.id === action.payload.id ? action.payload : c)) }
      case DETAIL_REMOVE_COMMENT:
          return { ...state, comments: [...state.comments.filter(c => action.payload.id !== c.id)] }
      case DETAIL_COMMENT_FORM_CLEAN:
          return { ...state, CommentModel, fieldsErros: [] }
      default:
          return state;
  }
}

