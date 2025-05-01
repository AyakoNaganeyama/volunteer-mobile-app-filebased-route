import { View, Text } from "react-native";
import React from "react";

const categoriesArray = [
  "Community Services",

  "Emergency Response",

  "Human Rights",
  "LGBTIQA+",

  "Recreation",

  "Sport",
  "Tangata Whenua",
  "Veteran Services",
  "Young People",
];

const usegetImage = () => {
  const getImage = (category: string) => {
    if (category === "Animal Welfare") {
      return require("../../assets/images/opportunityImg/aminal.jpg");
    } else if (
      category === "Climate Strategy" ||
      category === "Environment & Conservation" ||
      category == "Disaster Relief"
    ) {
      return require("../../assets/images/opportunityImg/enviroment.jpg");
    } else if (
      category == "Drug & Alcohol Services" ||
      category == "Family Services" ||
      category == "Refugee and Migrant Support" ||
      category == "Homeless"
    ) {
      return require("../../assets/images/opportunityImg/family.jpg");
    } else if (
      category == "Disability Services" ||
      category == "Seniors & Aged Care"
    ) {
      return require("../../assets/images/opportunityImg/senior.jpg");
    } else if (category == "Covid-19" || category == "Health") {
      return require("../../assets/images/opportunityImg/health.jpg");
    } else if (
      category == "Education & Training" ||
      category == "Mental Health" ||
      category == "Mentoring & Advocacy"
    ) {
      return require("../../assets/images/opportunityImg/mentor.jpg");
    } else if (
      category == "Arts & Culture" ||
      category == "Museums & Heritage"
    ) {
      return require("../../assets/images/opportunityImg/art.jpg");
    } else if (category == "Food") {
      return require("../../assets/images/opportunityImg/bread.jpg");
    } else if (category == "Tech") {
      return require("../../assets/images/opportunityImg/Tech.jpg");
    } else if (category == "Admin") {
      return require("../../assets/images/opportunityImg/Admin.jpg");
    } else {
      return require("../../assets/images/opportunityImg/exampleImage.jpg");
    }
  };
  return { getImage };
};

export default usegetImage;
