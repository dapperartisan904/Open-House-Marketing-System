import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as Actions from '../actions';

export const initialState = {
    accountinfo:null,
    status: 10,

    loadingtxt:'',
    lodingstatus:false,
    realtortitles: null,
    realtortitlesstatus: 10,
    title: '',

    brokername: null,
    brokernamestatus: 10,
    broker: null,

    origination: null,
    originationstatus: 10,
    orgitem: null,

    realtorstatus: 10,

    newaccountinfo:null,
    newaccountstatus: 10,
}


const createaccount = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.USER_INIT:{
            return {
                ...initialState
            }
        }
        case Actions.CREATE_ACCOUNT_START:{
            return {
                ...state,
                accountinfo:null,
            }
        }
        case Actions.CREATE_ACCOUNT_SUCCESS:{
            return {
                ...state,
                accountinfo:action.payload,
            }
        }
        case Actions.CREATE_ACCOUNT_FAILD:{
            return {
                ...state,
                accountinfo: null,
            }
        }
        case Actions.CREATE_ACCOUNT_DATA_START:{
            return {
                ...state,
                loadingtxt:'Updating data...',
                realtortitles:null,
                realtortitlesstatus:100,
                lodingstatus:true,
            }
        }
        case Actions.CREATE_ACCOUNT_DATA_SUCCESS:{
            return {
                ...state,
                realtortitles:action.payload,
                realtortitlesstatus: 200,
                lodingstatus:false,
                loadingtxt:'',
            }
        }
        case Actions.CREATE_ACCOUNT_DATA_FAILD:{
            return {
                ...state,
                realtortitlesstatus: 400,
                realtortitles:null,
                lodingstatus:false,
                loadingtxt:'',
            }
        }
        case Actions.GET_BROKERS_NAME_START:{
            return {
                ...state,
                brokername:null,
                brokernamestatus: 100,
                title:'',
                lodingstatus:true,
                loadingtxt:'Updating Title...',
            }
        }
        case Actions.GET_BROKERS_NAME_SUCCESS:{
            return {
                ...state,
                brokername:action.payload.data,
                brokernamestatus: 200,
                lodingstatus:false,
                loadingtxt:'',
                title:action.payload.title,
            }
        }
        case Actions.GET_BROKERS_NAME_FAILD:{
            return {
                ...state,
                brokernamestatus: 400,
                lodingstatus:false,
                loadingtxt:'',
                brokername:null,
            }
        }
        case Actions.GET_ORIGINATIONS_LIST_START:{
            return {
                ...state,
                origination:null,
                originationstatus: 100,
                lodingstatus:true,
                loadingtxt:'Updating Broker...',
            }
        }
        case Actions.GET_ORIGINATIONS_LIST_SUCCESS:{
            return {
                ...state,
                origination:action.payload,
                broker: action.broker,
                lodingstatus:false,
                loadingtxt:'',
                originationstatus: 200,
            }
        }
        case Actions.GET_ORIGINATIONS_LIST_FAILD:{
            return {
                ...state,
                origination:null,
                lodingstatus:false,
                loadingtxt:'',
                originationstatus: 400,
            }
        }
        case Actions.SET_ORIGINATION_ITEM_START:{
            return {
                ...state,
                loadingtxt:'Updating Realtor...',
                orgitem:null,
                realtorstatus: 100,
            }
        }
        case Actions.SET_ORIGINATION_ITEM_SUCCESS:{
            return {
                ...state,
                orgitem:action.payload,
                realtorstatus: 200,
            }
        }
        case Actions.SET_ORIGINATION_ITEM_FAILD:{
            return {
                ...state,
                orgitem: null,
                realtorstatus: 400,
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_START:{
            return {
                ...state,
                newaccountinfo:null,
                newaccountstatus:100,
                loadingtxt:'Creating Account...',
                lodingstatus:true,
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_SUCCESS:{
            return {
                ...state,
                newaccountinfo:action.payload,
                newaccountstatus: 200,
                loadingtxt:'',
                lodingstatus:false,
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_FAILD:{
            return {
                ...state,
                newaccountstatus: 400,
                newaccountinfo:null,
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_EMAIL_FAILD:{
            return{
                ...state,
                newaccountstatus: 500,
                newaccountinfo:null,
            }
        }
        case Actions.USER_LOG_OUT:{
            return {
                ...initialState,
            }
        }
        default:
        {
            return state
        }
    }
}

const persistConfig = {
    key: 'createaccount',
    storage: storage,
    // blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, createaccount);
