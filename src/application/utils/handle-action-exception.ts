import { ERROR_CODE } from '../../domain/constants/error-codes';
import { BaseException } from '../exceptions/base/base-exception';

export const handleActionException = (id: string, e: unknown) => {
  const typedException = e as BaseException;
  const error = typedException.getErrors?.()?.[0];

  return {
    id,
    status: ERROR_CODE,
    errorMessage: error?.message ?? typedException?.message,
    errorCode: error?.code ?? typedException['toString']?.() ?? '',
  };
};
