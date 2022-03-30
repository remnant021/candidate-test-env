import KoaRouter from 'koa-router'
import Auth from '../controller/auth'
import Service from '../controller/service'
import Order from '../controller/order'


const router = new KoaRouter()

router.post('/v1/auth/register', Auth.register)
  .post('/v1/auth/signin', Auth.signin)
  .get('/v1/services', Service.listSevices)
  .get('/v1/services/:service_id', Service.getServices)
  .post('/v1/services/:service_id/booking', Service.booking)
  .get('/v1/orders', Order.gets)
  

export { router }