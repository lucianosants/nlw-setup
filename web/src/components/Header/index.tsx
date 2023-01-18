import { Plus } from 'phosphor-react';

import styles from './Header.module.css';

import logoImage from '../../assets/logo.svg';

export default function Header() {
	return (
		<header className={styles.header}>
			<img src={logoImage} alt='Habits' />

			<button type='button' className={styles.button}>
				<Plus size={20} className={styles.button__icon} />
				Novo hábito
			</button>
		</header>
	);
}
