import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import { IFindMinifiedResponse } from './airConditioningTypesDTO';

export const airConditioningTypesAxios = () => {
  const axiosPrivate = useAxiosPrivate();

  async function find() {
    const response = await axiosPrivate.get<IFindMinifiedResponse[]>(
      'air_conditioning_types'
    );

    return response.data;
  }

  return { find };
};
