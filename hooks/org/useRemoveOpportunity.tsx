// useRemoveOpportunity.ts
import { Opportunity } from "@/constants/types";

const useRemoveOpportunity = () => {
  const deleteOpportunity = (opp: Opportunity | null) => {
    console.log("Deleting opportunity with id:", opp?.id);
    // …later I’ll remove it from your store…
  };

  return { deleteOpportunity };
};

export default useRemoveOpportunity;
