// import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import persistReducer from 'redux-persist/es/persistReducer';
// import persistStore from 'redux-persist/es/persistStore';
// import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { lottoNumberReducers } from '../reducers/lottoNumbers';
import { newsReducer } from '../reducers/newsReducer';

const rootReducer = combineReducers({
  numbers: lottoNumberReducers,
  news: newsReducer,
});

// const persistedReducer = persistReducer(
//   {
//     key: 'root',
//     storage: AsyncStorage,
//     stateReconciler: hardSet,
//   },
//   rootReducer,
// );

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
// export const store = createStore(persistedReducer, applyMiddleware(logger));
// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
