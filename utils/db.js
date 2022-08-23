import mongodb from 'mongodb';
import envLoader from './envLoader';
import { MongoClient } from 'mongodb';
import Collection from 'mongodb/lib/collection';

class DBClient {
    constructor() {
        envLoader();
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 7017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `${mongodb}://${host}/${port}/${database}`;
        this.client = new MongoClient(url);
        this.client.connect();
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        return this.client.db().Collection('users').countDocuments();
    }
    async nbFiles() {
        return this.client.db().Collection('files').countDocuments();
    }
}
const dbClient = new DBClient();
export default dbClient;