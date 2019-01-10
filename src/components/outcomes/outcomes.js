import { h } from 'preact';
import style from './style.css';
import ChartistGraph from 'react-chartist';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';


const Outcomes = ({ outcomes, simulate, reset }) => {
	const chartData = {
		labels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		series: [outcomes]
	};

	const options = {
		seriesBarDistance: 5
	};

	return (
		<div>
			<h1>Try it out!</h1>
			<Button className={style.button} onClick={simulate}>Simulate Game</Button>
			<Button className={style.button} onClick={reset}>Reset Game</Button>
			<ChartistGraph
				type={'Bar'}
				data={chartData}
				options={options}
			/>
		</div>
	);
};

export default Outcomes;
