import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Volunteer } from "@/constants/types";
import { useVolunteerListStore } from "@/userStore/volusersArrayStore";

const useFetchVol = () => {
  const setVolunteers = useVolunteerListStore(
    (state) => state.setVolunteerList
  );
  const getVolList = async () => {
    try {
      const colRef = collection(firestore, "volunteer");
      const snap = await getDocs(colRef);

      const volunteers: Volunteer[] = snap.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Volunteer, "id">;
        return {
          id: docSnap.id,
          fullName: data.fullName,
          email: data.email,
        };
      });

      setVolunteers(volunteers);

      snap.docs.forEach((docSnap) => {
        // Log the entire volunteer data object
        console.log(`Volunteer [${docSnap.id}]:`, docSnap.data());
      });

      console.log();
    } catch (err) {
      console.error("Error fetching volunteers:", err);
    }
  };

  return { getVolList };
};

export default useFetchVol;
