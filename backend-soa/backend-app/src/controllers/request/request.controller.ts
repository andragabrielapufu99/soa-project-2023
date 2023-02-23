import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ReportRequest } from '../../entities';
import { RequestService } from 'src/services/request.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWsGateway } from './request.ws-gateway';

@UseGuards(JwtAuthGuard)
@Controller('api/request')
export class RequestController {
  constructor(private readonly service: RequestService, private readonly requestWsGateway: RequestWsGateway) {
        setInterval(() => {
            this.getUnprocessedRequests().subscribe(requests => {
                if(requests.length !== 0){
                    this.downloadRequests(requests).subscribe(downloadedRequests => {
                        this.getAIAnalyze(downloadedRequests).subscribe(analyzedRequets => {
                            this.updateRequests(analyzedRequets).subscribe(result => {
                                this.requestWsGateway.broadcast({event: 'update-requests', payload: result});
                            });
                        });
                    });
                }
            });
        }, 1000);
    }

  @Get()
  getHello(): string {
    return this.service.getHello();
  }

  @Post('all')
  getRequestsByEmail(@Body() body: any): Observable<ReportRequest[]> {
    return this.service.getAllByEmail(body);
  }

  @Post('add')
  addRequest(@Body() request: ReportRequest): Observable<ReportRequest> {
    return this.service.addRequest(request);
  }

  @Post('update')
  updateRequests(@Body() requests: ReportRequest[]): Observable<ReportRequest[]> {
    return this.service.updateRequests(requests);
  }

  private getUnprocessedRequests(): Observable<ReportRequest[]> {
    return this.service.getUnprocessedRequests();
  }

  private downloadRequests(requests: ReportRequest[]): Observable<ReportRequest[]> {
    return this.service.downloadRequests(requests);
  }

  private getAIAnalyze(requests: ReportRequest[]): Observable<ReportRequest[]> {
    return this.service.getAIAnalyze(requests);
  }
}