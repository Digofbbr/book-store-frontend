import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const alreadyOnCart = state.cartItems.find(
				(obj) => obj._id == action.payload._id
			);
			if (alreadyOnCart) {
			} else {
				state.cartItems.push(action.payload);
			}
			state.totalPrice += action.payload.newPrice;
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item) => item._id !== action.payload._id
			);
		},
		clearCart: (state) => {
			state.cartItems = [];
			state.totalPrice = 0;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
