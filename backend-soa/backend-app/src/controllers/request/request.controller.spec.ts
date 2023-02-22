import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from 'src/services/request.service';
import { RequestController } from './request.controller';

describe('RequestController', () => {
  let appController: RequestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [RequestService],
    }).compile();

    appController = app.get<RequestController>(RequestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});