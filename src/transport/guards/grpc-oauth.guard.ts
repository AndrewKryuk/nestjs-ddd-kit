import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '../../application/exceptions/infra/unauthorized-exception';
import { ERROR_CODES } from '../../domain/constants/error-codes';
import { IOauthUser } from '../../domain/interfaces/oauth/oauth-user.interface';

@Injectable()
export class GrpcOauthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToRpc().getContext();

    const type = context.getType();
    const prefix = 'Bearer ';

    let header: string = '';
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1);

      if (!metadata) {
        this.throwError("Metadata's not found");
      }

      header = metadata.get('authorization')[0];
    }

    if (!header || !header.includes(prefix)) {
      this.throwError("Token's not found");
    }

    const token = header.slice(header.indexOf(' ') + 1);

    try {
      const user: IOauthUser = await this.jwtService.verifyAsync(token);

      if (user === undefined) {
        this.throwError();
      }

      request['user'] = user;
    } catch (e: any) {
      this.throwError(e?.message);
    }

    return true;
  }

  private throwError(message: string = 'Unauthorized error') {
    throw new UnauthorizedException([
      { message, code: ERROR_CODES.GRPC_UNAUTHORIZED },
    ]);
  }
}
