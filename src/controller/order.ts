import { Context } from "koa"
import modelService from "./../model/service"
import modelAuth from "../model/auth"
import modelBooking from '../model/booking'
import Auth from "./auth"

export default class Order {

  public static async gets(ctx: Context) {
    const token: any = ctx.request.token
    if ([undefined, null, ""].includes(token)) {
      ctx.throw(400, "Token not found")
    }
    try {
      var data: any = await Auth.authToken(token)
    } catch (err) {
      ctx.throw(400, "Invalid Token")
    }

    let user: any = await modelAuth.findOne({ username: data['username'] }).clone().catch(function (err) {
      ctx.throw(400, "User not found")
    })
    let booking: any = await modelBooking.find({ user_id: user['_id'] }).clone().catch(function (err) {
      ctx.throw(400, "Booking not found")
    })
    let response: any = []
    for (let i = 0; i < booking.length; i++) {

      let service = await modelService.findOne({ _id: booking[i]['service_id'] }).clone().catch(function (err) {
        ctx.throw(400, "Service not found")
      })
      response.push({
        _id: booking[i]['_id'],
        services: service,
        user: user,
        createdAt: booking[i]['createdAt']
      })
    }

    ctx.body = response
  }
}