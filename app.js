const Koa = require('koa');
//log
const logger = require('koa-logger');
//router
const Router = require('koa-router');
//body parser
const bodyParser = require('koa-bodyparser');
//view
const views = require('koa-views');

const app = new Koa();

/**
在此可組合各種Middleware
**/

//Log Middleware
app.use(logger());
//bodyParser Middleware
app.use(bodyParser());
//view Middleware use ejs blade module
app.use(views(__dirname + '/views', {
    extension: 'ejs' //載入的副檔名
}));

//router
const router = Router();
// -> /
router.get('/', async(ctx) => {
    await ctx.render('index', {
        title: 'View Title',
        name: 'Eric',
        engine: 'ejs'
    });
})
// -> /watch
router.get('/watch', async(ctx) => {
    ctx.body = 'Watch Me!!';
});
// -> /admin get params
router.get('/admin', async(ctx) => {
    console.log(ctx.query);
    let name = ctx.query.name;
    let talk = ctx.query.talk;
    ctx.body = `<p>${name} : ${talk}</p>`
});
//get login form
router.get('/login', async(ctx) => {
    console.log(ctx.request);
    ctx.body = `
        <form method="POST" action="/login">
            <label>UserName</label>
            <input name="name"/></br>
            <button type="submit">Submit</button>
        </form>
    `;
});
//post login get post data
router.post('/login', async(ctx) =>{
    console.log(ctx.request);
    let name = ctx.request.body.name;
    ctx.body = `<p>Hi, ${name}</p>`;
});



app.use(router.routes());

app.use(async function(ctx) {
    ctx.body = 'Hello Koa2';
});
app.listen(3000);