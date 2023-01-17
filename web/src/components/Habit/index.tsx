interface HabitProps {
	completed: number;
}

export default function Habit({ completed }: HabitProps) {
	return <div className='text-red-300 bg-zinc-700 w-7'>{completed}</div>;
}
