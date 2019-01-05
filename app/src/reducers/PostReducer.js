import {
  POST_LOAD_DATA,
  POST_FORM_SAVE,
  POST_HANDLE_CHANGE,
  POST_CHANGE_CATEGORY,
  POST_VALID_FORM,
  POST_CLEAN_FORM
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

const INITIAL_STATE = {
  PostModel,
  fieldsErros: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case POST_HANDLE_CHANGE:
          return { ...state, PostModel: { ...state.PostModel, [action.field]: action.payload } }
      case POST_CHANGE_CATEGORY:
          return { ...state, PostModel: { ...state.PostModel, category: action.payload } }
      case POST_LOAD_DATA:
          return { ...state, PostModel: action.payload }
      case POST_FORM_SAVE:
          return { ...state, PostModel: { ...state.PostModel, ...action.payload } }
      case POST_VALID_FORM:
          return { ...state, fieldsErros: action.payload }
      case POST_CLEAN_FORM:
          return { ...state, PostModel, fieldsErros: [] }
      default:
          return state;
  }
}