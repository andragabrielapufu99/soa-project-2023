import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ReportRequest } from './entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({cmd: 'add'})
  async addRequest(request: ReportRequest): Promise<ReportRequest> {
    return this.appService.addRequest(request);
  }

  @MessagePattern({cmd: 'update'})
  async updateRequests(requests: ReportRequest[]): Promise<ReportRequest[]> {
    return this.appService.updateRequests(requests);
  }

  @MessagePattern({cmd: 'unprocessed'})
  async getUnprocessedRequests(): Promise<ReportRequest[]> {
    return this.appService.getUnprocessedRequests();
  }

  @MessagePattern({cmd: 'all'})
  async getAll(): Promise<ReportRequest[]> {
    return this.appService.getAll();
  }
}
