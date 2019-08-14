const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const _ = require('lodash')

const app = new Koa()
const router = new Router({
  prefix: '/webhooks'
})

router.post('/mux', ctx => {
  console.log('mux request: ', ctx.request.body)

  const { type } = _.get(ctx, 'request.body', {})

  ctx.body = ctx.request.body
})

router.get('/', ctx => {
  ctx.body = {
    message: 'que pedo'
  }
})

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

app.listen('7000', error => {
  if (error) return console.error('ERROR: ', error)
  console.log('SERVER LISTENING')
})