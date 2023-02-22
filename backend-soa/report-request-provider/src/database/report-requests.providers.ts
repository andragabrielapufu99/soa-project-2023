import { Connection } from 'mongoose';
import { ReportRequestSchema } from './schemas/report-request.schema';

export const reportRequestsProviders = [
  {
    provide: 'REPORT_REQUEST_MODEL',
    useFactory: (connection: Connection) => connection.model('ReportRequest', ReportRequestSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];