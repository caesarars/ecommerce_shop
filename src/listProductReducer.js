import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products :[]
}


const productsSlice = createSlice({
    name : "products",
    initialState,
})