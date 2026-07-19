import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.id === item.id,
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    ...item,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload,
            );
        },

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (cartItem) => cartItem.id === action.payload,
            );

            if (item) {
                item.quantity++;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (cartItem) => cartItem.id === action.payload,
            );

            if (!item) return;

            if (item.quantity > 1) {
                item.quantity--;
            } else {
                state.cartItems = state.cartItems.filter(
                    (cartItem) => cartItem.id !== action.payload,
                );
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
