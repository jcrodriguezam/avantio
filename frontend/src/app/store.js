import * as models from "../models";
import { init } from "@rematch/core";

export const store = init({
  models,
  redux: {},
});
