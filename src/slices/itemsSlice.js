import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import spotifyApi from "../spotifyFunctions";

export const getTopTracks = createAsyncThunk(
  "topItems/getTopTracks",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getMyTopTracks({
        limit: 50,
        time_range: payload.timeFrame,
      });
      return response.items;
    } catch (error) {
      return rejectWithValue(error.response.body);
    }
  }
);

export const getTopArtists = createAsyncThunk(
  "topItems/getTopArtists",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getMyTopArtists({
        limit: 50,
        time_range: payload.timeFrame,
      });
      return response.items;
    } catch (error) {
      return rejectWithValue(error.response.body);
    }
  }
);

export const getUserPlaylists = createAsyncThunk(
  "playlist/getUserPlaylists",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getUserPlaylists({ limit: 50 });
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

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: {
    [getTopTracks.pending]: (state) => {
      state.error = false;
      state.isLoading = true;
    },
    [getTopTracks.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getTopTracks.rejected]: (state, action) => {
      state.data = action.payload;
      state.error = true;
      state.isLoading = true;
    },
    [getTopArtists.pending]: (state) => {
      state.error = false;
      state.isLoading = true;
    },
    [getTopArtists.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getTopArtists.rejected]: (state, action) => {
      state.data = action.payload;
      state.error = true;
      state.isLoading = true;
    },
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

export default itemsSlice.reducer;
