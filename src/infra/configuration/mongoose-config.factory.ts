import { MongooseConfigAbstract } from '../../application/abstract/configuration/mongoose-config.abstract';
import { cleanEnv, json } from 'envalid';

export const mongooseConfigFactory: () => MongooseConfigAbstract = () =>
  cleanEnv(
    {
      options: {
        uri: process.env.MONGODB_URI,
      },
    },
    {
      options: json(),
    },
  );
