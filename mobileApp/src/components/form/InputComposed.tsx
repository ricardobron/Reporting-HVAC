import { TextInputProps } from 'react-native';
import { Switch, Text, VStack } from 'native-base';

interface IProps {
  label: string;
  children: React.ReactNode;
}

export const InputComposed = ({ label, children }: IProps) => (
  <VStack
    flexDir={'row'}
    alignItems={'center'}
    justifyContent={'space-between'}
  >
    <Text fontWeight={'bold'} mb="2">
      {label}
    </Text>
    {children}
  </VStack>
);
