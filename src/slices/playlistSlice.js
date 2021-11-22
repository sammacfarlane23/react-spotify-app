import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import spotifyApi from "../spotifyFunctions";

export const getUserPlaylists = createAsyncThunk(
  "playlist/getUserPlaylists",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getUserPlaylists();
      return response.items;
    } catch (error) {
      return rejectWithValue(error.response.body);
    }
  }
);

const initialState = {
  isLoading: false,
  error: false,
  data: {},
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserPlaylists.pending]: (state) => {
      state.error = false;
      state.isLoading = true;
    },
    [getUserPlaylists.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getUserPlaylists.rejected]: (state, action) => {
      state.data = action.payload;
      state.error = true;
      state.isLoading = true;
    },
  },
});

export default playlistSlice.reducer;
