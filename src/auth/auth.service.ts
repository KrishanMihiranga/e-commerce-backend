import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
        private jwtService: JwtService,
    ) { }
    async signUp(signupData: SignupDto) {
        const { email, password, name } = signupData;

        // Check if email is in use
        const emailInUse = await this.UserModel.findOne({ email })

        if (emailInUse) {
            throw new BadRequestException("Email already in use")
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user Doc and save user
        await this.UserModel.create({
            name,
            email,
            password: hashedPassword,
        })
    }

    async login(credentials: LoginDto) {
        const { email, password } = credentials;
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException("Wrong Credentials");
        }

        const tokens = await this.generateUserTokens(user._id)
        return {
            ...tokens,
            userId: user._id,
        }
    }

    async refreshTokens(refreshToken: string) {
        const token = await this.RefreshTokenModel.findOneAndDelete({
            token: refreshToken,
            expiryDate: { $gte: new Date() },
        })

        if (!token) {
            throw new UnauthorizedException("Refresh Token is invalid");
        }

        return this.generateUserTokens(token.userId)
    }

    async generateUserTokens(userId) {
        const accessToken = await this.jwtService.sign({ userId }, { expiresIn: '1h' })
        const refreshToken = uuidv4()

        await this.storeRefreshToken(refreshToken, userId)

        return {
            accessToken,
            refreshToken,
        }
    }

    async storeRefreshToken(token: string, userId) {

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3)

        await this.RefreshTokenModel.create({ token, userId, expiryDate })
    }
}
