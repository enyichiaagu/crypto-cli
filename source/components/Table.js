// Table.js

import React from 'react';

// Destructuring useState and useEffect from React
import {useState, useEffect} from 'react';

// Destructuring the components we need from ink
import {Box, Text, Newline} from 'ink';

// Fetching mock data
//import cryptoData from '../data.json' with {type: 'json'};

import axios from 'axios';

const API_KEY = 'UPDATE WITH YOUR API KEY HERE';

const BASE_URL =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,litecoin,matic-network,ethereum,tether,binancecoin,solana,aave,cardano,tron&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const url = BASE_URL + `&x_cg_demo_api_key=${API_KEY}`;

const Table = () => {
	const [data, setData] = useState([]);

	// useEffect(() => {
	// 	setData(cryptoData);
	// });

	useEffect(() => {
		axios
			.get(url)
			.then(response => setData(response.data))
			.catch(e => console.log('El Error: ' + e));
	}, []);

	// Fetching data and catching possible errors

	return (
		<>
			<Box borderStyle="single" padding={2}>
				{data.length === 0 ? (
					<Box>
						<Text>Loading ...</Text>
					</Box>
				) : (
					<Box flexDirection="column">
						<Box>
							<Box width="25%">
								<Text>COIN</Text>
							</Box>
							<Box width="25%">
								<Text>CURRENT PRICE (USD)</Text>
							</Box>
							<Box width="25%">
								<Text>24 HOUR CHANGE</Text>
							</Box>
							<Box width="25%">
								<Text>ALL TIME HIGH</Text>
							</Box>
						</Box>
						<Newline />
						{data.map(
							({id, name, current_price, price_change_percentage_24h, ath}) => (
								<Box key={id}>
									<Box width="25%">
										<Text>{name}</Text>
									</Box>
									<Box width="25%">
										<Text color="cyan">
											{'$' + (current_price ?? 0).toLocaleString()}
										</Text>
									</Box>
									<Box width="25%">
										<Text
											backgroundColor={
												Math.sign(price_change_percentage_24h ?? 0) < 0
													? 'red'
													: 'green'
											}
										>
											{(price_change_percentage_24h ?? 0).toFixed(2) + '%'}
										</Text>
									</Box>
									<Box width="25%">
										<Text color="green">
											{'$' + (ath ?? 0).toLocaleString()}
										</Text>
									</Box>
								</Box>
							),
						)}
					</Box>
				)}
			</Box>
		</>
	);
};

export {Table};
