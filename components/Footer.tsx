import Link from 'next/link';
import React from 'react';
//import { v4 as uuid } from 'uuid';
const uuid = require('uuid').v4;
import Image from 'next/image';
import { FooterType, LinkObject } from '../types/Types';
import { navData } from '../data/NavbarData';
import { footerData } from '../data/FooterData';

const Footer = () => {
	return (
		<div className="text-white p-4 sm:p-6 md:p-10 bg-black">
			<div className=" py-10 flex flex-col gap-6 items-center">
				<ul data-testid="footer-links" className="flex gap-4 items-center">
					{navData.map((nav: LinkObject) => (
						<Link key={uuid()} href={nav.href} className=" list-none ">
							<a className="text-none  ">{nav.title}</a>
						</Link>
					))}
				</ul>

				<Link data-testid="footer-logo" href="/">
					<Image
						src={'/assets/shopsy-logo.jpg'}
						height="50%"
						width="200"
						className="object-contain invert cursor-pointer "
					/>
				</Link>

				<form
					data-testid="footer-form"
					className="flex border border-gray-400  justify-between items-center text-sm outline-none max-w-xs "
				>
					<input
						className="flex-1 p-2 px-3"
						type="email"
						name="email"
						placeholder="Enter Your Email Address"
					/>
					<button className="w-40 p-2 px-3  bg-black text-white hover:bg-white transition-all duration-300 ease-in-out hover:text-black ">
						Subscribe
					</button>
				</form>

				<div data-testid="footer-icons" className="flex gap-4">
					{footerData.map((footer: FooterType) => (
						<Link
							key={uuid()}
							href={footer.href}
							className=" list-none  text-xs sm:text-sm md:text-base "
						>
							{footer.icon}
						</Link>
					))}
				</div>
			</div>
			<div className="py-10 border-t w-full text-center border-gray-500 border-opacity-60">
				<p className="text-sm">© 2022 shopsy | all rights reserved</p>
			</div>
		</div>
	);
};

export default Footer;
