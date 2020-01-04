import { AuthService } from '@services';


export const CREATE_ACCOUNT_START = 'CREATE_ACCOUNT_START';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILD = 'CREATE_ACCOUNT_FAILD';

export const CREATE_NEW_ACCOUNT_START = 'CREATE_NEW_ACCOUNT_START';
export const CREATE_NEW_ACCOUNT_SUCCESS = 'CREATE_NEW_ACCOUNT_SUCCESS';
export const CREATE_NEW_ACCOUNT_FAILD = 'CREATE_NEW_ACCOUNT_FAILD';
export const CREATE_NEW_ACCOUNT_EMAIL_FAILD = 'CREATE_NEW_ACCOUNT_EMAIL_FAILD';

export const CREATE_ACCOUNT_DATA_START = 'CREATE_ACCOUNT_DATA_START';
export const CREATE_ACCOUNT_DATA_SUCCESS = 'CREATE_ACCOUNT_DATA_SUCCESS';
export const CREATE_ACCOUNT_DATA_FAILD = 'CREATE_ACCOUNT_DATA_FAILD';

export const GET_BROKERS_NAME_START = 'GET_BROKERS_NAME_START';
export const GET_BROKERS_NAME_SUCCESS = 'GET_BROKERS_NAME_SUCCESS';
export const GET_BROKERS_NAME_FAILD = 'GET_BROKERS_NAME_FAILD';

export const GET_ORIGINATIONS_LIST_START = 'GET_ORIGINATIONS_LIST_START';
export const GET_ORIGINATIONS_LIST_SUCCESS = 'GET_ORIGINATIONS_LIST_SUCCESS';
export const GET_ORIGINATIONS_LIST_FAILD = 'GET_ORIGINATIONS_LIST_FAILD';

export const SET_ORIGINATION_ITEM_START = 'SET_ORIGINATION_ITEM_START';
export const SET_ORIGINATION_ITEM_SUCCESS = 'SET_ORIGINATION_ITEM_SUCCESS';
export const SET_ORIGINATION_ITEM_FAILD = 'SET_ORIGINATION_ITEM_FAILD';




export function addnewaccountinfo(data) {
    return (dispatch) => {
        dispatch({
            type: CREATE_ACCOUNT_START,
        });
        (async () => {
            let res = await AuthService.addnewaccountinfo(data);
            if (res.IsSuccess) {
                dispatch({
                    type: CREATE_ACCOUNT_SUCCESS,
                    payload: res.data,
                });
            }
            else {
                dispatch({
                    type: CREATE_ACCOUNT_FAILD,
                })
            }

        })()
    }
}

export function getcreateaccountdata() {
    return (dispatch) => {
        dispatch({
            type: CREATE_ACCOUNT_DATA_START,
        });
        (async () => {
            let res = await AuthService.authgetRealtortitles();
            if (res.IsSuccess) {
                dispatch({
                    type: CREATE_ACCOUNT_DATA_SUCCESS,
                    payload: res.data,
                });
            }
            else {
                dispatch({
                    type: CREATE_ACCOUNT_DATA_FAILD,
                })
            }

        })()
    }
}

export function getbrokersname(title) {
    return (dispatch) => {
        dispatch({
            type: GET_BROKERS_NAME_START,
        });
        (async () => {
            let res = await AuthService.authgetbrokersname();
            if (res.IsSuccess) {
                dispatch({
                    type: GET_BROKERS_NAME_SUCCESS,
                    payload: {data:res.data,title:title},
                })
            }
            else {
                dispatch({
                    type: GET_BROKERS_NAME_FAILD,
                })
            }

        })()
    }
}

export function getoriginationlist(title) {
    return (dispatch) => {
        dispatch({
            type: GET_ORIGINATIONS_LIST_START,
        });
        (async () => {
            let res = await AuthService.authgetorganizations();
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ORIGINATIONS_LIST_SUCCESS,
                    payload: res.data,
                    broker: title,
                })
            }
            else {
                dispatch({
                    type: GET_ORIGINATIONS_LIST_FAILD,
                })
            }

        })()
    }
}


export function setoriginationitem(item) {
    return (dispatch) => {
        dispatch({
            type: SET_ORIGINATION_ITEM_START,
        });
        dispatch({
            type: SET_ORIGINATION_ITEM_SUCCESS,
            payload: item,
        });
    }
}

export function createnewaccount(firstname, lastname, cellphone, officetelephone, title, email, uniqueid, officename, mlsorganizationid, password, company_logo_url, device, appid) {
    return (dispatch) => {
        dispatch({
            type: CREATE_NEW_ACCOUNT_START,
        });
        (async () => {
            let res = await AuthService.authcreateaccount(
                firstname,
                lastname,
                cellphone,
                officetelephone,
                title,
                email,
                uniqueid,
                officename,
                mlsorganizationid,
                password,
                company_logo_url, device, appid);

            if (res.IsSuccess) {
                if (res.data && res.data[0].uniqueid) {
                    dispatch({
                        type: CREATE_NEW_ACCOUNT_SUCCESS,
                        payload: res.data,
                    })
                }
                else {
                    dispatch({
                        type: CREATE_NEW_ACCOUNT_EMAIL_FAILD,
                    })
                }

            }
            else {
                dispatch({
                    type: CREATE_NEW_ACCOUNT_FAILD,
                })
            }

        })()
    }
}