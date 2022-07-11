import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ProductContextProvider } from '../context/ProductContext';
import { FC, Fragment } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';

export const queryClient = new QueryClient();

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ProductContextProvider>
					<Fragment>
						<Navbar />
						<Component {...pageProps} />
						<Footer />
						<ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
					</Fragment>
				</ProductContextProvider>
			</Hydrate>
		</QueryClientProvider>
	);
};

export default MyApp;
