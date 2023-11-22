import { Text, View } from 'native-base';

type IProps = { label: string };

export const LabelForm = ({ label }: IProps) => {
  return (
    <View mb="4">
      <Text fontWeight={'bold'} fontSize={'xl'}>
        {label}
      </Text>
    </View>
  );
};
