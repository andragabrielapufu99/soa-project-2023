import { Injectable } from '@nestjs/common';
import { ReportRequest, RequestStatusType } from './entities';

@Injectable()
export class AppService {
  private requests: ReportRequest[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  async addRequest(request: ReportRequest): Promise<ReportRequest> {
    console.log('Add request', JSON.stringify(request));
    // generate id
    let lastId = -1;
    if(this.requests.length > 0) {
      lastId = this.requests[this.requests.length - 1].id;
    }
    request.id = lastId + 1;
    this.requests.push(request);
    return await Promise.resolve(request);
  }

  async updateRequests(updateRequests: ReportRequest[]): Promise<ReportRequest[]> {
    let result: ReportRequest[] = [];
    for(let request of updateRequests){
      let ridx = this.requests.findIndex(r => r.id === request.id);
      if(ridx !== -1) {
        this.requests[ridx] = request;
        result.push(request);
      }
    }
    return await Promise.resolve(result);
  }

  async getUnprocessedRequests(): Promise<ReportRequest[]> {
    let result = this.requests.filter(request => request.status === RequestStatusType.UNPROCESSED);
    for(let r of result){
      r.status = RequestStatusType.INPROGRESS;
      let ridx = this.requests.findIndex(x => x.id === r.id);
      if(ridx !== -1) this.requests[ridx] = r; 
    }
    return await Promise.resolve(result);
  }
}
