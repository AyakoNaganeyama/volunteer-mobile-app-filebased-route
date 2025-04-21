// useRemoveOpportunity.ts
import { Opportunity } from "@/constants/types";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

const useRemoveOpportunity = () => {
  const deleteOpportunity = async (opp: Opportunity | null) => {
    if (!opp?.id) return;
    console.log("Deleting opportunity with id:", opp.id);

    // Get a DocumentReference and snapshot
    const docRef = doc(firestore, "opportunities", opp.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // .data() returns the document fields as an object
      console.log("Document data:", docSnap.data());
      // …now you can delete or otherwise process…
    } else {
      console.log("No such document!");
    }

    // (Later, call deleteDoc(docRef) and remove from your store)
  };

  return { deleteOpportunity };
};

export default useRemoveOpportunity;
