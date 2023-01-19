import { Check } from 'phosphor-react';
import styles from './NewHabitForm.module.css';

export default function NewHabitForm() {
	return (
		<form className={styles.NewHabitForm__form}>
			<label htmlFor='title' className={styles.NewHabitForm__label}>
				Qual seu comprometimento?
			</label>

			<input
				type='text'
				id='title'
				placeholder='ex.: Exercícios, dormir bem, etc...'
				autoFocus
				className={styles.NewHabitForm__input}
				autoComplete='off'
			/>

			<label htmlFor='' className={`${styles.NewHabitForm__label} mt-4`}>
				Qual a recorrência?
			</label>

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
