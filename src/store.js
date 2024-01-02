// store.js

import { createStore } from 'redux';

// 초기 상태
const initialState = {
  count: 0
};

// 리듀서
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

export default store;
