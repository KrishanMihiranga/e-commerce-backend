import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFormHeader(request);

        if (!token) {
            throw new UnauthorizedException('Invalid Token');
        }
        try {
            const payload = this.jwtService.verify(token);
            request.userId = payload.userId;
        } catch (err) {
            Logger.error(err.message);
            throw new UnauthorizedException('Invalid Token');
        }

        return true;
    }

    private extractTokenFormHeader(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }
}