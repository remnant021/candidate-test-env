import { Context } from "koa"
import jwt from 'jsonwebtoken'
import modelAuth from "./../model/auth"
import md5 from "md5"


export default class Auth {

  public static async register(ctx: Context) {
    let params: any = {
      'fullName': ctx.request.body['fullName'],
      'username': ctx.request.body['username'],
      'password': md5(ctx.request.body['password'])
    }
    let username = ctx.request.body['username']

    await modelAuth.create({ fullName: params['fullName'], username: params['username'], password: params['password'] })
    const token = await Auth.createToken(username)

    ctx.body = {
      status: 200,
      token: token
    }
  }
  public static async signin(ctx: Context) {
    let username = ctx.request.body['username']
    let password = md5(ctx.request.body['password'])
    let data = await modelAuth.findOne({ username: username }).clone().catch(function (err) {
      ctx.throw(400, "User not found")
    })
    if (password === data['password']) {
      const token = await Auth.createToken(username)
      ctx.body = {
        status: 200,
        token: token
      }
    } else {
      ctx.throw(400, "Password not matching")
    }
  }

  private static async createToken(username: string) {
    const token = jwt.sign({
      sub: "token",
      username: username,
      exp: Math.floor(Date.now() / 1000) + (15 * 60),
    }, "candidate")
    return token
  }
  public static async authToken(token: string) {
    var data: any = jwt.verify(token, "candidate")
    if (Math.floor(Date.now() / 1000) >= data['exp']) {
      return false
    }
    return data
  }
}