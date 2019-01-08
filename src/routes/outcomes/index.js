import { h } from 'preact';
import './style.css';
import ChartistGraph from 'react-chartist';
import Button from 'preact-material-components/Button';

const Outcomes = ({ outcomes, simulate }) => {
    const chartData = {
        labels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [outcomes]
    };

    const options = {
        seriesBarDistance: 5
    };

    return (
    <div>
        <h1>Rolls!</h1>
        <Button onClick={simulate}>Simulate Game</Button>
        <ChartistGraph
            type={'Bar'}
            data={chartData}
            options={options}
        />
    </div>
    )
};

export default Outcomes;
