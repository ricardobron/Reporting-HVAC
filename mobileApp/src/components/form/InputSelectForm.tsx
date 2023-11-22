import { Text, VStack } from 'native-base';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

interface IProps extends PickerSelectProps {
  label: string;
  required?: boolean;
}

export const InputSelectForm = ({
  label,
  required = false,
  ...rest
}: IProps) => {
  return (
    <VStack>
      <Text fontWeight={'bold'} mb="2">
        {label} {required && '*'}
      </Text>
      <RNPickerSelect {...rest} />
    </VStack>
  );
};
