import * as jwt from 'jsonwebtoken';
import * as config from '../../config'

export default class Auth {
  public static authToken(req: any) {
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ')
      if (Object.is(parts.length, 2) && Object.is(parts[0], 'Bearer')) {
        return parts[1]
      }
    }
    return false
  }
  
  // 验证权限
  public static authIsVerified(req: any) {
    const token: string = Auth.authToken(req)
    if (token) {
      try {
        const decodedToken: any = jwt.verify(token, config.AUTH.jwtTokenSecret)
        if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
          return true
        }
      } catch (err) {
        console.log(err)
      }
    }
    return false
  }
}