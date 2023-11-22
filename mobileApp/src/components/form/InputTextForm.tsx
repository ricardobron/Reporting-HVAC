import { TextInputProps } from 'react-native';
import { Text, VStack } from 'native-base';
import { Input } from '../Input';

interface IProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export const InputTextForm = ({
  label,
  required = false,
  ...inputProps
}: IProps) => (
  <VStack>
    <Text fontWeight={'bold'} mb="2">
      {label} {required && '*'}
    </Text>
    <Input {...inputProps} />
  </VStack>
);
