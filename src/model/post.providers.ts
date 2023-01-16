import { Connection } from 'mongoose';
import { PostSchema } from '../schemas/post.schema.js';

export const postsProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Post', PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
