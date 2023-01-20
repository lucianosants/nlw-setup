import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import ProgressBar from '../ProgressBar';

import styles from './HabitDay.module.css';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface HabitProps {
	date: Date;
	completed?: number;
	amount?: number;
}

export default function HabitDay({
	date,
	completed = 0,
	amount = 0,
}: HabitProps) {
	const completedPercentage =
		amount > 0 ? Math.round((completed / amount) * 100) : 0;

	const dayAndMonth = dayjs(date).format('DD/MM');
	const dayOfWeek = dayjs(date).format('dddd');

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
					<span className={styles.title}>{dayOfWeek}</span>
					<span className={styles.subtitle}>{dayAndMonth}</span>

					<ProgressBar progress={completedPercentage} />

					<div className='checkbox__wrapper'>
						<Checkbox.Root className='checkbox__root gap-3 group'>
							<div className='checkbox__indicator group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
								<Checkbox.CheckboxIndicator>
									<Check
										size={20}
										className='checkbox__icon'
										weight='bold'
									/>
								</Checkbox.CheckboxIndicator>
							</div>
							<span className='checkbox__label--habit group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
								Beber 2L de água
							</span>
						</Checkbox.Root>
					</div>

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
