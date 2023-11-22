import { IFindResponse as ICompany } from 'src/services/company/companyDTO';
import { IFindByIdResponse as IMachine } from 'src/services/machine/machineDTO';
import { IReports } from 'src/services/reports/reportsDTO';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined /** HOME ADMIN */;

      ScanQrCode: undefined;

      SignInAdmin: undefined;
      SignInCompany: undefined;

      CompanyHome: { company_id: string };
      EditCompany: { company_id?: string; data?: ICompany };

      MachineHome: { machine_id: string; company_id: string };
      EditMachine: { company_id: string; machine_id?: string; data?: IMachine };

      ReportsHome: { report_id: string; machine_id: string };
      EditReport: { machine_id: string; report_id?: string; data?: IReports };
    }
  }
}
