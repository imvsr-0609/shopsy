import { ReactNode } from 'react';

export type LinkObject = {
	href: string;
	title: string;
};

export type ProductProp = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: {
		id: number;
		name: string;
		image: string;
	};
	images: string[];
};

export type SingleProductProp = {
	singleProductData: ProductProp;
};

export type ProductsProp = {
	data: ProductProp[];
};
export type FooterType = {
	icon: ReactNode;
	title: string;
	href: string;
};
export type CategoryProp = {
	id: number;
	name: string;
	image: string;
};

export type CategoriesProp = {
	data: CategoryProp[];
};

export type SingleCategoryProps = {
	categoryData: CategoryProp;
	index: number;
};

export enum cartActionEnum {
	ADD_TO_CART,
	INCREMENT,
	DECREMENT,
	REMOVE_FROM_CART,
}

// export type CartAction<T, F = void, P = void> = {
// 	type: T;
// 	field?: F;
// 	payload?: P;
// };


export type CartAction = {

	type: 'INCREMENT' | "DECREMENT" | "ADD_TO_CART"|"REMOVE_FROM_CART",
	payload: CartItemProp | number
}


// export type cartReducerAction =
// 	| CartAction<cartActionEnum.ADD_TO_CART, void, CartItemProp>
// 	| CartAction<cartActionEnum.INCREMENT, void, number>
// 	| CartAction<cartActionEnum.DECREMENT, void, number>
// 	| CartAction<cartActionEnum.REMOVE_FROM_CART, void, number>

export type CartItemProp = {
	id: number;
	title: string;
	price: number;
	quantity: number;
	images: string[];
};

export type singleCartProps = {
	data:CartItemProp
}

export type CartProps = {
	close: () => void;
};

export type ProductContextType = {
	cartItems: CartItemProp[];
	addToCart: (data: CartItemProp) => void;
	incrementCart: (id: number) => void;
	decrementCart: (id: number) => void;
	removeCart: (id: number) => void;
};
