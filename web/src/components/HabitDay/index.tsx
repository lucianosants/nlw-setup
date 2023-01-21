import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import ProgressBar from '../ProgressBar';

import styles from './HabitDay.module.css';
import dayjs from 'dayjs';
import HabitsList from '../HabistList';
import { useState } from 'react';

interface HabitProps {
	date: Date;
	defaultCompleted?: number;
	amount?: number;
}

export default function HabitDay({
	date,
	defaultCompleted = 0,
	amount = 0,
}: HabitProps) {
	const [completed, setCompleted] = useState(defaultCompleted);

	const completedPercentage =
		amount > 0 ? Math.round((completed / amount) * 100) : 0;

	const dayAndMonth = dayjs(date).format('DD/MM');
	const dayOfWeek = dayjs(date).format('dddd');

	const today = dayjs().startOf('day').toDate();
	const isCurrentDay = dayjs(date).isSame(today, 'day');

	const handleCompletedChange = (completed: number) => {
		setCompleted(completed);
	};

	return (
		<Popover.Root>
			<Popover.Trigger
				className={clsx(`${styles.days} focused`, {
					'bg-zinc-900 border-zinc-800': completedPercentage === 0,
					'bg-violet-900 border-violet-700':
						completedPercentage > 0 && completedPercentage < 20,
					'bg-violet-800 border-violet-600':
						completedPercentage >= 20 && completedPercentage < 40,
					'bg-violet-700 border-violet-500':
						completedPercentage >= 40 && completedPercentage < 60,
					'bg-violet-600 border-violet-500':
						completedPercentage >= 60 && completedPercentage < 80,
					'bg-violet-500 border-violet-400':
						completedPercentage >= 80,
					'border-4 border-white': isCurrentDay,
				})}
			/>

			<Popover.Portal>
				<Popover.Content className={styles.popover__content}>
					<span className={styles.title}>{dayOfWeek}</span>
					<span className={styles.subtitle}>{dayAndMonth}</span>

					<ProgressBar progress={completedPercentage} />

					<HabitsList
						date={date}
						onCompletedChange={handleCompletedChange}
					/>

					<Popover.Arrow
						height={8}
						width={16}
						className={styles.popover__arrow}
					/>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
