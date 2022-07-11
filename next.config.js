/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
	images: {
		domains: [
			'api.lorem.space',
			'placeimg.com',
			'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
			'www.romapy.com',
			'www.google.com',
			'www.adidas.co',
			'cdn.lorem.space',
		],
	},
	// experimental: {
	// 	images: {
	// 		remotePatterns: [
	// 			{
	// 				protocol: 'https',
	// 				hostname: '**',
	// 			},
	// 		],
	// 	},
	// },
};
