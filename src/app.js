import React from 'react';
import {Text} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import {Table} from './components/Table.js';

export default function App({name = 'Stranger'}) {
	return (
		<>
			<Gradient name="summer">
				<BigText text="crypto cli" align="center" font="chrome" />
			</Gradient>
			<Table />
		</>
	);
}
