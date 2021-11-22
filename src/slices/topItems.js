import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

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

const initialState = {
  isLoading: false,
  error: false,
  data: {},
};

const topItemsSlice = createSlice({
  name: "topItems",
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
  },
});

export default topItemsSlice.reducer;
