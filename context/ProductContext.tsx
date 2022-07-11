import React, { createContext, FC, FunctionComponent, ReactNode, useReducer } from 'react';
import { productReducer } from '../reducers/ProductReducer';

import { CartItemProp, ProductContextType } from '../types/Types';

interface ProviderProps {
 children:JSX.Element
}

const defaultContext:ProductContextType = {
	cartItems: [],
	addToCart: () => {},
	incrementCart: () => {},
	decrementCart: () => {},
	removeCart: () => {},
};

export const ProductContext = createContext<ProductContextType>(defaultContext);

const cartItemState:CartItemProp[] = [];

export const ProductContextProvider = ({ children }:ProviderProps) => {
	const [cartItems, dispatch] = useReducer(productReducer, cartItemState);

	const addToCart = (cartItem) => {
		dispatch({ type: 'ADD_TO_CART', payload: cartItem });
	};

	const incrementCart = (id) => {
		dispatch({ type: 'INCREMENT', payload: id });
	};
	const decrementCart = (id) => {
		dispatch({ type: 'DECREMENT', payload: id });
	};
	const removeCart = (id) => {
		dispatch({ type: 'REMOVE_FROM_CART', payload: id });
	};

	return (
		<ProductContext.Provider
			value={{ cartItems, addToCart, incrementCart, decrementCart, removeCart }}
		>
			{children}
		</ProductContext.Provider>
	);
};
