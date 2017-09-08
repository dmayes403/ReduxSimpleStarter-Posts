import { FETCH_POSTS, FETCH_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            const { data } = action.payload;
            // ^^^ destructoring

            // const newState = { ...state }
            // newState[post.id] = post;
            // return newState;
            // // this keeps all the previous posts. It takes all of the previous state objects and puts them into the
            // // new state object I am about to return
            // ^^^ old es5 method
            return { ...state, [data.id]: data }
            // ^^^ new es6 method using key interpolation. => add/set this id equal to action.payload.data (data.id/data). ...state gets the previous state
        default:
            return state;
    }
}