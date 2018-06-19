import * as express     from 'express';
import * as bodyParser  from 'body-parser';
import * as cors        from 'cors';
import * as path        from 'path';
import * as Knex        from 'knex';

import * as Knexfile    from './knexfile';
import config           from './config';
import jwtStrategy      from './utils/auth/JwtStrategy';
import ApiRouter        from './routers/ApiRouter';
import UserService      from './services/UserService';
import SearchService      from './services/SearchService';



const knex = Knex(Knexfile[config.env]);
const app = express();

const userService = new UserService(knex);
const searchService = new SearchService(knex);
const jwtAuth = jwtStrategy(userService);
const apiRouter = new ApiRouter(jwtAuth, userService, searchService);

app.set("utils", path.join(__dirname, "utils"));
app.set("routers", path.join(__dirname, "routers"));
app.set("services", path.join(__dirname, "services"));

app.use(bodyParser());
app.use(cors());
app.use(jwtAuth.initialize());
app.use("/api", apiRouter.getRouter());


app.listen(config.port,() => {
    console.log(`Application started at port: ${config.port}`);
});
