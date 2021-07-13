import { HeatWhereInput } from "./HeatWhereInput";
import { HeatOrderByInput } from "./HeatOrderByInput";

export type HeatFindManyArgs = {
  where?: HeatWhereInput;
  orderBy?: HeatOrderByInput;
  skip?: number;
  take?: number;
};
