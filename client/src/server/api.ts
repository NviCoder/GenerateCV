import { remultExpress } from "remult/remult-express"
import { Resume } from "../shared/Resume"

export const api = remultExpress({
  entities: [Resume]
})
