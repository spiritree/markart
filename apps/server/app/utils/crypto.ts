import * as crypto from 'crypto'

export default class Crypto {
  /**
   * md5加密密码
   * @static
   * @param {string} password
   * @returns {string}
   * @memberof Crypto
   */
  public static encrypt(password: string): string {
    return crypto
      .createHash('md5')
      .update(password)
      .digest('hex')
  }
}
