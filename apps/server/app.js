"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config = require("./config");
const Koa = require("koa");
const route_1 = require("./app/route");
const mongoose_1 = require("./app/lib/mongoose");
const middleware_1 = require("./app/middleware");
class App {
    constructor() {
        this.handlers = {};
        this.app = new Koa();
        this.connectDB();
        this.initMiddleware();
        this.bindRouter();
    }
    connectDB() {
        mongoose_1.default.connect();
        mongoose_1.default.loadPlugin();
    }
    initMiddleware() {
        middleware_1.middlewareList.forEach(middleware => this.app.use(this.requireMiddleware(middleware)));
    }
    requireMiddleware(path) {
        // 开发模式下，输出加载中间件链的日志
        if (process.env.NODE_ENV === 'development' || process.env.LOG_LEVEL) {
            console.log(`-> setup ${path}`);
        }
        const handler = require(`./app/middleware/${path}`);
        // 加载中间件
        if (handler.init) {
            handler.init(this.app);
        }
        return (this.handlers[path] = handler);
    }
    bindRouter() {
        route_1.default(this.app);
    }
}
exports.default = new App().app.listen(config.APP.PORT, () => {
    console.log(`Koa is listening in ${config.APP.PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQXlCO0FBQ3pCLG1DQUFrQztBQUNsQywyQkFBMEI7QUFDMUIsdUNBQW9DO0FBQ3BDLGlEQUFnRDtBQUVoRCxpREFBaUQ7QUFFakQ7SUFJRTtRQUZRLGFBQVEsR0FBUSxFQUFFLENBQUE7UUFHeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFTyxTQUFTO1FBQ2Ysa0JBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN6QixrQkFBZSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzlCLENBQUM7SUFFTyxjQUFjO1FBQ3BCLDJCQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUNqRCxDQUFBO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQixDQUFDLElBQVM7UUFDakMsb0JBQW9CO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUE7UUFDakMsQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUVuRCxRQUFRO1FBQ1IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVPLFVBQVU7UUFDaEIsZUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN0QixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQUMsQ0FBQSJ9