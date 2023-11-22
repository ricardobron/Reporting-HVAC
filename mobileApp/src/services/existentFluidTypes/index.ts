import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import { IFindMinifiedResponse } from './existentFluidTypesDTO';

export const existentFluidTypesAxios = () => {
  const axiosPrivate = useAxiosPrivate();

  async function find() {
    const response = await axiosPrivate.get<IFindMinifiedResponse[]>(
      'existent_fluid_types'
    );

    return response.data;
  }

  return { find };
};
