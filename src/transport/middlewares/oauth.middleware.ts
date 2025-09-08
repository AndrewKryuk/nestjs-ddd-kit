import {
  HttpStatus,
  Injectable,
  mixin,
  NestMiddleware,
  Type,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ERROR_CODES } from '../../domain/constants/error-codes';
import { IOauthUser } from '../../domain/interfaces/oauth/oauth-user.interface';

export const OauthMiddlewareCreator = (options: {
  userProvider?: <T>(token?: string, userInfo?: IOauthUser) => Promise<T> | T;
}): Type<NestMiddleware> => {
  @Injectable()
  class OauthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(request: Request, response: Response, next: NextFunction) {
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        return this.throwError(response);
      }

      try {
        const userInfo: IOauthUser = await this.jwtService.verifyAsync(token);

        Reflect.set(
          request,
          'user',
          options?.userProvider
            ? await options.userProvider(token, userInfo)
            : userInfo,
        );
      } catch (e: any) {
        return this.throwError(response, e?.message);
      }

      next();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

    private throwError(response: Response, message = 'Unauthorized error') {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ errors: [{ message, code: ERROR_CODES.HTTP_UNAUTHORIZED }] });
    }
  }

  return mixin(OauthMiddleware);
};
