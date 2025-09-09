import { MongooseConfigAbstract } from '../../application/abstract/configuration/mongoose-config.abstract';
import { cleanEnv } from 'envalid';
import { objectValidator } from './validators/object.validator';

export const mongooseConfigFactory: () => MongooseConfigAbstract = () =>
  cleanEnv(
    {
      options: {
        uri: process.env.MONGODB_URI,
      },
    },
    {
      options: objectValidator(),
    },
  );
