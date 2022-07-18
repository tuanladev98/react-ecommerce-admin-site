import { createSlice } from '@reduxjs/toolkit';

const sideBarSlide = createSlice({
  name: 'side_bar',
  initialState: {
    activeMenu: 'HOME',
  },
  reducers: {
    changeMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { changeMenu } = sideBarSlide.actions;

export default sideBarSlide.reducer;
