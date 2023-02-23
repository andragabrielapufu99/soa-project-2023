import { Injectable, Inject } from '@nestjs/common';
import { ReportRequest, RequestStatusType } from './entities';
import { Model } from 'mongoose';

@Injectable()
export class AppService {

  constructor(
    @Inject('REPORT_REQUEST_MODEL')
    private reportRequestModel: Model<ReportRequest>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addRequest(request: ReportRequest): Promise<ReportRequest> {
    // generate id
    let lastId = -1;
    let requests = await this.reportRequestModel.find().exec();
    if(requests.length > 0) {
      lastId = requests[requests.length - 1].id;
    }
    request.id = lastId + 1;

    const createdRequest = new this.reportRequestModel(request);
    return createdRequest.save();
  }

  async updateRequests(updateRequests: ReportRequest[]): Promise<ReportRequest[]> {
    for(let request of updateRequests){
      await this.reportRequestModel.findOneAndUpdate({id: request.id}, request);
    }
    return await Promise.resolve(updateRequests);
  }

  async getUnprocessedRequests(): Promise<ReportRequest[]> {
    let result = await this.reportRequestModel.find({status: RequestStatusType.UNPROCESSED});
    for(let r of result){
      r.status = RequestStatusType.INPROGRESS;
      await this.reportRequestModel.findOneAndUpdate({id: r.id}, r);
    }
    return await Promise.resolve(result);
  }

  async getAllByEmail(body: any): Promise<ReportRequest[]> {
    return await (await this.reportRequestModel.find({email: body.email})).reverse();
  }
}
