import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
//import { v4 as uuid } from 'uuid';
const uuid = require('uuid').v4;
import { ProductContext } from '../context/ProductContext';
import { navData } from '../data/NavbarData';
import { LinkObject } from '../types/Types';
import CartComponent from './CartComponent';

const Navbar = () => {
	const [showCartComponent, setShowCartComponent] = useState<boolean>(false);
	const { cartItems } = useContext(ProductContext);
	return (
		<div className="p-3 flex justify-between items-center relative ">
			<Link data-testid="navlogo" href="/">
				<Image
					className="cursor-pointer"
					src={'/assets/shopsy-logo.jpg'}
					height="50%"
					width="200"
					objectFit="contain"
				/>
			</Link>

			<div className="flex gap-6 items-center px-4">
				<ul data-testid="navlinks" className="flex gap-2 sm:gap-4 items-center">
					{navData.map((nav: LinkObject) => (
						<Link key={uuid()} href={nav.href} className=" list-none ">
							<a className="text-none text-xs sm:text-sm md:text-base  ">
								{nav.title}
							</a>
						</Link>
					))}
				</ul>

				<div data-testid="nav-cart-button" className="relative">
					{cartItems.length > 0 && (
						<div className="absolute -top-2 -left-2 text-xs  w-6 h-6 grid place-items-center z-20 rounded-full bg-gray-300 ">
							{cartItems.length}
						</div>
					)}

					<button
						cy-data="show-cart"
						onClick={() => setShowCartComponent(true)}
						className="text-lg bg-black text-white rounded-full w-8 h-8 grid place-items-center relative"
					>
						<IoCartOutline />
					</button>
				</div>

				{showCartComponent && (
					<CartComponent close={() => setShowCartComponent(false)} />
				)}
			</div>
		</div>
	);
};

export default Navbar;
