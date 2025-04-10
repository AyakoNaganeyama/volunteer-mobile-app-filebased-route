import { View, Text } from "react-native";
import React from "react";
import { authentication, firestore } from "../../firebaseConfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Volunteer } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVolunteerStore } from "@/userStore/volSore";
import { useEffect } from "react";

const useSignup = () => {
  return (
    <View>
      <Text>useSignup</Text>
    </View>
  );
};

export default useSignup;
