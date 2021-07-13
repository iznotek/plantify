import { DirectionWhereInput } from "./DirectionWhereInput";
import { DirectionOrderByInput } from "./DirectionOrderByInput";

export type DirectionFindManyArgs = {
  where?: DirectionWhereInput;
  orderBy?: DirectionOrderByInput;
  skip?: number;
  take?: number;
};
