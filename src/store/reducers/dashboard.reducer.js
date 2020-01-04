import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as Actions from '../actions';
import { CREATE_PROPERTY_ITEM_START } from '../actions/Dashboard.actions';

export const initialState = {
  status: 10,
  properties: null,
  loadingtxt: '',

  createproperty: null,

  selectedproperty: null,

  makehousedata: {},
  mortgageitem: null,

  createeventitem: null,
  agentinfo: null,
  leads: null,
  createagentitem: null,

  //property qestions
  switchData: 100,
};

const dashboard = function (state = initialState, action) {
  switch (action.type) {
    case Actions.USER_INIT: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOG_OUT: {
      return {
        ...initialState,
      };
    }
    case Actions.GET_PROPERTIES_START: {
      return {
        ...state,
        loadingtxt: 'Updating Properties...',
        status: 100,
        properties: null,
      };
    }
    case Actions.GET_PROPERTIES_SUCCESS: {
      return {
        ...state,
        status: 200,
        properties: action.payload,
      };
    }
    case Actions.GET_PROPERTIES_FAILD: {
      return {
        ...state,
        status: 400,
        properties: null,
      };
    }
    case Actions.GET_OPEN_HOUSE_START: {
      return {
        ...state,
        loadingtxt: 'Updating Properties...',
        status: 100,
      };
    }
    case Actions.GET_OPEN_HOUSE_SUCCESS: {
      return {
        ...state,
        status: 220,
        openhouse: action.payload,
      };
    }
    case Actions.GET_OPEN_HOUSE_FAILD: {
      return {
        ...state,
        status: 400,
        openhouse: null,
      };
    }
    case Actions.GET_MY_BOARD_START: {
      return {
        ...state,
        loadingtxt: 'Updating Properties...',
        status: 100,
        myboard: null,
      };
    }
    case Actions.GET_MY_BOARD_SUCCESS: {
      return {
        ...state,
        status: 230,
        myboard: action.payload,
      };
    }
    case Actions.GET_MY_BOARD_FAILD: {
      return {
        ...state,
        status: 400,
        myboard: null,
      };
    }
    case Actions.GET_LEAD_START: {
      return {
        ...state,
        loadingtxt: 'Updating LEAD...',
        status: 100,
        leads: null,
      };
    }
    case Actions.GET_LEAD_SUCCESS: {
      return {
        ...state,
        status: 210,
        leads: action.payload,
      };
    }
    case Actions.GET_LEAD_FAILD: {
      return {
        ...state,
        status: 400,
        leads: null,
      };
    }
    case Actions.GET_EVENT_START: {
      return {
        ...state,
        loadingtxt: 'Updating Events...',
        status: 100,
        events: null,
      };
    }
    case Actions.GET_EVENT_SUCCESS: {
      return {
        ...state,
        status: 240,
        events: action.payload,
      };
    }
    case Actions.GET_EVENT_FAILD: {
      return {
        ...state,
        status: 400,
        events: null,
      };
    }
    case Actions.GET_PROFILE_START: {
      return {
        ...state,
        status: 280,
      };
    }
    case Actions.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        status: 777,
      };
    }
    case Actions.GET_MORTGAGE_START: {
      return {
        ...state,
        loadingtxt: 'Updating Mortgage...',
        status: 100,
        motgages: null,
      };
    }
    case Actions.GET_MORTGAGE_SUCCESS: {
      return {
        ...state,
        status: 260,
        motgages: action.payload,
      };
    }
    case Actions.GET_MORTGAGE_FAILD: {
      return {
        ...state,
        status: 400,
        motgages: null,
      };
    }
    case Actions.CREATE_PROPERTY_ITEM_START: {
      return {
        ...state,
        status: 100,
        createproperty: null,
      };
    }
    case Actions.CREATE_PROPERTY_ITEM_SUCCESS: {
      return {
        ...state,
        status: 300,
        createproperty: action.payload,
        properties: [action.payload, ...state.properties],
      };
    }
    case Actions.CREATE_PROPERTY_ITEM_FAILD: {
      return {
        ...state,
        status: 400,
        createproperty: null,
      };
    }



    case Actions.CREATE_EVENT_ITEM_START: {
      return {
        ...state,
        status: 100,
        createevent: null,
      };
    }
    case Actions.CREATE_EVENT_ITEM_SUCCESS: {
      return {
        ...state,
        status: 450,
        createevent: action.payload,
      };
    }
    case Actions.CREATE_EVENT_ITEM_FAILD: {
      return {
        ...state,
        status: 400,
        createevent: null,
      };
    }



    case Actions.SELECT_PROPERTY_ITEM_START: {
      return {
        ...state,
        selectedproperty: null,
      };
    }
    case Actions.SELECT_PROPERTY_ITEM_SUCCESS: {
      return {
        ...state,
        selectedproperty: action.payload,
      };
    }
    case Actions.SELECT_PROPERTY_ITEM_FAILD: {
      return {
        ...state,
        selectedproperty: null,
      };
    }
    case Actions.UPDATE_HOUSE_HANDLE_TYPE_START: {
      return {
        ...state,
        makehousedata: { ...state.makehousedata },
      };
    }
    case Actions.UPDATE_HOUSE_HANDLE_TYPE_SUCCESS: {
      return {
        ...state,
        makehousedata: { ...state.makehousedata, ...action.payload },
      };
    }
    case Actions.UPDATE_HOUSE_HANDLE_TYPE_FAILD: {
      return {
        ...state,
        makehousedata: { ...state.makehousedata, ...action.payload },
      };
    }
    case Actions.SELECT_MORTGAGE_ITEM_START: {
      return {
        ...state,
        mortgageitem: null,
      };
    }
    case Actions.SELECT_MORTGAGE_ITEM_SUCCESS: {
      return {
        ...state,
        mortgageitem: action.payload,
      };
    }
    case Actions.SELECT_MORTGAGE_ITEM_FAILD: {
      return {
        ...state,
        mortgageitem: null,
      };
    }
    case Actions.CREATE_NEW_AGENT_INFO_ITEM_START: {
      return {
        ...state,
        agentinfo: null,
      };
    }
    case Actions.CREATE_NEW_AGENT_INFO_ITEM_SUCCESS: {
      return {
        ...state,
        agentinfo: action.payload,
      };
    }
    case Actions.CREATE_NEW_AGENT_INFO_ITEM_FAILD: {
      return {
        ...state,
        agentinfo: null,
      };
    }
    case Actions.POST_NEW_ATTENDEE_ITEM_START: {
      return {
        ...state,
        status: 100,
        createagentitem: null,
        loadingtxt: 'Synchronizing Data...',

      };
    }
    case Actions.POST_NEW_ATTENDEE_ITEM_SUCCESS: {
      return {
        ...state,
        status: 200,
        createagentitem: action.payload,
      };
    }
    case Actions.POST_NEW_ATTENDEE_ITEM_FAILD: {
      return {
        ...state,
        status: 400,
        createagentitem: null,
      };
    }

    // post new event item.
    case Actions.POST_NEW_EVENT_ITEM_START: {
      return {
        ...state,
        status: 100,
        createagentitem: null,
        loadingtxt: 'Synchronizing Data...',
      };
    }
    case Actions.POST_NEW_EVENT_ITEM_SUCCESS: {
      return {
        ...state,
        status: 200,
        createeventitem: action.payload,
      };
    }
    case Actions.POST_NEW_EVENT_ITEM_FAILD: {
      return {
        ...state,
        status: 400,
        createagentitem: null,
      };
    }
    //end post new event item.

    case Actions.UPDATE_PARTNER_START: {
      return {
        ...state,
        status: 90,
      };
    }
    case Actions.UPDATE_PARTNER_SUCCESS: {
      return {
        ...state,
        status: 250,
        update_partner: true,
      };
    }
    case Actions.UPDATE_PROFILE_START: {
      return {
        ...state,
        status: 100,
      };
    }
    case Actions.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        status: 255,
        updateprofile: true,
      };
    }
    case Actions.SEARCH_LMSACCOUNT_SUCCESS: {
      return {
        ...state,
        status: 257,
        searchData: action.payload,
      };
    }
    case Actions.LINK_LMSACCOUNT_SUCCESS: {
      return {
        ...state,
        status: 258,
        resultData: action.payload,
      };
    }
    case Actions.POST_BROKER_SUCCESS: {
      return {
        ...state,
        status: 259,
        resultData: action.payload,
      };
    }
    case Actions.POST_PUBLICBROKER_SUCCESS: {
      return {
        ...state,
        status: 263,
        resultData: action.payload,
      };
    }
    case Actions.POST_PUBLIC_SUCCESS: {
      return {
        ...state,
        status: 264,
        resultData: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
const persistConfig = {
  key: 'dashboard',
  storage: storage,
  // blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, dashboard);
