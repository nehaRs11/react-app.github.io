import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./redux/authSlice";

const store = configureStore({
    reducer:{
        authSlice
    }
})

export default store;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch:()=> typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<AppState>= useSelector;