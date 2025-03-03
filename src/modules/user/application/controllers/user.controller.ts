import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CountryService } from 'src/modules/country/application/services/country.service';
// import * as bcrypt from 'bcrypt';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly countryService: CountryService,
  ) {}

  @Post(':userId/calendar/holidays')
  async addHolidayToCalendar(
    @Body()
    body: {
      email: string;
      countryCode: string;
      year: string;
      holidays: string[];
    },
    @Param() param: { userId: string },
  ): Promise<any> {
    const holidays = await this.countryService
      .getCountryHolidays(body.year, body.countryCode)
      .toPromise(); // Assuming this is returning an array of holidays

    // Filter the response to find holidays that match the names in the 'holidays' array
    const holidaysToAdd =
      holidays?.filter(
        (holiday) => body.holidays.includes(holiday.name), // Match holiday name from response with the provided holidays array
      ) ?? []; // Default to an empty array if holidaysToAdd is undefined

    // Now you can proceed to store the filtered holidays in the user's calendar
    const holidayData = holidaysToAdd.map((holiday) => ({
      userId: param.userId,
      countryCode: holiday.countryCode,
      date: holiday.date,
      fixed: holiday.fixed,
      localName: holiday.localName,
      name: holiday.name,
      counties: holiday.counties,
      global: holiday.global,
      launchYear: holiday.launchYear,
      types: holiday.types,
    }));

    // didnt had time to implement databse create user holiday, but this function returns
    // the data that should be stored in the database

    return holidayData;
    // return await this.userService.addHolidayToCalendar(holidayData);
  }
}
