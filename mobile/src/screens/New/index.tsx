import { useState } from 'react';
import {
	Alert,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Checkbox } from '../../components/Checkbox';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from '../../lib/axios';

const availableWeekDays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
];

export function New() {
	const [weekDays, setWeekDays] = useState<number[]>([]);
	const [title, setTitle] = useState('');

	const handleToggleWeekDay = (weekDayIndex: number) => {
		if (weekDays.includes(weekDayIndex)) {
			setWeekDays((prevState) =>
				prevState.filter((weekDay) => weekDay !== weekDayIndex)
			);
		} else {
			setWeekDays((prevState) => [...prevState, weekDayIndex]);
		}
	};

	const handleCreateNewHabit = async () => {
		try {
			if (!title.trim() || weekDays.length === 0) {
				return Alert.alert(
					'Novo Hábito',
					'Informe o nome do hábito e escolha a periodicidade.'
				);
			}

			await api.post('/habits', {
				title,
				WeekDays: weekDays,
			});

			setTitle('');
			setWeekDays([]);

			Alert.alert('Novo Hábito', 'Hábito criado com sucesso!');
		} catch (error) {
			console.log(error);
			Alert.alert('OPS', 'Não foi possível criar o novo hábito!');
		}
	};

	return (
		<View className='flex-1 px-8 pt-16 bg-background'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				<BackButton />

				<Text className='mt-6 text-3xl font-extrabold text-white'>
					Criar hábito
				</Text>

				<Text className='mt-6 text-base font-semibold text-white'>
					Qual seu comprometimento?
				</Text>

				<TextInput
					placeholder='Exercícios, dormir bem, etc...'
					placeholderTextColor={colors.zinc[400]}
					className='h-12 pl-4 mt-3 text-white border-2 rounded-lg border-zinc-800 bg-zinc-900 focus:border-green-600'
					onChangeText={setTitle}
					value={title}
				/>

				<Text className='mt-4 mb-3 text-base font-semibold text-white'>
					Qual a recorrência?
				</Text>

				{availableWeekDays.map((weekDay, index) => (
					<Checkbox
						title={weekDay}
						key={weekDay}
						checked={weekDays.includes(index)}
						onPress={() => handleToggleWeekDay(index)}
					/>
				))}

				<TouchableOpacity
					activeOpacity={0.7}
					className='flex-row items-center justify-center w-full mt-6 bg-green-600 rounded-md h-14'
					onPress={handleCreateNewHabit}
				>
					<Feather name='check' size={20} color={colors.white} />
					<Text className='ml-2 text-base font-semibold text-white'>
						Confirmar
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}
