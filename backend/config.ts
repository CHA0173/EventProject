import * as dotenv from "dotenv";

dotenv.config();

export default {
    jwtSecret: 'jsakdlfljadsmview12',// Insert JWT secret here
    jwtSession: {
        session: false
    },
    port: 8080,
    env: "development",
    db : {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "5432",
        name: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
}
