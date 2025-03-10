import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup') // auth/signup
  async signup(@Body() signupData: SignupDto) {
    return this.authService.signUp(signupData)
  }

  @Post('login') // auth/login
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials)
  }

  @Post('refresh') // auth/login
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken)
  }

  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword
    );
  }
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    )
  }

}
