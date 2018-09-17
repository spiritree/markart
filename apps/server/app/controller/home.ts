import { Controller, Get } from 'trafficlight'
import { HomeService } from '../service/home'

@Controller('/')
export default class HomeController {
  @Get('')
  public getInfo(): Object {
    return HomeService.info()
  }
}
