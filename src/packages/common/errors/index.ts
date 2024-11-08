let ERROR_CODE_MAP = {
  NOT_FOUND: 404,
  VALIDATION: 400,
  PARSE: 422,
  UNKNOWN: 500,
  INTERNAL_SERVER_ERROR: 500,
  INVALID_COOKIE_SIGNATURE: 401,
} as const;

ERROR_CODE_MAP = new Proxy(ERROR_CODE_MAP, {
  get: (target: typeof ERROR_CODE_MAP, key: keyof typeof ERROR_CODE_MAP) => {
    if (target[key]) return target[key];
    return ERROR_CODE_MAP.UNKNOWN;
  },
});

export default ERROR_CODE_MAP;
