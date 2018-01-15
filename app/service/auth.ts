import Auth from "../model/auth";
import Crypto from "../utils/crypto";
import * as jwt from "jsonwebtoken";
import * as config from "../../config";

export class AuthService {
  /**
   * 登陆
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {Promise<Object>}
   * @memberof AuthService
   */
  public static async login(ctx: any, body: any): Promise<Object> {
    const { username, password } = body;
    const auth = await Auth.findOne({ username }).catch((err: any) =>
      ctx.throw(500, err)
    );
    if (auth) {
      if (auth.password === Crypto.encrypt(password)) {
        const token = jwt.sign(
          {
            name: auth.name,
            password: auth.password,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
          },
          config.AUTH.jwtTokenSecret
        );
        return { token, lifeTime: Math.floor(Date.now() / 1000) + 60 * 60 };
      } else {
        const message: string = "密码错误";
        return message;
      }
    } else {
      const message: string = "账户不存在";
      return message;
    }
  }
  /**
   * 获取账户信息
   * @static
   * @param {*} ctx
   * @returns {Promise<Object>}
   * @memberof AuthService
   */
  public static async getAuth(ctx: any): Promise<Object> {
    const auth = await Auth.findOne({}, "name username slogan gravatar").catch(
      (err: any) => ctx.throw(500, err)
    );
    return auth;
  }
  /**
   * 修改账户资料
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {Promise<Object>}
   * @memberof AuthService
   */
  public static async putAuth(ctx: any, body: any): Promise<Object> {
    const {
      _id,
      name,
      username,
      slogan,
      gravatar,
      oldPassword,
      newPassword
    } = body;
    const auth = await Auth.findOne(
      {},
      "_id name slogan gravatar password"
    ).catch((err: any) => ctx.throw(500, err));
    if (auth) {
      if (auth.password !== Crypto.encrypt(oldPassword)) {
        const message: string = "原密码错误";
        return message;
      } else {
        const password = newPassword === "" ? oldPassword : newPassword;
        let _auth = await Auth.findByIdAndUpdate(
          _id,
          {
            _id,
            name,
            username,
            slogan,
            gravatar,
            password: Crypto.encrypt(password)
          },
          { new: true }
        ).catch((err: any) => ctx.throw(500, err));
        return _auth;
      }
    }
  }
}
