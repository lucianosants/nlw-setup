import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';

import { generateRangeDatesFromYearStart } from '../../utils/generate-range-between-dates';
import { api } from '../../lib/axios';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearsStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill =
	minimumSummaryDatesSizes - datesFromYearsStart.length;

import HabitDay, { DAY_SIZE } from '../../components/HabitDay';
import Header from '../../components/Header';
import { Loading } from '../../components/Loading';

type SummaryProps = Array<{
	id: string;
	date: string;
	amount: number;
	completed: number;
}>;

export function Home() {
	const { navigate } = useNavigation();
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState<SummaryProps>([]);

	const fetchData = async () => {
		try {
			setLoading(true);

			const { data } = await api.get('/summary');
			// console.log(data);
			setSummary(data);
		} catch (error) {
			Alert.alert('OPS', 'Não foi possível carregar sumário de hábitos.');
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, [])
	);

	if (loading) return <Loading />;

	return (
		<View className='flex-1 px-8 pt-16 bg-background'>
			<Header />

			<View className='flex-row mt-6 mb-2'>
				{weekDays.map((weekDay, i) => (
					<Text
						className='mx-1 text-xl font-bold text-center text-zinc-400'
						style={{ width: DAY_SIZE, height: DAY_SIZE }}
						key={`${weekDay} - ${i}`}
					>
						{weekDay}
					</Text>
				))}
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				{summary ? (
					<View className='flex-row flex-wrap'>
						{datesFromYearsStart.map((date) => {
							const dayWithHabit = summary.find((day) => {
								return dayjs(date).isSame(day.date, 'day');
							});

							return (
								<HabitDay
									amountOfHabits={dayWithHabit?.amount}
									amountCompleted={dayWithHabit?.completed}
									date={date}
									key={date.toISOString()}
									onPress={() =>
										navigate('habit', {
											date: date.toISOString(),
										})
									}
								/>
							);
						})}

						{amountOfDaysToFill > 0 &&
							Array.from({ length: amountOfDaysToFill }).map(
								(_, i) => (
									<View
										className='m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800 opacity-40'
										style={{
											width: DAY_SIZE,
											height: DAY_SIZE,
										}}
										key={i}
									/>
								)
							)}
					</View>
				) : null}
			</ScrollView>
		</View>
	);
}
