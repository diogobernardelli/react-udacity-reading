import {
  CHANGE_CATEGORY,
  CHANGE_SORT,
  LIST_CATEGORIES,
  LIST_POSTS,
  DIALOG_POST_FORM,
  UPDATE_POSTS,
  EDIT_POST,
  POST_REMOVE
} from '../actions';

const INITIAL_STATE = {
  categorySelected: 'all',
  sortSelected: '-voteScore',
  categories: [],
  posts: [],
  openDialogState: false
}

export default (state = INITIAL_STATE, action) => {
  let { categorySelected } = state;
  switch (action.type) {
      case CHANGE_CATEGORY:
          return { ...state, categorySelected: action.payload }
      case CHANGE_SORT:
          return { ...state, sortSelected: action.payload }
      case LIST_CATEGORIES:
          return { ...state, categories: action.payload }
      case LIST_POSTS:
          return { ...state, posts: action.payload }
      case DIALOG_POST_FORM:
          return { ...state, openDialogState: action.payload }
      case UPDATE_POSTS:
          if (categorySelected === "all" || action.payload.category === categorySelected) {
              return { ...state, posts: [...state.posts, action.payload] }
          } else {
              return { ...state }
          }
      case EDIT_POST:
          return { ...state, posts: state.posts.map(p => (p.id === action.payload.id ? action.payload : p)) }
      case POST_REMOVE:
          return { ...state, posts: [...state.posts.filter(p => action.payload.id !== p.id)] }
      default:
          return state;
  }
}