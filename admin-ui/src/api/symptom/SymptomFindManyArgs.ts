import { SymptomWhereInput } from "./SymptomWhereInput";
import { SymptomOrderByInput } from "./SymptomOrderByInput";

export type SymptomFindManyArgs = {
  where?: SymptomWhereInput;
  orderBy?: SymptomOrderByInput;
  skip?: number;
  take?: number;
};
