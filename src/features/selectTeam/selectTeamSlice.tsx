import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITeam } from "../../common/interfaces";

// Define a type for the slice state
interface teamState {
    teams: ITeam[]; // ITeam is an interface array of objects.
}

// Define the initial state using that type
const initialState: teamState = {
    teams: [],
};

export const teamSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        teamsHandler: (state, action: PayloadAction<ITeam>) => {
            state.teams = [...state.teams, action.payload];
        },
    },
});

export const { teamsHandler } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
