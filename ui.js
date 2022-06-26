const React = require('react');
const Gradient = require('ink-gradient');
const BigText = require('ink-big-text');
const importJsx = require('import-jsx');
const Table = importJsx('./components/Table')

const App = () => (
	<>
		<Gradient name="summer">
			<BigText 
				text="crypto cli" 
				align='center' 
				font='chrome'
			/>
		</Gradient>
		<Table/>
	</>
);

module.exports = App;
