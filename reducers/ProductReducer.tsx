import { Reducer } from 'react';
import {
	// cartReducerAction,
	CartItemProp,
	cartActionEnum,
	CartAction,
} from '../types/Types';

export const productReducer: Reducer<CartItemProp[], CartAction> = (
	state,
	action,
) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const payload = action.payload as CartItemProp;
			if (state.find((state) => state.id === payload.id)) {
				return state.map((obj) => {
					if (obj.id === payload.id)
						return {
							...obj,
							quantity: obj.quantity + 1,
						};

					return obj;
				});
			}

			return [...state, action.payload];

		case 'INCREMENT':
			return state.map((obj) => {
				if (obj.id === action.payload)
					return {
						...obj,
						quantity: obj.quantity + 1,
					};

				return obj;
			});

		case 'DECREMENT':
			return state.map((obj) => {
				if (obj.id === action.payload)
					return {
						...obj,
						quantity: obj.quantity - 1,
					};

				return obj;
			});

		case 'REMOVE_FROM_CART':
			return state.filter((state) => state.id !== action.payload);

		default:
			return state;
	}
};
