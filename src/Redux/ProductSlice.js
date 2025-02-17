import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState  = {
    counter:0,
    products:[],
    brands:[]
}

export let getBrands = createAsyncThunk(
    "product/getBrands",
    async function() {
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        return data;
    }
)

export let productSlice =createSlice({
    name:"product",
    initialState,
    reducers:{
        increament:(state)=>{
            state.counter++;
        },
        decrement:(state)=>{
            state.counter--;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getBrands.fulfilled,(state,action)=>{
            state.brands =action.payload.data
        })
    }
})

export let {increament,decrement} = productSlice.actions;
export let producReducer = productSlice.reducer;