import { AuthService } from '@services';
import { Images, Fonts, Constants } from '@commons';
import { NetInfor } from 'react-moment'
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_FAILD = 'USER_LOGIN_FAILD';
export const USER_INIT = 'USER_INIT';
export const USER_INIT_STATUS = 'USER_INIT_STATUS';
export const UPDATE_DATA_START = 'UPDATE_DATA_START';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';
export const UPDATE_DATA_FAILD = 'UPDATE_DATA_FAILD';

export const DOWNLOAD_STATION_LIST_START = 'DOWNLOAD_STATION_LIST_START';
export const DOWNLOAD_STATION_LIST_SUCCESS = 'DOWNLOAD_STATION_LIST_SUCCESS';
export const DOWNLOAD_STATION_LIST_FAILD = 'DOWNLOAD_STATION_LIST_FAILD';

export const DOWNLOAD_MORTGAGE_LIST_START = 'DOWNLOAD_MORTGAGE_LIST_START';
export const DOWNLOAD_MORTGAGE_LIST_SUCCESS = 'DOWNLOAD_MORTGAGE_LIST_SUCCESS';
export const DOWNLOAD_MORTGAGE_LIST_FAILD = 'DOWNLOAD_MORTGAGE_LIST_FAILD';

export const DOWNLOAD_DISCLOSURE_START = 'DOWNLOAD_DISCLOSURE_START';
export const DOWNLOAD_DISCLOSURE_SUCCESS = 'DOWNLOAD_DISCLOSURE_SUCCESS';
export const DOWNLOAD_DISCLOSURE_FAILD = 'DOWNLOAD_DISCLOSURE_FAILD';

export const DOWNLOAD_PROPERTIES_START = 'DOWNLOAD_PROPERTIES_START';
export const DOWNLOAD_PROPERTIES_SUCCESS = 'DOWNLOAD_PROPERTIES_SUCCESS';
export const DOWNLOAD_PROPERTIES_FAILD = 'DOWNLOAD_PROPERTIES_FAILD';

export const DOWNLOAD_PROPERTIES_ATTENDE_START =
  'DOWNLOAD_PROPERTIES_ATTENDE_START';
export const DOWNLOAD_PROPERTIES_ATTENDE_SUCCESS =
  'DOWNLOAD_PROPERTIES_ATTENDE_SUCCESS';
export const DOWNLOAD_PROPERTIES_ATTENDE_FAILD =
  'DOWNLOAD_PROPERTIES_ATTENDE_FAILD';

export const DOWNLOAD_PROPERTIES_BROKER_ATTENDE_START =
  'DOWNLOAD_PROPERTIES_BROKER_ATTENDE_START';
export const DOWNLOAD_PROPERTIES_BROKER_ATTENDE_SUCCESS =
  'DOWNLOAD_PROPERTIES_BROKER_ATTENDE_SUCCESS';
export const DOWNLOAD_PROPERTIES_BROKER_ATTENDE_FAILD =
  'DOWNLOAD_PROPERTIES_BROKER_ATTENDE_FAILD';

export const DOWNLOAD_EVENT_START = 'DOWNLOAD_EVENT_START';
export const DOWNLOAD_EVENT_SUCCESS = 'DOWNLOAD_EVENT_SUCCESS';
export const DOWNLOAD_EVENT_FAILD = 'DOWNLOAD_EVENT_FAILD';

export const DOWNLOAD_EVENT_ATTEND_START = 'DOWNLOAD_EVENT_ATTEND_START';
export const DOWNLOAD_EVENT_ATTEND_SUCCESS = 'DOWNLOAD_EVENT_ATTEND_SUCCESS';
export const DOWNLOAD_EVENT_ATTEND_FAILD = 'DOWNLOAD_EVENT_ATTEND_FAILD';

export const DOWNLOAD_MLSLINK_ACCOUNT_START = 'DOWNLOAD_MLSLINK_ACCOUNT_START';
export const DOWNLOAD_MLSLINK_ACCOUNT_SUCCESS =
  'DOWNLOAD_MLSLINK_ACCOUNT_SUCCESS';
export const DOWNLOAD_MLSLINK_ACCOUNT_FAILD = 'DOWNLOAD_MLSLINK_ACCOUNT_FAILD';

export const RESET_PASSWORD_START = 'RESET_PASSWORD_START';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILD = 'RESET_PASSWORD_FAILD';

export const DOWNLOAD_PROIN_START = 'DOWNLOAD_PROIN_START';
export const DOWNLOAD_PROIN_SUCCESS = 'DOWNLOAD_PROIN_SUCCESS';
export const DOWNLOAD_PROIN_FAILD = 'DOWNLOAD_PROIN_FAILD';

export function initauth() {
  return dispatch => {
    dispatch({
      type: USER_INIT,
    });
  };
}

export function logout() {
  return dispatch => {
    dispatch({
      type: USER_LOG_OUT,
    });
  };
}

export function initauthstatus() {
  return dispatch => {
    dispatch({
      type: USER_INIT_STATUS,
    });
  };
}
export function login(email, password) {
  return dispatch => {
    dispatch({
      type: USER_LOGIN_START,
    });
    (async () => {
      let res = await AuthService.authlogin(email, password);
      console.log('$$$$$$$$$$$$$$$$$$$$');
      console.log(res);
      console.log('$$$$$$$$$$$$$$$$$$$$');
      if (res[0] && res[0].error) {
        dispatch({ type: USER_LOGIN_FAILD,  payload: res[0].error });
       
      } else {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res[0],
        });
      }
    })();
  };
}
export function resetpassword(email) {
  return dispatch => {
    dispatch({
      type: RESET_PASSWORD_START,
    });
    (async () => {
      let res = await AuthService.authrequestpassword(email);
      if (res.IsSuccess) {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data[0] });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILD,
          payload: res.data[0],
        });
      }
    })();
  };
}

export function authupdate() {
  return dispatch => {
    dispatch({
      type: UPDATE_DATA_START,
    });
    (async () => {
      let res = await AuthService.authupdate();
      dispatch({
        type: UPDATE_DATA_SUCCESS,
        payload: res,
      });
    })();
  };
}

export function authdownloadstationlist() {
  return dispatch => {
    dispatch({
      type: DOWNLOAD_STATION_LIST_START,
    });
    (async () => {
      let res = await AuthService.authdownloadstationlist();
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_STATION_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_STATION_LIST_FAILD,
        });
      }
    })();
  };
}

export function authdownloadmortgage() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_MORTGAGE_LIST_START,
    });
    let advertisingid =
      getState().login.account !== null &&
        getState().login.account.advertising_id
        ? getState().login.account.advertising_id
        : '';
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloadmortgage(
        advertisingid,
        accountnum,
      );
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_MORTGAGE_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_MORTGAGE_LIST_FAILD,
        });
      }
    })();
  };
}

export function profile_login() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_PROIN_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.profile_login(
        Constants.user_mail,
        Constants.user_password,
      );
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_PROIN_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_PROIN_FAILD,
        });
      }
    })();
  };
}

export function authdownloaddisclosure() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_DISCLOSURE_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloaddisclosure(accountnum, 'NY');
      if (res.IsSuccess) {
        // alert('ddd');
        dispatch({
          type: DOWNLOAD_DISCLOSURE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_DISCLOSURE_FAILD,
        });
      }
    })();
  };
}

export function authdownloadProperties() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_PROPERTIES_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloadProperties(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_PROPERTIES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_PROPERTIES_FAILD,
        });
      }
    })();
  };
}

export function authdownloadPropertyAttende() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_PROPERTIES_ATTENDE_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloadPropertyAttende(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_PROPERTIES_ATTENDE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_PROPERTIES_ATTENDE_FAILD,
        });
      }
    })();
  };
}

export function authdownloadPropertyBrokerAttende() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_PROPERTIES_BROKER_ATTENDE_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloadPropertyBrokerAttende(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_PROPERTIES_BROKER_ATTENDE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_PROPERTIES_BROKER_ATTENDE_FAILD,
        });
      }
    })();
  };
}

export function authdownloadEvent() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_EVENT_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloadEvent(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_EVENT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_EVENT_FAILD,
        });
      }
    })();
  };
}

export function authdownloadEventAttend() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_EVENT_ATTEND_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloadEventAttend(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_EVENT_ATTEND_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_EVENT_ATTEND_FAILD,
        });
      }
    })();
  };
}

export function authdownloadMLSLinkAccount() {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_MLSLINK_ACCOUNT_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await AuthService.authdownloadMLSLinkAccount(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: DOWNLOAD_MLSLINK_ACCOUNT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: DOWNLOAD_MLSLINK_ACCOUNT_FAILD,
        });
      }
    })();
  };
}
