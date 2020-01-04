import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as Actions from '../actions';
export const initialState = {
  dashboardstatus: 70,
  data:null,
}
const ipad = function (state = initialState, action) {
  switch (action.type) {
    case Actions.PAD_DASHBOARD_STATUS_CHANGE_START: {
      return {
        ...state,
        dashboardstatus: 70,
        data:action.payload.data,
      };
    }
    case Actions.PAD_DASHBOARD_STATUS_CHANGE_SUCCESS: {
      return {
        ...state,
        dashboardstatus: 700 + action.payload.status,
        data:action.payload.data,
      };
    }
    default:
      {
        return state
      }
  }
}
const persistConfig = {
  key: 'ipad',
  storage: storage,
};
export default persistReducer(persistConfig, ipad);