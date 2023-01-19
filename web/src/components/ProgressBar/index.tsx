import styles from './ProgressBar.module.css';

interface ProgressBarProps {
	progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
	return (
		<div className={styles.progressbar}>
			<div
				role='progressbar'
				aria-label='Progresso de hábitos completos nesse dia'
				aria-valuenow={progress}
				className={styles.progressbar__level}
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
