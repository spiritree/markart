import * as config from '../../config'

export class HomeService {
  public static info(): object {
    return config.INFO
  }
}
