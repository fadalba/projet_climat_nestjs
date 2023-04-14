import { Controller, Get } from '@nestjs/common';
import { ClimatService } from './climat.serv ice';

@Controller('climat')
export class ClimatController {
  constructor(private readonly climatservice: ClimatService) {}

  @Get()
  getClimat() {
    return this.climatservice.getTodayClimat();
  }

  @Get('histo')
  getClimatHisto() {
    return this.climatservice.getWeekClimat();
  }
}
