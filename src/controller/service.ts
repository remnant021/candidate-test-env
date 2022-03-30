import { Context } from "koa"
import modelService from "./../model/service"
import modelAuth from "../model/auth"
import modelBooking from '../model/booking'
import Auth from "./auth"


export default class Service {

  public static async listSevices(ctx: Context) {
    let data = await modelService.find({})

    ctx.body = {
      status: 200,
      services: data
    }
  }
  public static async getServices(ctx: Context) {
    let service_id = ctx.params['service_id']

    let data = await modelService.find({ _id: service_id })
    ctx.body = {
      status: 200,
      data: data
    }
  }
  public static async booking(ctx: Context) {
    const token: any = ctx.request.token
    try {
      var data: any = await Auth.authToken(token)
    } catch (err) {
      ctx.throw(400, "Invalid Token")
    }
    let service: any = await modelService.findOne({ _id: ctx.params['service_id'] }).clone().catch(function (err) {
      ctx.throw(400, "Service not found")
    })
    let user: any = await modelAuth.findOne({ username: data['username'] }).clone().catch(function (err) {
      ctx.throw(400, "User not found")
    })
    let booking = await modelBooking.create({ service_id: service['_id'], user_id: user["_id"] })
    ctx.body = {
      status: 200,
      username: user,
      service: service
    }
  }
}