import { Injectable } from '@nestjs/common';
import { ReportRequest } from './entities';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  async analyzeRequests(requests: ReportRequest[]): Promise<ReportRequest[]> {
    for(let request of requests){
      let emotions: string[] = ['happy', 'astonished', 'pleased', 'bored', 'angry', 'frustrated'];
      const maxLimit = 6;
      for(let i=0; i<request.spectrograms.length; i++){
        const rndInt = Math.floor(Math.random() * maxLimit) + 1;
        for(let j=0; j<rndInt; j++){
          request.results.push({'emotion': emotions[rndInt], 'count': rndInt + 20});
        }
      }
    }
    return await Promise.resolve(requests);
  }
}
