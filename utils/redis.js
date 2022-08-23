import { createClient } from "redis";
import { promisify } from "redis";

class RedisClient {
    constructor() {
        this.client = createClient();
        this.isClientConnected = true;
        this.client.on("error", (err) => {
            console.error("Redis client error: ", err);
            this.isClientConnected = false;
        });
        this.client.on("connect", () => {
            thsi.isClientConnected = true;
        });
    }

    /**
     * checks if the connected client is active
     */
    isAlive() {
        return this.isClientConnected;
    }

    /**
     *
     * @param {key} key To search for the value
     * @returns The value that associate with the given key
     */
    async get(key) {
            return promisify(this.client.GET).bind(this.client)(key);
        }
        /**
         * Set the the given value associating with the given key
         * @param {*} key To be associated with the value
         * @param {*} value the value to be stored
         * @param {*} duration the time to expire in seconds
         */
    async set(key, value, duration) {
            await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
        }
        /**
         * delete the value associated with the given key
         * @param {key} key To retrieve the value to be deleted
         * @returns {void}
         */
    async del(key) {
        await promisify(this.client.DEL).bind(this.client)(key);
    }
}
export const redisClient = new RedisClient();
export default redisClient;