import styles from './App.module.css';
import './lib/dayjs';

import Header from './components/Header';
import SummaryTable from './components/SummaryTable';

function App() {
	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<Header />
				<SummaryTable />
			</div>
		</div>
	);
}

export default App;
