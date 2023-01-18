import { generateDatesFromYearsBeginning } from '../../utils/generate-dates-from-years-beginning';
import HabitDay from '../HabitDay';
import styles from './SummaryTable.module.css';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearsBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export default function SummaryTable() {
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
					return <HabitDay key={date.toString()} />;
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
