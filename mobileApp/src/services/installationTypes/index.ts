import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import { IFindMinifiedResponse } from './installationTypesDTO';

export const installationTypesAxios = () => {
  const axiosPrivate = useAxiosPrivate();

  async function find() {
    const response = await axiosPrivate.get<IFindMinifiedResponse[]>(
      'installation_types'
    );

    return response.data;
  }

  return { find };
};
