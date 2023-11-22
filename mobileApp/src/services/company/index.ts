import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import { ICreateRequest, IFindResponse, IUpdateRequest } from './companyDTO';

export const companyAxios = () => {
  const axiosPrivate = useAxiosPrivate();

  async function create(data: ICreateRequest) {
    const response = await axiosPrivate.post<IFindResponse>('company', data);

    return response.data;
  }

  async function find() {
    const response = await axiosPrivate.get<IFindResponse[]>('company');

    return response.data;
  }

  async function findById(company_id: string) {
    const response = await axiosPrivate.get<IFindResponse>(
      `company/${company_id}`
    );

    return response.data;
  }

  async function update(company_id: string, data: IUpdateRequest) {
    const response = await axiosPrivate.put<IFindResponse>(
      `company/${company_id}`,
      data
    );

    return response.data;
  }

  async function deleteOne(company_id: string) {
    await axiosPrivate.delete(`company/${company_id}`);
  }

  return {
    create,
    find,
    findById,
    update,
    deleteOne,
  };
};
