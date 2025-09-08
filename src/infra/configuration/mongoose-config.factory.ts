import { MongooseConfigAbstract } from '../../domain/abstract/configuration/mongoose-config.abstract';

export const mongooseConfigFactory: () => MongooseConfigAbstract = () => ({
  options: {
    uri: process.env.MONGODB_URI,
  },
});
