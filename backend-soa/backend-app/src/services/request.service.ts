import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ReportRequest } from 'src/entities';
import { AI_SERVICE, DOWNLOAD_SERVICE, REQUEST_SERVICE } from 'src/my.constants';

@Injectable()
export class RequestService {
    constructor(
        @Inject(REQUEST_SERVICE) private readonly clientRequest: ClientProxy,
        @Inject(DOWNLOAD_SERVICE) private readonly clientDownload: ClientProxy,
        @Inject(AI_SERVICE) private readonly clientAI: ClientProxy
    ){}

    getHello(): string {
        return 'Hello World!';
    }

    
    addRequest(request: ReportRequest): Observable<ReportRequest> {
        const pattern = { cmd: 'add'};
        return this.clientRequest.send<ReportRequest>(pattern, request);
    }

    
    updateRequests(requests: ReportRequest[]): Observable<ReportRequest[]> {
        const pattern = { cmd: 'update'};
        return this.clientRequest.send<ReportRequest[]>(pattern, requests);
    }

    getUnprocessedRequests(): Observable<ReportRequest[]> {
        const pattern = { cmd: 'unprocessed'};
        return this.clientRequest.send<ReportRequest[]>(pattern, {});
    }

    downloadRequests(requests: ReportRequest[]): Observable<ReportRequest[]> {
        const pattern = { cmd: 'download'};
        return this.clientDownload.send<ReportRequest[]>(pattern, requests);
    }

    getAIAnalyze(requests: ReportRequest[]): Observable<ReportRequest[]> {
        const pattern = { cmd: 'analyze'};
        return this.clientAI.send<ReportRequest[]>(pattern, requests);
    }

    getAll(): Observable<ReportRequest[]> {
        const pattern = {cmd: 'all'};
        return this.clientRequest.send<ReportRequest[]>(pattern, {});
    }
}