import { Injectable } from '@nestjs/common';
import { ReportRequest, RequestStatusType } from './entities';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  async downloadRequests(requests: ReportRequest[]): Promise<ReportRequest[]> {
    for(let request of requests){
      const maxLimit = 6;
      const rndInt = Math.floor(Math.random() * maxLimit) + 1;
      for(let i=0; i<rndInt; i++){
        request.spectrograms.push(`pathSpectrogram${i}`);
      }
      request.status = RequestStatusType.PROCESSED;
    }
    return await Promise.resolve(requests);
  }
}
