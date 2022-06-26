const React = require('react');

const { useState, useEffect } = React;
// Destructuring useState and useEffect from React

const { Box, Text, Newline } = require('ink');
// Destructuring the components we need from ink

const axios = require('axios');

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Clitecoin%2Cmatic-network%2Cethereum%2Ctether%2Cbinancecoin%2Csolana%2Caave%2Ccardano%2Ctron&order=market_cap_desc&per_page=100&page=1&sparkline=false'

const Table = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get(url)
        .then(response => setData(response.data))
        .catch(e => console.log(e));
    },[]);

    return (
        <Box borderStyle='single' padding={2}>
            {
                data.length === 0 ?
                <Box>
                    <Text>Loading ...</Text>
                </Box> :
                <Box flexDirection='column'>
                    <Box>
                        <Box width='25%'><Text>COIN</Text></Box>
                        <Box width='25%'><Text>CURRENT PRICE (USD)</Text></Box>
                        <Box width='25%'><Text>24 HOUR CHANGE</Text></Box>
                        <Box width='25%'><Text>ALL TIME HIGH</Text></Box>
                    </Box>
                    <Newline/>
                    {
                        data.map(({id, name, current_price, price_change_percentage_24h, ath}) => (
                            <Box key={id}>
                                <Box width='25%'>
                                    <Text>{name}</Text>
                                </Box>
                                <Box width='25%'>
                                    <Text color='cyan'>{'$' + current_price.toLocaleString()}</Text>
                                </Box>
                                <Box width='25%'>
                                    <Text backgroundColor={Math.sign(price_change_percentage_24h) < 0 ? 'red' : 'green'}>
                                        {price_change_percentage_24h.toFixed(2) + '%'}
                                    </Text>
                                </Box>
                                <Box width='25%'>
                                    <Text color='green'>{'$' + ath.toLocaleString()}</Text>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            }
        </Box>
    )
}

module.exports = Table;
