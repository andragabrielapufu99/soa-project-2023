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

  @MessagePattern({cmd: 'download'})
  async downloadRequests(requests: ReportRequest[]): Promise<ReportRequest[]> {
    return this.appService.downloadRequests(requests);
  }
}
