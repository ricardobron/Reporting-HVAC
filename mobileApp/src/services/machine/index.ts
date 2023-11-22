import { API_URL } from 'src/constants';
import {
  ICreateRequest,
  IFindResponse,
  IUpdateRequest,
  IFindByIdResponse,
  Machines,
} from './machineDTO';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';

export const machineAxios = () => {
  const axiosPrivate = useAxiosPrivate();

  async function create(data: ICreateRequest) {
    const response = await axiosPrivate.post<Machines>('machine', data);

    return response.data;
  }

  async function find(company_id: string) {
    const response = await axiosPrivate.get<IFindResponse[]>(
      `machine/all/${company_id}`
    );

    return response.data;
  }

  async function findById(machine_id: string) {
    const response = await axiosPrivate.get<IFindByIdResponse | null>(
      `machine/${machine_id}`
    );

    return response.data;
  }

  async function update(machine_id: string, data: IUpdateRequest) {
    const response = await axiosPrivate.put<IFindResponse>(
      `machine/${machine_id}`,
      data
    );

    return response.data;
  }

  async function deleteOne(machine_id: string) {
    await axiosPrivate.delete(`machine/${machine_id}`);
  }

  function printLabelToPdf(machine_id: string) {
    // await api.get(`machine/${machine_id}`);

    return `${API_URL}/machine/${machine_id}/qrcode`;
  }

  return { create, deleteOne, find, findById, printLabelToPdf, update };
};
