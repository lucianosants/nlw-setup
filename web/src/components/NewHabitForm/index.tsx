import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../../lib/axios';
import styles from './NewHabitForm.module.css';

const availableWeekDays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
];

export default function NewHabitForm() {
	const [title, setTitle] = useState('');
	const [WeekDays, setWeekDays] = useState<number[]>([]);

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		if (!title || WeekDays.length === 0) {
			return;
		}
		await api.post('habits', {
			title,
			WeekDays,
		});

		setTitle('');
		setWeekDays([]);

		alert('Hábito criado com sucesso!');
	}

	// console.log(weekDays);

	function handleToggleWeekDay(WeekDay: number) {
		if (WeekDays.includes(WeekDay)) {
			const weekDaysWithRemoved = WeekDays.filter(
				(day) => day !== WeekDay
			);
			setWeekDays(weekDaysWithRemoved);
		} else {
			const weekDaysWithAdded = [...WeekDays, WeekDay];
			setWeekDays(weekDaysWithAdded);
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.NewHabitForm__form}>
			<label htmlFor='title' className={styles.NewHabitForm__label}>
				Qual seu comprometimento?
			</label>

			<input
				type='text'
				id='title'
				placeholder='ex.: Exercícios, dormir bem, etc...'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				autoFocus
				className={styles.NewHabitForm__input}
				autoComplete='off'
			/>

			<label htmlFor='' className={`${styles.NewHabitForm__label} mt-4`}>
				Qual a recorrência?
			</label>

			{availableWeekDays.map((weekDay, index) => (
				<div key={weekDay} className='checkbox__wrapper'>
					<Checkbox.Root
						className='checkbox__root group'
						checked={WeekDays.includes(index)}
						onCheckedChange={() => handleToggleWeekDay(index)}
					>
						<div className='checkbox__indicator group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
							<Checkbox.CheckboxIndicator>
								<Check
									size={20}
									className='checkbox__icon'
									weight='bold'
								/>
							</Checkbox.CheckboxIndicator>
						</div>
						<span className='checkbox__label--form'>{weekDay}</span>
					</Checkbox.Root>
				</div>
			))}

			<button
				type='submit'
				className={`${styles.NewHabitForm__btn} bg-green-600`}
			>
				<Check size={20} weight='bold' />
				Confirmar
			</button>
		</form>
	);
}
