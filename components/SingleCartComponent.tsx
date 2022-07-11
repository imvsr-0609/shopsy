import React, { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { ProductContext } from '../context/ProductContext';
import { singleCartProps } from '../types/Types';

const SingleCartComponent = (props: singleCartProps) => {
	const { data } = props;
	const { id, title, price, quantity, images } = data;
	const { incrementCart, decrementCart, removeCart } =
		useContext(ProductContext);
	return (
		<div className="flex justify-between gap-2 items-center text-xs flex-1 py-2">
			<div className="flex gap-2 items-center flex-1">
				<img
					className="w-6 h-6 object-contain rounded-full"
					src={images[0]}
					alt=""
				/>
				<h4 className="font-semibold">{title}</h4>
			</div>

			<div className="flex border border-gray-200 rounded-sm">
				<button
					cy-data="increment-cart"
					onClick={() => incrementCart(id)}
					className="p-2 px-3 bg-gray-200 font-semibold"
				>
					+
				</button>
				<p className="p-2 px-3 ">{quantity}</p>
				<button
					cy-data="decrement-cart"
					disabled={quantity <= 1}
					onClick={() => decrementCart(id)}
					className="p-2 px-3 bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 font-semibold  "
				>
					-
				</button>
			</div>

			<div className="flex gap-2 items-center">
				<p className="font-semibold">₹ {(price * quantity).toFixed(2)}</p>
				<button
					cy-data="remove-cart"
					onClick={() => removeCart(id)}
					className="p-2 bg-gray-200"
				>
					<AiOutlineDelete />
				</button>
			</div>
		</div>
	);
};

export default SingleCartComponent;
