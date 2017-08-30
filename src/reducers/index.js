import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form'; //npm install --save redux-form@6.6.3

const rootReducer = combineReducers({
  posts: PostsReducer,
  // the key of 'form' is important to get formReducer hooked up correctly
  form: formReducer
});

export default rootReducer;
