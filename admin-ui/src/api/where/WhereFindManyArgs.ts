import { WhereWhereInput } from "./WhereWhereInput";
import { WhereOrderByInput } from "./WhereOrderByInput";

export type WhereFindManyArgs = {
  where?: WhereWhereInput;
  orderBy?: WhereOrderByInput;
  skip?: number;
  take?: number;
};
