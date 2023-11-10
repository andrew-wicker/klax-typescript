import { ErrorInfo } from '../types/types';

export const createErr = (errInfo: ErrorInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `gameActions.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in gameActions.${method}. Check server logs for more details.`,
    },
  };
};
