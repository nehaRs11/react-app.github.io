import { createSelector, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const authSlice = createSlice({
    name:'login',
    initialState:{
        signIn: false as boolean
    },
    reducers:{
        signIn:(state,action)=>{
            // console.log("in redux")
            state.signIn = action.payload
        }
    }
});

export const {signIn} = authSlice.actions

export default authSlice.reducer;

const isLogged = (state: AppState)=> state.authSlice.signIn

export const authSelector = createSelector([isLogged],(isLogged)=> isLogged)