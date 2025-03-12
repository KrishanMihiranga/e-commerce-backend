import { BadRequestException, Controller, Get, HttpException, HttpStatus, Req, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Permissions } from './decorators/permissions.decorators';
import { Resource } from './roles/enums/resource.enum';
import { Action } from './roles/enums/action.enum';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import errors from './config/errors.config';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('/products')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Permissions([{ resource: Resource.products, actions: [Action.read] }])
  @Get()
  someProtectedRoute(@Req() req) {
    // throw new HttpException(
    //   {
    //     statusCode: HttpStatus.BAD_GATEWAY,
    //     message: 'Custom Error'
    //   }, HttpStatus.BAD_GATEWAY, { cause: new Error("") })

    throw new BadRequestException(errors.validationFailed)
    return { message: 'Accesses resource', userId: req.userId }
  }
}
