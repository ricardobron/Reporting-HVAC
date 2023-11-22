import { VStack, HStack, Text, Alert } from 'native-base';
import { Dimensions } from 'react-native';

interface ToastMessage {
  status?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const ToastAlertComponent = ({
  status,
  title,
  description,
}: ToastMessage) => {
  const height = Dimensions.get('window').height;

  const marginBotton = height - 200;

  return (
    <Alert
      mb={`${marginBotton}px`}
      maxWidth="100%"
      flexDirection="row"
      status={status ? status : 'info'}
      variant={'subtle'}
    >
      <VStack w="100%">
        <HStack alignItems="center">
          <Alert.Icon />

          <VStack flex="1" alignItems={'center'} textAlign="center">
            <Text fontSize="md" fontWeight="medium" color={'darkText'}>
              {title}
            </Text>
            <Text color={'darkText'}>{description}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Alert>
  );
};
