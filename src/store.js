import {applyMiddleware, createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import mainReducers from './store/reducers';
import middleware from './store/middleware/index';
import { composeWithDevTools } from 'redux-devtools-extension';


const enhancer = composeWithDevTools(
    applyMiddleware(...middleware)
);

const persistConfig = {
    key: 'openhouse',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, mainReducers());

export const store =  createStore(pReducer, enhancer);
export const persistor = persistStore(store);
