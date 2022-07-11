import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { SingleCategoryProps } from '../types/Types';

const SingleCategory = (props: SingleCategoryProps) => {
	const { id, name, image } = props.categoryData;
	const router = useRouter();

	const handleClick = () => {
		router.push(`/products/${name}/${id}`);
	};

	return (
		<div
			data-cy="single-category"
			onClick={handleClick}
			className={`grid place-items-center relative h-80 cursor-pointer col-span-2 ${
				props.index < 2 ? 'md:col-span-3' : 'col-span-2'
			} rounded-sm overflow-hidden`}
		>
			<Image
				src={image}
				// height="100%"
				// width="100%"
				layout="fill"
				objectFit="cover"
				className="absolute inset-0"
			/>
			<div className=" absolute inset-0  bg-black bg-opacity-50 "></div>
			<div className="grid place-items-center z-20  bg-white bg-opacity-80 p-4 rounded-sm w-40 hover:scale-105 transition-all duration-300 ease-in-out">
				<h3 className="text-xl font-semibold">{name}</h3>
				<p className="text-xs">Shop Now</p>
			</div>
		</div>
	);
};

export default SingleCategory;
