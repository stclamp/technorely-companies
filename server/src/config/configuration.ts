import { registerAs } from '@nestjs/config';
import { EnumConfig } from './enumConfig/enumConfig';
import { pgConfig } from './posgres.config';

export const databaseConfig = registerAs(EnumConfig.DATABASE, () => {
  return {
    pg: {
      ...pgConfig(),
    },
  };
});
