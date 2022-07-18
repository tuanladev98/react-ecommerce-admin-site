import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user_slice';
import sideBarReducer from './side_bar_slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sideBar: sideBarReducer,
  },
});
