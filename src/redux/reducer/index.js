import { combineReducers } from 'redux';
import csvReducer from './csvReducer';

const rootReducer = combineReducers({
  csv: csvReducer,
  // 다른 리듀서를 여기에 추가할 수 있습니다.
});

export default rootReducer;
