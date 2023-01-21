import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

interface HabitsListProps {
	date: Date;
	onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
	possibleHabits: Array<{
		id: string;
		title: string;
		created_at: string;
	}>;
	completedHabits: string[];
}

export default function HabitsList({
	date,
	onCompletedChange,
}: HabitsListProps) {
	const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

	useEffect(() => {
		api.get('/day', {
			params: {
				date: date.toISOString(),
			},
		}).then((response) => {
			setHabitsInfo(response.data);
		});
	}, []);

	const handleToggleHabit = async (habitId: string) => {
		await api.patch(`/habits/${habitId}/toggle`);

		const isHabitAlreadyCompleted =
			habitsInfo?.completedHabits.includes(habitId);

		let completedHabits: string[] = [];

		if (isHabitAlreadyCompleted) {
			completedHabits = habitsInfo!.completedHabits.filter(
				(id) => id !== habitId
			);
		} else {
			completedHabits = [...habitsInfo!.completedHabits, habitId];
		}

		setHabitsInfo({
			possibleHabits: habitsInfo!.possibleHabits,
			completedHabits,
		});

		onCompletedChange(completedHabits.length);
	};

	const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

	return (
		<div className='checkbox__wrapper'>
			{habitsInfo?.possibleHabits.map((habit) => {
				return (
					<Checkbox.Root
						key={habit.id}
						onCheckedChange={() => handleToggleHabit(habit.id)}
						checked={habitsInfo.completedHabits.includes(habit.id)}
						disabled={isDateInPast}
						className='checkbox__root gap-3 group focus:outline-none disabled:cursor-not-allowed'
					>
						<div className='checkbox__indicator group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
							<Checkbox.CheckboxIndicator>
								<Check
									size={20}
									className='checkbox__icon'
									weight='bold'
								/>
							</Checkbox.CheckboxIndicator>
						</div>
						<span className='checkbox__label--habit group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
							{habit.title}
						</span>
					</Checkbox.Root>
				);
			})}
		</div>
	);
}
