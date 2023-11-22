import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import { ICreateRequest, IReports, IUpdateRequest } from './reportsDTO';

export const reportsAxios = () => {
  const axiosPrivate = useAxiosPrivate();

  async function create(data: ICreateRequest) {
    const response = await axiosPrivate.post<IReports>('reports', data);

    return response.data;
  }

  async function find(machine_id: string) {
    const response = await axiosPrivate.get<IReports[]>(
      `reports/all/${machine_id}`
    );

    return response.data;
  }

  async function findById(report_id: string) {
    const response = await axiosPrivate.get<IReports | null>(
      `reports/${report_id}`
    );

    return response.data;
  }

  async function update(report_id: string, data: IUpdateRequest) {
    const response = await axiosPrivate.put<IReports>(
      `reports/${report_id}`,
      data
    );

    return response.data;
  }

  async function deleteOne(report_id: string) {
    await axiosPrivate.delete(`reports/${report_id}`);
  }

  return {
    create,
    find,
    findById,
    update,
    deleteOne,
  };
};
