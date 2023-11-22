import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import { IFindMinifiedResponse } from './interventionTypesDTO';

export const interventionTypesAxios = () => {
  const axiosPrivate = useAxiosPrivate();

  async function find() {
    const response = await axiosPrivate.get<IFindMinifiedResponse[]>(
      'intervention_types'
    );

    return response.data;
  }

  return { find };
};
