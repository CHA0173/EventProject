import * as dotenv from "dotenv";

dotenv.config();

export default {
    jwtSecret: 'jsakdlfljadsmview12',// Insert JWT secret here
    jwtSession: {
        session: false
    },
    port: 8080,
    env: "production",
    db : {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "5432",
        name: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    google : {
      clientID: '327182754672-ffk85ruc413vc4oscot3puja8eevtc39.apps.googleusercontent.com',
      clientSecret: 'nWKm6nkkGI52xXaH6i9Kpplv',
      callbackURL: 'http://localhost:8080/auth/google/callback',
    }
}
