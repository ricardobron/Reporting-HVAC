import { Text, VStack } from 'native-base';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
interface IProps {
  name: string;
  icon: 'ballot' | 'clock' | 'factory';
  value: string;
}

export const CardInfo = ({ icon, name, value }: IProps) => {
  return (
    <VStack
      width={'109px'}
      height={'92px'}
      justifyContent={'center'}
      alignItems={'center'}
      bg="secondary.700"
      p={1}
    >
      {icon === 'ballot' && (
        <MaterialCommunityIcons name="ballot-outline" size={24} />
      )}

      {icon === 'factory' && (
        <MaterialCommunityIcons name="factory" size={24} />
      )}

      {icon === 'clock' && <AntDesign name="clockcircleo" size={24} />}

      <Text color="gray.500" fontSize={'sm'}>
        {name}
      </Text>
      <Text color="red.500" fontWeight={'bold'} fontSize={'sm'} mt="1">
        {value}
      </Text>
    </VStack>
  );
};
