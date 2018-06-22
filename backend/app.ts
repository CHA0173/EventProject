import * as express     from 'express';
import * as bodyParser  from 'body-parser';
import * as cors        from 'cors';
import * as Knex        from 'knex';

import * as Knexfile    from './knexfile';
import config           from './config';
import jwtStrategy      from './utils/auth/JwtStrategy';
import ApiRouter        from './routers/ApiRouter';
import UserService      from './services/UserService';
import TemplateService  from './services/TemplateService';
import EventService     from './services/EventService';

const knex = Knex(Knexfile[config.env]);
const app  = express();

const eventService    = new EventService(knex)
const templateService = new TemplateService(knex);
const userService     = new UserService(knex);
const jwtAuth         = jwtStrategy(userService);
const apiRouter       = new ApiRouter(jwtAuth, userService, templateService, eventService);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());
app.use(jwtAuth.initialize());
app.use(express.static("public"));
app.use("/api", apiRouter.getRouter());

app.listen(config.port,() => {
    console.log(`Application started at port: ${config.port}`);
});
