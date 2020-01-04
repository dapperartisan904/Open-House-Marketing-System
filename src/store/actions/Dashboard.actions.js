import { DashboardService, AuthService } from '@services';

export const GET_PROPERTIES_START = 'GET_PROPERTIES_START';
export const GET_PROPERTIES_SUCCESS = 'GET_PROPERTIES_SUCCESS';
export const GET_PROPERTIES_FAILD = 'GET_PROPERTIES_FAILD';

export const CREATE_PROPERTY_ITEM_START = 'CREATE_PROPERTY_ITEM_START';
export const CREATE_PROPERTY_ITEM_SUCCESS = 'CREATE_PROPERTY_ITEM_SUCCESS';
export const CREATE_PROPERTY_ITEM_FAILD = 'CREATE_PROPERTY_ITEM_FAILD';

export const CREATE_EVENT_ITEM_START = 'CREATE_EVENT_ITEM_START';
export const CREATE_EVENT_ITEM_SUCCESS = 'CREATE_EVENT_ITEM_SUCCESS';
export const CREATE_EVENT_ITEM_FAILD = 'CREATE_EVENT_ITEM_FAILD';

export const SELECT_PROPERTY_ITEM_START = 'SELECT_PROPERTY_ITEM_START';
export const SELECT_PROPERTY_ITEM_SUCCESS = 'SELECT_PROPERTY_ITEM_SUCCESS';
export const SELECT_PROPERTY_ITEM_FAILD = 'SELECT_PROPERTY_ITEM_FAILD';

export const UPDATE_HOUSE_HANDLE_TYPE_START = 'UPDATE_HOUSE_HANDLE_TYPE_START';
export const UPDATE_HOUSE_HANDLE_TYPE_SUCCESS =
  'UPDATE_HOUSE_HANDLE_TYPE_SUCCESS';
export const UPDATE_HOUSE_HANDLE_TYPE_FAILD = 'UPDATE_HOUSE_HANDLE_TYPE_FAILD';

export const SELECT_MORTGAGE_ITEM_START = 'SELECT_MORTGAGE_ITEM_START';
export const SELECT_MORTGAGE_ITEM_SUCCESS = 'SELECT_MORTGAGE_ITEM_SUCCESS';
export const SELECT_MORTGAGE_ITEM_FAILD = 'SELECT_MORTGAGE_ITEM_FAILD';

export const CREATE_NEW_AGENT_INFO_ITEM_START =
  'CREATE_NEW_AGENT_INFO_ITEM_START';
export const CREATE_NEW_AGENT_INFO_ITEM_SUCCESS =
  'CREATE_NEW_AGENT_INFO_ITEM_SUCCESS';
export const CREATE_NEW_AGENT_INFO_ITEM_FAILD =
  'CREATE_NEW_AGENT_INFO_ITEM_FAILD';

export const POST_NEW_EVENT_ITEM_START = 'POST_NEW_EVENT_ITEM_START';
export const POST_NEW_EVENT_ITEM_SUCCESS = 'POST_NEW_EVENT_ITEM_SUCCESS';
export const POST_NEW_EVENT_ITEM_FAILD = 'POST_NEW_EVENT_ITEM_FAILD';

export const POST_NEW_ATTENDEE_ITEM_START = 'POST_NEW_ATTENDEE_ITEM_START';
export const POST_NEW_ATTENDEE_ITEM_SUCCESS = 'POST_NEW_ATTENDEE_ITEM_SUCCESS';
export const POST_NEW_ATTENDEE_ITEM_FAILD = 'POST_NEW_ATTENDEE_ITEM_FAILD';

export const GET_EVENT_START = 'GET_EVENT_START';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILD = 'GET_EVENT_FAILD';

export const GET_LEAD_START = 'GET_LEAD_START';
export const GET_LEAD_SUCCESS = 'GET_LEAD_SUCCESS';
export const GET_LEAD_FAILD = 'GET_LEAD_FAILD';

export const GET_OPEN_HOUSE_START = 'GET_OPEN_HOUSE_START';
export const GET_OPEN_HOUSE_SUCCESS = 'GET_OPEN_HOUSE_SUCCESS';
export const GET_OPEN_HOUSE_FAILD = 'GET_OPEN_HOUSE_FAILD';

export const GET_MY_BOARD_START = 'GET_MY_BOARD_START';
export const GET_MY_BOARD_SUCCESS = 'GET_MY_BOARD_SUCCESS';
export const GET_MY_BOARD_FAILD = 'GET_MY_BOARD_FAILD';

export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILD = 'GET_PROFILE_FAILD';

export const GET_MORTGAGE_START = 'GET_MORTGAGE_START';
export const GET_MORTGAGE_SUCCESS = 'GET_MORTGAGE_SUCCESS';
export const GET_MORTGAGE_FAILD = 'GET_MORTGAGE_FAILD';

export const UPDATE_PARTNER_START = 'UPDATE_PARTNER_START';
export const UPDATE_PARTNER_SUCCESS = 'UPDATE_PARTNER_SUCCESS';
export const UPDATE_PARTNER_FAILD = 'UPDATE_PARTNER_FAILD';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILD = 'UPDATE_PROFILE_FAILD';

export const SEARCH_LMSACCOUNT_START = 'SEARCH_LMSACCOUNT_START';
export const SEARCH_LMSACCOUNT_SUCCESS = 'SEARCH_LMSACCOUNT_SUCCESS';
export const SEARCH_LMSACCOUNT_FAILD = 'SEARCH_LMSACCOUNT_FAILD';

export const LINK_LMSACCOUNT_START = 'LINK_LMSACCOUNT_START';
export const LINK_LMSACCOUNT_SUCCESS = 'LINK_LMSACCOUNT_SUCCESS';
export const LINK_LMSACCOUNT_FAILD = 'LINK_LMSACCOUNT_FAILD';

export const POST_BROKER_START = 'POST_BROKER_START';
export const POST_BROKER_SUCCESS = 'POST_BROKER_SUCCESS';
export const POST_BROKER_FAILD = 'POST_BROKER_FAILD';

export const POST_PUBLICBROKER_START = 'POST_PUBLICBROKER_START';
export const POST_PUBLICBROKER_SUCCESS = 'POST_PUBLICBROKER_SUCCESS';
export const POST_PUBLICBROKER_FAILD = 'POST_PUBLICBROKER_FAILD';

export const POST_PUBLIC_START = 'POST_PUBLIC_START';
export const POST_PUBLIC_SUCCESS = 'POST_PUBLIC_SUCCESS';
export const POST_PUBLIC_FAILD = 'POST_PUBLIC_FAILD';

export function getproperties(accountnum) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PROPERTIES_START,
    });
    if (accountnum == null) {
      accountnum =
        getState().login.account !== null && getState().login.account.account_num
          ? getState().login.account.account_num
          : '';
    }
    (async () => {
      let res = await DashboardService.getproperties(accountnum);

      if (res.IsSuccess) {
        dispatch({
          type: GET_PROPERTIES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PROPERTIES_FAILD,
        });
      }
    })();
  };
}

export function getevent(accountnum) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_EVENT_START,
    });
    if (accountnum == null) {
      accountnum =
        getState().login.account !== null && getState().login.account.account_num
          ? getState().login.account.account_num
          : '';
    }
    (async () => {
      let res = await AuthService.authdownloadEvent(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: GET_EVENT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_EVENT_FAILD,
        });
      }
    })();
  };
}

export function getlead() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_LEAD_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await DashboardService.getelead(accountnum);
      let res1 = await DashboardService.getbroker(accountnum);
      //   alert(res.data);
      if (res.IsSuccess && res1.IsSuccess) {
        dispatch({
          type: GET_LEAD_SUCCESS,
          payload: { attendees: res.data, broker: res1.data },
        });
      } else {
        dispatch({
          type: GET_LEAD_FAILD,
        });
      }
    })();
  };
}

export function getOpenHouse() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_OPEN_HOUSE_START,
    });
    dispatch({
      type: GET_OPEN_HOUSE_SUCCESS,
      payload: getState().dashboard.swichData,
    });
  };
}

export function getMyboard() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_LEAD_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await DashboardService.getmyboard(accountnum);
      if (res.IsSuccess) {
        dispatch({
          type: GET_MY_BOARD_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_MY_BOARD_FAILD,
        });
      }
    })();
  };
}
export function getprofile() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PROFILE_START,
    });
    setTimeout(() => {
      dispatch({
        type: GET_PROFILE_SUCCESS,
      });
    }, 100)
  };
}
export function unlinkaccount(item) {
  return (dispatch, getState) => {
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await DashboardService.unlinkaccount(item, accountnum);
      if (res.IsSuccess) {
        // alert(item.mls_organization_id);
        let res1 = await DashboardService.getmyboard(accountnum);
        if (res1.IsSuccess) {
          dispatch({
            type: GET_MY_BOARD_SUCCESS,
            payload: res1.data,
          });
        } else {
          dispatch({
            type: GET_MY_BOARD_FAILD,
          });
        }
      } else {
        dispatch({
          type: GET_MY_BOARD_FAILD,
        });
      }
    })();
  };
}
export function SearchLMSAccount(item, agent_id) {
  return (dispatch, getState) => {
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await DashboardService.searchLMSaccount(
        item,
        accountnum,
        agent_id,
      );
      if (res.IsSuccess) {
        dispatch({
          type: SEARCH_LMSACCOUNT_SUCCESS,
          payload: res.data,
        });
        // return res.data;
      }
    })();
  };
}
export function LinkLMSAccount(item, mls_organization_id) {
  return (dispatch, getState) => {
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await DashboardService.LinkLMSaccount(
        item,
        accountnum,
        mls_organization_id,
      );
      if (res.IsSuccess) {
        dispatch({
          type: LINK_LMSACCOUNT_SUCCESS,
          payload: res.data,
        });
        // return res.data;
      }
    })();
  };
}
export function getmortgage() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_MORTGAGE_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    let advertisingid =
      getState().login.account !== null &&
        getState().login.account.advertising_id
        ? getState().login.account.advertising_id
        : '';
    (async () => {
      let res = await DashboardService.getMortgage(advertisingid);
      if (res.IsSuccess) {
        dispatch({
          type: GET_MORTGAGE_SUCCESS,
          payload: res.data,
        });
      }
    })();
  };
}

export function createproperty(
  accountnum,
  propertytype,
  propertyid,
  propertyaddress,
  propertycity,
  propertystate,
  propertyzipcode,
  propertyprice,
  propertytaxes,
) {
  return dispatch => {
    dispatch({
      type: CREATE_PROPERTY_ITEM_START,
    });

    (async () => {
      let res = await DashboardService.createProperty(
        accountnum,
        propertytype,
        propertyid,
        propertyaddress,
        propertycity,
        propertystate,
        propertyzipcode,
        propertyprice,
        propertytaxes,
      );
      if (res.IsSuccess) {
        dispatch({
          type: CREATE_PROPERTY_ITEM_SUCCESS,
          payload: res.data[0],
        });
      } else {
        dispatch({
          type: CREATE_PROPERTY_ITEM_FAILD,
        });
      }
    })();
  };
}

export function createevent(data) {
  return dispatch => {
    dispatch({
      type: CREATE_EVENT_ITEM_START,
    });

    (async () => {
      let res = await DashboardService.createevent(data);
      if (res.IsSuccess) {
        dispatch({
          type: CREATE_EVENT_ITEM_SUCCESS,
          payload: res.data[0],
        });
      } else {
        dispatch({
          type: CREATE_EVENT_ITEM_FAILD,
        });
      }
    })();
  };
}

export function setpropertyitem(item) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_PROPERTY_ITEM_START,
    });
    if (item && item !== null) {
      dispatch({
        type: SELECT_PROPERTY_ITEM_SUCCESS,
        payload: item,
      });
    } else {
      dispatch({
        type: SELECT_PROPERTY_ITEM_FAILD,
      });
    }
  };
}

export function sethousehandletype(item) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_HOUSE_HANDLE_TYPE_START,
    });
    if (item && item !== null) {
      dispatch({
        type: UPDATE_HOUSE_HANDLE_TYPE_SUCCESS,
        payload: item,
      });
    } else {
      dispatch({
        type: UPDATE_HOUSE_HANDLE_TYPE_FAILD,
      });
    }
  };
}

export function setmortgageitem(item) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_MORTGAGE_ITEM_START,
    });
    if (item && item !== null) {
      dispatch({
        type: SELECT_MORTGAGE_ITEM_SUCCESS,
        payload: item,
      });
    } else {
      dispatch({
        type: SELECT_MORTGAGE_ITEM_FAILD,
      });
    }
  };
}

export function setagentitem(item) {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_NEW_AGENT_INFO_ITEM_START,
    });
    if (item && item !== null) {
      dispatch({
        type: CREATE_NEW_AGENT_INFO_ITEM_SUCCESS,
        payload: item,
      });
    } else {
      dispatch({
        type: CREATE_NEW_AGENT_INFO_ITEM_FAILD,
      });
    }
  };
}

export function postnewattendeeagent(data) {
  return dispatch => {
    dispatch({
      type: POST_NEW_ATTENDEE_ITEM_START,
    });

    (async () => {
      let res = await DashboardService.createnewattendeeagent(data);
      if (res.IsSuccess) {
        dispatch({
          type: POST_NEW_ATTENDEE_ITEM_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_NEW_ATTENDEE_ITEM_FAILD,
        });
      }
    })();
  };
}

export function postnewattendeeevent(data) {
  return dispatch => {
    dispatch({
      type: POST_NEW_EVENT_ITEM_START,
    });

    (async () => {
      let res = await DashboardService.createnewattendeeevent(data);
      if (res.IsSuccess) {
        dispatch({
          type: POST_NEW_EVENT_ITEM_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_NEW_EVENT_ITEM_FAILD,
        });
      }
    })();
  };
}
export function postBroker(data) {
  return dispatch => {
    dispatch({
      type: POST_BROKER_START,
    });

    (async () => {
      let res = await DashboardService.PostBroker(data);
      if (res.IsSuccess) {
        dispatch({
          type: POST_BROKER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_BROKER_FAILD,
        });
      }
    })();
  };
}
export function postPublicBroker(data) {
  return dispatch => {
    dispatch({
      type: POST_PUBLICBROKER_START,
    });

    (async () => {
      let res = await DashboardService.PostPublicBroker(data);
      if (res.IsSuccess) {
        dispatch({
          type: POST_PUBLICBROKER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_PUBLICBROKER_FAILD,
        });
      }
    })();
  };
}
export function postData(data) {
  return dispatch => {
    // dispatch({
    //   type: POST_PUBLIC_START,
    // });

    (async () => {
      let res = await DashboardService.PostData(data);
      if (res.IsSuccess) {
        console.log('***************************************');
        console.log(res);
        console.log('----------------------------------------');
        dispatch({
          type: POST_PUBLIC_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_PUBLIC_FAILD,
        });
      }
    })();
  };
}

export function updatepartner(data) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PARTNER_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';
    (async () => {
      let res = await DashboardService.update_partner(
        accountnum,
        data.advertisingid,
      );
      if (res.IsSuccess) {
        dispatch({
          type: UPDATE_PARTNER_SUCCESS,
          payload: true,
        });
      } else {
        dispatch({
          type: UPDATE_PARTNER_FAILD,
        });
      }
    })();
  };
}

export function updateprofile(
  firstname,
  lastname,
  cellphone,
  officename,
  title,
) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PROFILE_START,
    });
    let accountnum =
      getState().login.account !== null && getState().login.account.account_num
        ? getState().login.account.account_num
        : '';

    (async () => {
      let res = await DashboardService.updateprofile(
        accountnum,
        firstname,
        lastname,
        cellphone,
        officename,
        title,
      );
      if (res.IsSuccess) {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: true,
        });
      } else {
        dispatch({
          type: UPDATE_PROFILE_FAILD,
        });
      }
    })();
  };
}
