import { createSlice } from '@reduxjs/toolkit';

export const flightSlice = createSlice({
    name: 'flight',
    initialState: {
      value: [],
      query: {},
      isNewSearch: false,
      showFilterList: false,
      filterList: [],
      isLocalFiltering: false
    },
    reducers: {
      searchFlight: (state, action) =>{
        state.value = action.payload;
      },
      setIsNewSearch: (state, action) => {
        state.isNewSearch = action.payload;
      },
      setQuery: (state,action) =>{
        state.query = action.payload;
      },
      setFilterList: (state, action) =>{
        state.filterList = action.payload;
      },
      setShowFilterList: (state, action) => {
         state.showFilterList = action.payload; 
      },
      setIsLocalFiltering: (state, action) => {
          state.isLocalFiltering = action.payload;
      }
    },
})

// Action creators are generated for each case reducer function
export const { searchFlight, setIsNewSearch, setQuery, setShowFilterList, setFilterList, setIsLocalFiltering } = flightSlice.actions

export default flightSlice.reducer