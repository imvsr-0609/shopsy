import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { ProductContext } from '../context/ProductContext';
import { SingleProductProp } from '../types/Types';

const SingleProduct = (props: SingleProductProp) => {
	const { singleProductData } = props;
	const { title, price, description, images, category, id } = singleProductData;
	const router = useRouter();
	const { query } = router;
	const { addToCart } = useContext(ProductContext);
	const clickRef = useRef<HTMLButtonElement | null>(null);

	return (
		<div className="flex flex-col bg-white rounded-sm shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
			<div
				data-cy="single-product"
				onClick={() =>
					router.push(`/products/${query.category}/${query.categoryId}/${id}`)
				}
				className="flex flex-col "
			>
				<Image
					src={images[0] ? images[0] : category.image}
					alt={title}
					height="320"
					width="100%"
					objectFit="cover"
				/>

				<div className="flex flex-col gap-3 p-4">
					<h4 className="font-semibold">{title}</h4>
					<p className="truncate text-xs text-gray-500">{description}</p>
					<h3>
						{' '}
						₹ {price.toFixed(2)}{' '}
						<span className=" line-through text-gray-400 text-xs ">
							{(price - 0.2 * price).toFixed(2)}
						</span>
					</h3>
				</div>
			</div>
			<div className="p-4 w-full">
				<button
					data-cy="single-product-button"
					ref={clickRef}
					onClick={() =>
						addToCart({
							id,
							title,
							price,
							quantity: 1,
							images,
						})
					}
					className=" w-full p-2 px-3  bg-black text-white hover:bg-white transition-all duration-300 ease-in-out border-2 border-white hover:text-black hover:border-black"
				>
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default SingleProduct;
