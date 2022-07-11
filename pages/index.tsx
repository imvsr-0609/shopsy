import axios, { AxiosResponse } from 'axios';
import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import axiosInstance from '../services/axios';
//import { v4 as uuid } from 'uuid';
const uuid = require('uuid').v4;
import SingleCategory from '../components/SingleCategory';
import { CategoriesProp, CategoryProp } from '../types/Types';
import { categoryData } from '../data/CategoryData';
import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { queryClient } from './_app';

const fetchCategories = async () => {
	const res = await axiosInstance.get('/categories');
	return res.data;
};

const Home = () => {
	// const { data } = props;

	const categoryRef = useRef<HTMLDivElement | null>(null);

	const { data, isLoading, isError } = useQuery(
		'getCategories',
		fetchCategories,
	);
	// console.log(data);
	// console.log(isLoading);
	// console.log(isError);

	if (isLoading) return <p>Loading...</p>;

	if (isError) return <p>Some error occured ...</p>;

	return (
		<div className="">
			<Head>
				<title>Shopsy</title>
				<meta name="description" content="One stop solution to your needs" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="w-screen min-h-screen bg-light-gray ">
				<div
					id="header"
					className="w-full h-96 lg:h-screen relative text-white "
				>
					<div className="flex flex-col absolute top-1/2 w-full max-w-3xl left-0 transform -translate-y-1/2 gap-6 sm:gap-8 md:gap-10 z-20 p-4 sm:p-6 md:p-10">
						<h1 className="text-2xl md:text-4xl font-bold">
							Shopping with shopsy feels easy and fun
						</h1>
						<p className="text-xs md:text-sm text-gray-300">
							shopping now is easier, by shopping at an online shop you can buy
							items that you want with simple payments without complicated
						</p>
						<button
							onClick={() =>
								categoryRef && categoryRef.current?.scrollIntoView()
							}
							className="w-40 p-2 px-3  bg-black text-white hover:bg-white transition-all duration-300 ease-in-out border-2 border-white hover:text-black hover:border-black "
						>
							Shop Now
						</button>
					</div>
				</div>
				<div
					ref={categoryRef}
					className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 max-w-7xl m-auto p-4 sm:p-6 md:py-10  gap-4"
				>
					{data.slice(0, 5).map((data: CategoryProp, idx: number) => (
						<SingleCategory categoryData={data} key={uuid()} index={idx} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext,
) => {
	await queryClient.prefetchQuery('getCategories', fetchCategories);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 3600,
	};
};
