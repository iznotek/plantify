import { Symptom as TSymptom } from "../api/symptom/Symptom";

export const SYMPTOM_TITLE_FIELD = "name";

export const SymptomTitle = (record: TSymptom) => {
  return record.name;
};
