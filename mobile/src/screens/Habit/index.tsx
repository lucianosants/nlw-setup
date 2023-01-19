import { ScrollView, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { ProgressBar } from '../../components/ProgressBar';
import { Checkbox } from '../../components/Checkbox';

interface Params {
	date: string;
}

export function Habit() {
	const route = useRoute();
	const { date } = route.params as Params;

	const parsedDate = dayjs(date);
	const dayOfWeek = parsedDate.format('dddd');
	const dayAndMonth = parsedDate.format('DD/MM');

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

				<ProgressBar progress={50} />

				<View className='mt-6'>
					<Checkbox title='Beber 2L de água' checked={false} />
					<Checkbox title='Caminhara' checked={true} />
				</View>
			</ScrollView>
		</View>
	);
}
