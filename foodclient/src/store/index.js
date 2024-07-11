import { configureStore } from '@reduxjs/toolkit';
import Reducer from './reducer';

const store = configureStore({
    reducer: {
        meals: Reducer,
    },
});

export default store;