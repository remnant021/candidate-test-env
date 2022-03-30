import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import render from 'koa-ejs'
import bodyParser from 'koa-bodyparser'
import path, { resolve } from 'path'
import favicon from 'koa-favicon'
import cors from '@koa/cors'
import { router } from './routes'
import mongoose from 'mongoose'
import { bearerToken } from 'koa-bearer-token'

const app = new Koa()

//connect database

mongoose.connect("mongodb+srv://kanin:2H1RMbhPXwpLslgd@candidate.luyne.mongodb.net/candidate?retryWrites=true&w=majority")
  .then(() => console.log("Connect Mongodb")).catch((err) => console.log(err))

app.use(json())
app.use(bodyParser())
app.use(logger())
app.use(favicon(__dirname + '/../public/favicon.ico'))
app.use(cors())
app.use(bearerToken())

app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.throw(404)
    }
  } catch (err: any) {
    ctx.status = err.status || 500
    if (ctx.status === 404) {
      await ctx.render('404')
    } else {
      ctx.body = {
        status: ctx.status,
        message: err.message
      }
    }
  }
})

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log('Server Started'))