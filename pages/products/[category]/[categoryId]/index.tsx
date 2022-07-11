import { v4 as uuid } from 'uuid';
import {
	GetStaticPaths,
	GetStaticPathsContext,
	GetStaticProps,
	GetStaticPropsContext,
} from 'next';
import React, { useEffect, useState } from 'react';

import {
	CategoryProp,
	ProductProp,
	ProductsProp,
} from '../../../../types/Types';
import axiosInstance from '../../../../services/axios';
import axios from 'axios';
import SingleProduct from '../../../../components/SingleProduct';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import { queryClient } from '../../../_app';
import Pagination from '@mui/material/Pagination';

const fetchCategoryProduct = async (id: string | string[] | undefined) => {
	const res = await axiosInstance.get(`/categories/${id}/products`);
	return res.data;
};

const CategoryPage = () => {
	// const { data } = props;
	const router = useRouter();
	const { category, categoryId } = router.query;

	const { data, isLoading, isError } = useQuery('fetchCategoryProduct', () =>
		fetchCategoryProduct(categoryId),
	);
	const [pageNumber, setPageNumber] = useState<number>(0);
	// const [productData, setProductData] = useState(data);
	const fetchPaginatedProduct = async (id: string | string[] | undefined) => {
		const { data } = await axiosInstance.get(
			`/categories/${id}/products?offset=${pageNumber * 15}&limit=${15}`,
		);
		return data;
	};

	const {
		data: paginatedData,
		isLoading: isPaginationLoading,
		isError: isPaginationError,
		refetch,
	} = useQuery('fetchPaginatedProp', () => fetchPaginatedProduct(categoryId));

	useEffect(() => {
		if (paginatedData) {
			refetch();

			// setProductData(paginatedData);
		}
	}, [pageNumber]);

	if (isLoading || isPaginationLoading) return <p>Loading...</p>;

	if (isError || isPaginationError) return <p>Some error occured ...</p>;

	return (
		<div className="min-h-screen w-full  bg-light-gray ">
			<div className="p-4 sm:p-6 md:p-10">
				<h1 className="text-center text-2xl md:text-4xl font-semibold">
					Products from {category !== 'Others' && category}{' '}
					{category === 'Others' ? 'Other categories' : 'category'}
				</h1>
			</div>
			<div className="p-4 sm:p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl m-auto">
				{(paginatedData ? paginatedData : data)
					.slice(0, 15)
					.map((data: ProductProp) => (
						<SingleProduct key={uuid()} singleProductData={data} />
					))}
			</div>
			<div className="grid place-items-center p-6">
				<Pagination
					onChange={(event, value) => setPageNumber(value)}
					page={pageNumber}
					count={Math.floor(data.length / 15)}
				/>
			</div>
		</div>
	);
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async (
	context: GetStaticPathsContext,
) => {
	const { data } = await axiosInstance.get('/categories');

	const paths = data.map((data: CategoryProp, idx: number) => ({
		params: { category: data.name, categoryId: data.id.toString() },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({
	params,
}: GetStaticPropsContext) => {
	const categoryId = params?.categoryId?.toString();
	await queryClient.prefetchQuery(['fetchCategoryProduct', categoryId], () =>
		fetchCategoryProduct(categoryId),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 3600,
	};
};
