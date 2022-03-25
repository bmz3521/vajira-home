import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "@reducers";
import { rootSaga } from '@sagas';

const sagaMiddleware = createSagaMiddleware();

/**
 * Redux Setting
 */
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    timeout: 100000,
    // whitelist: ['glucose']
};

let middleware = [thunk, sagaMiddleware];
if (process.env.NODE_ENV === `development`) {
    middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
