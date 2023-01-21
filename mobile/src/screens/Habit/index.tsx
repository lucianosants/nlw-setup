import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { ProgressBar } from '../../components/ProgressBar';
import { Checkbox } from '../../components/Checkbox';
import { Loading } from '../../components/Loading';
import { api } from '../../lib/axios';
import { generateProgressPercentage } from '../../utils/generate-progress-percentage';
import { HabitsEmpty } from '../../components/HabitsEmpty';
import clsx from 'clsx';

interface Params {
	date: string;
}

interface DayInfoProps {
	completedHabits: string[];
	possibleHabits: Array<{
		id: string;
		title: string;
	}>;
}

export function Habit() {
	const [loading, setLoading] = useState(true);
	const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
	const [completedHabits, setCompletedHabits] = useState<string[]>([]);

	const route = useRoute();
	const { date } = route.params as Params;

	const parsedDate = dayjs(date);
	const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
	const dayOfWeek = parsedDate.format('dddd');
	const dayAndMonth = parsedDate.format('DD/MM');

	const fetchHabits = async () => {
		try {
			setLoading(true);

			const { data } = await api.get('/day', { params: { date } });

			setDayInfo(data);
			setCompletedHabits(data.completedHabits);
		} catch (error) {
			console.log(error);
			Alert.alert(
				'Ops',
				'Não foi possível carregar informações dos hábitos'
			);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleHabit = async (habitId: string) => {
		try {
			await api.patch(`/habits/${habitId}/toggle`);

			if (completedHabits.includes(habitId)) {
				setCompletedHabits((prevState) =>
					prevState.filter((habit) => habit !== habitId)
				);
			} else {
				setCompletedHabits((prevState) => [...prevState, habitId]);
			}
		} catch (error) {
			console.log(error);
			Alert.alert(
				'Ops',
				'Não foi possível carregar as informações dos hábitos'
			);
		}
	};

	const habitsProgress = dayInfo?.possibleHabits.length
		? generateProgressPercentage(
				dayInfo.possibleHabits.length,
				completedHabits.length
		  )
		: 0;

	useEffect(() => {
		fetchHabits();
	}, []);

	if (loading) return <Loading />;

	return (
		<View className='flex-1 px-8 pt-16 bg-background'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				<BackButton />

				<Text className='mt-6 text-base font-semibold lowercase text-zinc-400'>
					{dayOfWeek}
				</Text>

				<Text className='text-3xl font-extrabold text-white'>
					{dayAndMonth}
				</Text>

				<ProgressBar progress={habitsProgress} />

				<View
					className={clsx('mt-6', {
						['opacity-50']: isDateInPast,
					})}
				>
					{dayInfo?.possibleHabits.length ? (
						dayInfo?.possibleHabits.map((habit) => (
							<Checkbox
								key={habit.id}
								title={habit.title}
								checked={completedHabits.includes(habit.id)}
								disabled={isDateInPast}
								onPress={() => handleToggleHabit(habit.id)}
							/>
						))
					) : (
						<HabitsEmpty />
					)}
				</View>

				{isDateInPast && (
					<Text className='mt-10 text-center text-white'>
						Você não pode editar hábitos de uma data passada.
					</Text>
				)}
			</ScrollView>
		</View>
	);
}
