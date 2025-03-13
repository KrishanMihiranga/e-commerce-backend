import { BadRequestException, Controller, Get, HttpException, HttpStatus, Req, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { Permissions } from './decorators/permissions.decorators';
import { Resource } from './roles/enums/resource.enum';
import { Action } from './roles/enums/action.enum';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import errors from './config/errors.config';
import { ToNumberPipe } from './pipes/validation.pipe';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('/products')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Permissions([{ resource: Resource.products, actions: [Action.read] }])
  @Get()
  @UsePipes(ToNumberPipe)
  someProtectedRoute(@Req() req) {
    throw new BadRequestException(errors.validationFailed)
    return { message: 'Accesses resource', userId: req.userId }
  }
}
