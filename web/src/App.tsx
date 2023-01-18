import styles from './App.module.css';

// import Habit from './components/Habit';
import Header from './components/Header';

function App() {
	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<Header />
			</div>
		</div>
	);
}

export default App;
