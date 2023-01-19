import { ScrollView, Text, View } from 'react-native';

import HabitDay, { DAY_SIZE } from '../../components/HabitDay';

import { generateRangeDatesFromYearStart } from '../../utils/generate-range-between-dates';
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearsStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill =
	minimumSummaryDatesSizes - datesFromYearsStart.length;

import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

export function Home() {
	const { navigate } = useNavigation();

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
				<View className='flex-row flex-wrap'>
					{datesFromYearsStart.map((date) => (
						<HabitDay
							key={date.toISOString()}
							onPress={() =>
								navigate('habit', { date: date.toISOString() })
							}
						/>
					))}

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
			</ScrollView>
		</View>
	);
}
