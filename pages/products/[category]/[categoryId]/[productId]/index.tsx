import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { ProductContext } from '../../../../../context/ProductContext';
import axiosInstance from '../../../../../services/axios';
import { SingleProductProp } from '../../../../../types/Types';
import { queryClient } from '../../../../_app';

const fetchSingleProduct = async (id: string | string[] | undefined) => {
	const res = await axiosInstance.get(`/products/${id}`);
	return res.data;
};

const SingleProductPage = (props: SingleProductProp) => {
	const router = useRouter();
	console.log(router);
	const { categoryId, category, productId } = router.query;

	const {
		data: singleProductData,
		isLoading,
		isError,
	} = useQuery('fetchSingleProduct', () => fetchSingleProduct(productId));
	// const { singleProductData } = props;
	const { addToCart } = useContext(ProductContext);
	const {
		id,
		title,
		price,
		description,
		category: productCategory,
		images,
	} = singleProductData || {};

	useEffect(() => {
		if (typeof singleProductData === 'string') {
			router.push(`/${category}/${categoryId}`);
		}
	}, [singleProductData]);

	if (isLoading) return <p>Loading...</p>;

	if (isError) return <p>Some error occured ...</p>;

	return (
		<div className="h-screen w-full bg-light-gray">
			<div className="max-w-6xl m-auto p-4 sm:p-6 md:p-10 flex flex-col md:flex-row justify-center items-start w-full h-4/5 gap-4 ">
				<div className="flex flex-1  md:flex-col h-full w-full justify-between gap-4 ">
					<div className="w-full h-full md:flex-1  relative">
						<Image
							src={images[0] ? images[0] : ''}
							objectFit="contain"
							layout="fill"
						/>
					</div>

					{images.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full  ">
							{images.map((image: string, idx: number) => (
								<div key={idx} className="  md:h-40  relative">
									<Image
										src={image ? image : ''}
										layout="fill"
										objectFit="contain"
									/>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-col gap-3 flex-1 h-full bg-white p-6 md:p-10">
					<h2 className="text-lg md:text-xl font-semibold">{title}</h2>
					<p className="text-gray-500">{productCategory.name}</p>
					<p className="text-gray-500">{description}</p>
					<h3 className="text-2xl font-semibold">
						{' '}
						₹ {price.toFixed(2)}{' '}
						<span className=" line-through text-gray-400 text-lg ">
							{(price - 0.2 * price).toFixed(2)}
						</span>
					</h3>
					<div className="flex items-center my-10">
						<button
							data-cy="single-product-add-to-cart-button"
							onClick={() =>
								addToCart({
									id,
									title,
									price,
									quantity: 1,
									images,
								})
							}
							className=" w-40 sm:w-60 p-2 px-3  bg-black text-white hover:bg-white transition-all duration-300 ease-in-out border-2 border-white hover:text-black hover:border-black"
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleProductPage;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: GetServerSidePropsContext) => {
	// console.log(query);
	const productId = query?.productId?.toString();
	await queryClient.prefetchQuery(['fetchSingleProduct', productId], () =>
		fetchSingleProduct(productId),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
