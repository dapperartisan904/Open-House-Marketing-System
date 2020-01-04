import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as Actions from '../actions';
import { USER_LOG_OUT } from '../actions/login.actions';

export const initialState = {
  account: null,
  status: 10,
  loadingtxt: '',
  errorMsg: '',

  updatedatastatus: 10,
  updatedata: null,

  rofileinfo: null,
  profileinfostatus: 10,

  downloadstatus: 10,
  downloadlist: null, //stateSelectionsArrayList

  downloadmortgage: null, //mortgageArrayList
  downloadmortgagestatus: 10,

  downloaddisclosure: null, //agentDisclosureArrayList
  downloaddisclosurestatus: 10,

  downloadproperties: null, //propertyArrayList
  downloadpropertiesstatus: 10,

  downloadpropertiesattende: null, //propertyAttendeeArrayList
  downloadpropertiesattendestatus: 10,

  downloadpropertiesbrokerattende: null, //brokerAttendeeArrayList
  downloadpropertiesbrokerattendestatus: 10,

  downloadevent: null, //eventArrayList
  downloadeventstatus: 10,

  downloadeventattend: null, //eventAttendArrayList
  downloadeventattendstatus: 10,

  downloadMLSLinkAccount: null, //linkedMlsAccountArrayList
  downloadMLSLinkAccountstatus: 10,

  resetpassword: null,
  resetpasswordstatus: 10,

  homedata: [
    {
      name: 'Properties',
      desc: 'Manage your current and expired listings. Add custom properties.',
      img: 'property',
    },
    {
      name: 'Events',
      desc: 'Manage your current and past events.  Create a new event.',
      img: 'event',
    },
    {
      name: 'Lead Management',
      desc: 'Manage, view or export your Open House attendees.',
      img: 'lead',
    },
    {
      name: 'Open House Questions',
      desc: 'Enable or disable Open House questions.',
      img: 'question',
    },
    {
      name: 'My Board / MLS',
      desc:
        'Link your Open Account to your Local Board of Realtors or MLS/IDX Data feed.',
      img: 'mls',
    },
    {
      name: 'Mortgage Partners',
      desc: 'Add, managed and view your Mortgage and Real Estate Partners',
      img: 'mortgage',
    },
    {
      name: 'Your Profile',
      desc: 'Update your Profile Information.',
      img: 'profile',
    },
    {
      name: 'Request Support',
      desc: 'Contact Open House Marketing System Technical Support Department.',
      img: 'support',
    },
  ],
};

const login = function (state = initialState, action) {
  switch (action.type) {
    case Actions.USER_LOGIN_START: {
      return {
        ...state,
        status: 100,
        updatedatastatus: 10,
        loadingtxt: 'Logging In',
      };
    }
    case Actions.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        status: 200,
        account: action.payload,
      };
    }
    case Actions.USER_LOGIN_FAILD: {
      return {
        ...state,
        status: 400,
        errorMsg: action.payload,
        account: null,
      };
    }
    case Actions.USER_LOG_OUT: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_INIT: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_INIT_STATUS: {
      return {
        ...state,
      };
    }
    case Actions.UPDATE_DATA_START: {
      return {
        ...state,
        updatedatastatus: 100,
        loadingtxt: 'Updating Data...',
      };
    }
    case Actions.UPDATE_DATA_SUCCESS: {
      return {
        ...state,
        updatedatastatus: 200,
        updatedata: action.payload,
      };
    }
    case Actions.UPDATE_DATA_FAILD: {
      return {
        ...state,
        updatedatastatus: 400,
        updatedata: null,
      };
    }
    case Actions.DOWNLOAD_STATION_LIST_START: {
      return {
        ...state,
        loadingtxt: 'Updating Data...',
        downloadstatus: 100,
        downloadlist: null,
      };
    }
    case Actions.DOWNLOAD_STATION_LIST_SUCCESS: {
      return {
        ...state,
        downloadstatus: 200,
        downloadlist: action.payload,
      };
    }
    case Actions.DOWNLOAD_STATION_LIST_FAILD: {
      return {
        ...state,
        downloadstatus: 400,
        downloadlist: null,
      };
    }
    case Actions.DOWNLOAD_MORTGAGE_LIST_START: {
      return {
        ...state,
        downloadmortgage: null,
        downloadmortgagestatus: 100,
        loadingtxt: 'Updating Mortgages',
      };
    }
    case Actions.DOWNLOAD_MORTGAGE_LIST_SUCCESS: {
      return {
        ...state,
        downloadmortgage: action.payload,
        downloadmortgagestatus: 200,
      };
    }
    case Actions.DOWNLOAD_MORTGAGE_LIST_FAILD: {
      return {
        ...state,
        downloadmortgagestatus: 400,
        downloadmortgage: null,
      };
    }
    case Actions.DOWNLOAD_DISCLOSURE_START: {
      return {
        ...state,
        loadingtxt: 'Updating Disclosure',
        downloaddisclosurestatus: 100,
        downloaddisclosure: null,
      };
    }
    case Actions.DOWNLOAD_DISCLOSURE_SUCCESS: {
      return {
        ...state,
        downloaddisclosure: action.payload,
        downloaddisclosurestatus: 200,
      };
    }
    case Actions.DOWNLOAD_DISCLOSURE_FAILD: {
      return {
        ...state,
        downloaddisclosure: null,
        downloaddisclosurestatus: 400,
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_START: {
      return {
        ...state,
        downloadproperties: null,
        downloadpropertiesstatus: 100,
        loadingtxt: 'Updating Properties',
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_SUCCESS: {
      return {
        ...state,
        loadingtxt: 'Updating Properties',
        downloadproperties: action.payload,
        downloadpropertiesstatus: 200,
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_FAILD: {
      return {
        ...state,
        downloadpropertiesstatus: 400,
        downloadproperties: null,
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_ATTENDE_START: {
      return {
        ...state,
        downloadpropertiesattende: null,
        downloadpropertiesattendestatus: 100,
        loadingtxt: 'Updating Property Attendees',
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_ATTENDE_SUCCESS: {
      return {
        ...state,
        downloadpropertiesattende: action.payload,
        downloadpropertiesattendestatus: 200,
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_ATTENDE_FAILD: {
      return {
        ...state,
        downloadpropertiesattendestatus: 400,
        downloadpropertiesattende: null,
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_BROKER_ATTENDE_START: {
      return {
        ...state,
        downloadpropertiesbrokerattende: null,
        downloadpropertiesbrokerattendestatus: 100,
        loadingtxt: 'Updating Property  Broker Attendees',
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_BROKER_ATTENDE_SUCCESS: {
      return {
        ...state,
        downloadpropertiesbrokerattende: action.payload,
        downloadpropertiesbrokerattendestatus: 200,
      };
    }
    case Actions.DOWNLOAD_PROPERTIES_BROKER_ATTENDE_FAILD: {
      return {
        ...state,
        downloadpropertiesbrokerattendestatus: 400,
        downloadpropertiesbrokerattende: null,
      };
    }
    case Actions.DOWNLOAD_EVENT_START: {
      return {
        ...state,
        downloadevent: null,
        downloadeventstatus: 100,
        loadingtxt: 'Updating Events',
      };
    }
    case Actions.DOWNLOAD_EVENT_SUCCESS: {
      return {
        ...state,
        downloadevent: action.payload,
        downloadeventstatus: 200,
      };
    }
    case Actions.DOWNLOAD_EVENT_FAILD: {
      return {
        ...state,
        downloadeventstatus: 400,
        downloadevent: null,
      };
    }
    case Actions.DOWNLOAD_EVENT_ATTEND_START: {
      return {
        ...state,
        downloadeventattend: null,
        downloadeventattendstatus: 100,
        loadingtxt: 'Updating Event Attendees',
      };
    }
    case Actions.DOWNLOAD_EVENT_ATTEND_SUCCESS: {
      return {
        ...state,
        downloadeventattend: action.payload,
        downloadeventattendstatus: 200,
      };
    }
    case Actions.DOWNLOAD_EVENT_ATTEND_FAILD: {
      return {
        ...state,
        downloadeventattendstatus: 400,
        downloadeventattend: null,
      };
    }
    case Actions.DOWNLOAD_MLSLINK_ACCOUNT_START: {
      return {
        ...state,
        downloadMLSLinkAccount: null,
        downloadMLSLinkAccountstatus: 100,
        loadingtxt: 'Updating Linked MLS Accounts',
      };
    }
    case Actions.DOWNLOAD_MLSLINK_ACCOUNT_SUCCESS: {
      return {
        ...state,
        downloadMLSLinkAccount: action.payload,
        downloadMLSLinkAccountstatus: 200,
      };
    }
    case Actions.DOWNLOAD_MLSLINK_ACCOUNT_FAILD: {
      return {
        ...state,
        downloadMLSLinkAccountstatus: 400,
        downloadMLSLinkAccount: null,
      };
    }
    case Actions.RESET_PASSWORD_START: {
      return {
        ...state,
        resetpassword: null,
        resetpasswordstatus: 100,
        loadingtxt: 'Sending Request...',
      };
    }
    case Actions.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetpassword: action.payload,
        resetpasswordstatus: 200,
      };
    }
    case Actions.RESET_PASSWORD_FAILD: {
      return {
        ...state,
        resetpasswordstatus: 400,
        resetpassword: null,
      };
    }

    case Actions.DOWNLOAD_PROIN_START: {
      return {
        ...state,
        profileinfo: null,
        profileinfostatus: 100,
      };
    }
    case Actions.DOWNLOAD_PROIN_SUCCESS: {
      return {
        ...state,
        profileinfo: action.payload,
        profileinfostatus: 200,
      };
    }
    case Actions.DOWNLOAD_PROIN_FAILD: {
      return {
        ...state,
        profileinfo: null,
        profileinfostatus: 400,
      };
    }
    default: {
      return state;
    }
  }
};

const persistConfig = {
  key: 'login',
  storage: storage,
  // blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, login);
