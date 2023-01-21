import { Plus, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './Header.module.css';

import logoImage from '../../assets/logo.svg';
import { useState } from 'react';
import NewHabitForm from '../NewHabitForm';

export default function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header className={styles.header}>
			<img src={logoImage} alt='Habits' />

			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger
					type='button'
					className={`${styles.button} focused`}
				>
					<Plus size={20} className={styles.button__icon} />
					Novo hábito
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className={styles.overlay} />
					<Dialog.Content className={styles.content}>
						<Dialog.Close
							className={`${styles.btn__close} focused focus:rounded-md`}
						>
							<X aria-label='Fechar' />
						</Dialog.Close>
						<Dialog.Title className={styles.title}>
							Criar hábito
						</Dialog.Title>

						<NewHabitForm />
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</header>
	);
}
