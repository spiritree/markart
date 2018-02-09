import * as config from "../../config";
import * as mongoose from "mongoose";
const mongoosePaginate = require("mongoose-paginate");

class mongooseConnect {
  public static connect(): void {
    require("mongoose").Promise = Promise;

    mongoose.connect(config.MONGODB.uri, { useMongoClient: true });

    mongoose.connection.on("error", error => {
      console.log("数据库连接失败!", error);
    });

    mongoose.connection.once("open", () => {
      console.log("数据库连接成功!");
    });
  }
  public static loadPlugin(): void {
    mongoosePaginate.paginate.options = {
      limit: config.APP.LIMIT
    };
  }
}

export default mongooseConnect;
