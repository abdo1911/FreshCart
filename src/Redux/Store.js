import { configureStore } from '@reduxjs/toolkit'
import { producReducer } from './ProductSlice'

export let store  = configureStore({
    reducer:{
        producRed : producReducer
    },
})