import Habit from './components/Habit';

function App() {
	return (
		<div className='App'>
			<h2>Habits</h2>
			<div className='flex justify-center gap-2 p-2'>
				<Habit completed={3} />
				<Habit completed={12} />
				<Habit completed={14} />
			</div>
		</div>
	);
}

export default App;
