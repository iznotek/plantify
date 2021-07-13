import { ElementWhereInput } from "./ElementWhereInput";
import { ElementOrderByInput } from "./ElementOrderByInput";

export type ElementFindManyArgs = {
  where?: ElementWhereInput;
  orderBy?: ElementOrderByInput;
  skip?: number;
  take?: number;
};
