import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { generateDatesFromYearsBeginning } from '../../utils/generate-dates-from-years-beginning';
import HabitDay from '../HabitDay';
import styles from './SummaryTable.module.css';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearsBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
	id: string;
	date: string;
	amount: number;
	completed: number;
}[];

export default function SummaryTable() {
	const [summary, setSummary] = useState<Summary>([]);

	useEffect(() => {
		api.get('summary').then((response) => {
			setSummary(response.data);
		});
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.content__week}>
				{weekDays.map((weekDay, i) => (
					<div key={`${weekDay} - ${i}`} className={styles.week__day}>
						{weekDay}
					</div>
				))}
			</div>

			<div className={styles.content__days}>
				{summaryDates.map((date, i) => {
					const dayInSummary = summary.find((day) => {
						return dayjs(date).isSame(day.date, 'day');
					});

					return (
						<HabitDay
							key={date.toString()}
							date={date}
							amount={dayInSummary?.amount}
							completed={dayInSummary?.completed}
						/>
					);
				})}

				{amountOfDaysToFill > 0 &&
					Array.from({ length: amountOfDaysToFill }).map((_, i) => {
						return (
							<div key={i} className={styles.placeholder__box} />
						);
					})}
			</div>
		</div>
	);
}
