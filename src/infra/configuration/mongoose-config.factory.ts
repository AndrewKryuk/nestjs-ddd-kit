import { MongooseConfigAbstract } from '../../application/abstract/configuration/mongoose-config.abstract';
import { cleanEnv, str } from 'envalid';

export const mongooseConfigFactory: () => MongooseConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    MONGODB_URI: str(),
  });

  return {
    options: {
      uri: env.MONGODB_URI,
    },
  };
};
