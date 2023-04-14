import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Climat, ClimatDocument } from './entities/climat.entity';
import { Model } from 'mongoose';
import moment from 'moment';

@Injectable()
export class ClimatService {
  logger = new ConsoleLogger();

  constructor(
    @InjectModel(Climat.name) private climatModel: Model<ClimatDocument>,
  ) {}

  async getTodayClimat() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${day}/${month}/${year}`;

    return await this.climatModel.findOne({ date: fullDate }).exec();
  }

  async getWeekClimat() {
    return (await this.climatModel.find().exec()).filter((climat) => {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const fullDate = `${year}-${month}-${day}`;
      const historDay = climat.date.split('/')[0];
      const historMonth = climat.date.split('/')[1];
      const historYear = climat.date.split('/')[2];
      const historDate = `${historYear}-${historMonth}-${historDay}`;
      const difference = this.diffInDays(fullDate, historDate);
      this.logger.log(`${difference} days`);
      return difference /* > 0 && difference <= 7 */;
    });
  }
  diffInDays(date1, date2) {
    // Convert strings to dates
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Get the difference in milliseconds
    const diff = Math.abs(d2.getTime() - d1.getTime());

    // Convert to days
    return diff / (1000 * 60 * 60 * 24);
  }
}
