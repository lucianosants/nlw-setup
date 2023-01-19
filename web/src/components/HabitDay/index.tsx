import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import ProgressBar from '../ProgressBar';

import styles from './HabitDay.module.css';

interface HabitProps {
	completed: number;
	amount: number;
}

export default function HabitDay({ completed, amount }: HabitProps) {
	const completedPercentage = Math.round((completed / amount) * 100);

	return (
		<Popover.Root>
			<Popover.Trigger
				className={clsx(styles.days, {
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
				})}
			/>

			<Popover.Portal>
				<Popover.Content className={styles.popover__content}>
					<span className={styles.title}>Segunda-feira</span>
					<span className={styles.subtitle}>19/01</span>

					<ProgressBar progress={completedPercentage} />

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
