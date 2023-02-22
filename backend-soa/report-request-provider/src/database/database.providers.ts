import * as mongoose from 'mongoose';

const DB_NAME = 'SOA';
const dbString = `mongodb+srv://puffy:puffy1999@cluster0.daezy.mongodb.net/${DB_NAME}`;

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(dbString)
    }
];