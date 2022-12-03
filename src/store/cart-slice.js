import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalItems: 0,
        totalQuantity: 0,
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            //check for existing item and increment qty and price
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else { //new item
                state.itemsList.push({
                    id: newItem.id,
                    name: newItem.name,
                    quantity: 1,
                    price: newItem.price,
                    totalPrice: newItem.price
                })
                state.totalQuantity++;
            }

        },
        removeFromCart() { },
        setShowCart(state) {
            state.showCart = !state.showCart;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;

