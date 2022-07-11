import React, { Fragment, useContext } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { ProductContext } from '../context/ProductContext';
import { v4 as uuid } from 'uuid';
import { CartItemProp, CartProps } from '../types/Types';
import SingleCartComponent from './SingleCartComponent';
import Link from 'next/link';

const CartComponent = ({ close }: CartProps) => {
	const { cartItems } = useContext(ProductContext);
	const getSubTotal = (arr: CartItemProp[]) => {
		let sum = 0;
		arr.forEach((arr: CartItemProp) => (sum += arr.price * arr.quantity));

		return sum;
	};

	return (
		<div className="absolute z-30 right-0 top-full  max-h-screen bg-white w-full max-w-sm shadow-md ">
			<div className="flex justify-end items-center px-4">
				<button
					className=" p-2 grid place-items-center"
					onClick={() => close()}
				>
					<IoCloseOutline />
				</button>
			</div>
			{cartItems.length > 0 ? (
				<Fragment>
					<div className="grid place-items-center mb-4">
						<Link href="#">
							<a className="text-center text-xs underline underline-offset-4 w-full  ">
								Items in your Cart
							</a>
						</Link>
					</div>

					<div className="flex flex-col p-2 px-4">
						{cartItems.map((item: CartItemProp) => (
							<SingleCartComponent key={uuid()} data={item} />
						))}
					</div>
					<p className="text-right text-xs px-3 mb-3 ">
						subtotal :{' '}
						<span className="font-semibold text-base">
							{' '}
							₹ {getSubTotal(cartItems).toFixed(2)}
						</span>{' '}
					</p>
					<div className=" self-end p-2 right-0 ">
						<button className=" w-full  p-2 px-3  bg-black text-white hover:bg-white transition-all duration-300 ease-in-out border-2 border-transparent hover:text-black hover:border-black">
							Checkout
						</button>
					</div>
				</Fragment>
			) : (
				<p className="py-20 pt-10 px-6 text-center text-xl font-semibold">
					Cart is Empty
				</p>
			)}
		</div>
	);
};

export default CartComponent;
