import { MongooseConfigAbstract } from '../../application/abstract/configuration/mongoose-config.abstract';

export const mongooseConfigFactory: () => MongooseConfigAbstract = () => ({
  options: {
    uri: process.env.MONGODB_URI,
  },
});
