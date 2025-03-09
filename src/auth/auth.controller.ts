import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') // auth/signup
  async signup(@Body() signupData:SignupDto){
    return this.authService.signUp(signupData)
  }

  @Post('login') // auth/login
  async login(@Body() credentials:LoginDto){
    return this.authService.login(credentials)
  }

  @Post('refresh') // auth/login
  async refreshTokens(@Body() refreshTokenDto:RefreshTokenDto){
    return this.authService.refreshTokens(refreshTokenDto.refreshToken)
  }
}
