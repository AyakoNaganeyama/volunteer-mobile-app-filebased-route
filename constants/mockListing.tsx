export interface Opportunity {
  id: string;
  title: string;
  companyName: string;
  description: string;
  isApproved: boolean;
  location: string;
  category: string;
  commitmentPeriod: string;
  registrationFormUrl: string;
  imageURL: any;
  datePosted: string; // Added datePosted property
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Cleanup Volunteer",
    companyName: "Green Earth Initiative",
    description: "Help clean up parks and streets in your local community.",
    isApproved: true,
    location: "Auckland CBD",
    category: "Environment & Conservation",
    commitmentPeriod: "One off - an event",
    registrationFormUrl: "https://example.com/register/cleanup",
    imageURL: require("../assets/images/exampleImage.jpg"),
    datePosted: "2023-03-01", // Example date
  },
  {
    id: "2",
    title: "Food Bank Assistant",
    companyName: "Hope Food Bank",
    description:
      "Assist in sorting, packing, and distributing food to those in need.",
    isApproved: true,
    location: "North Shore",
    category: "Human Rights",
    commitmentPeriod: "One off - a few hours",
    registrationFormUrl: "https://example.com/register/foodbank",
    imageURL: require("../assets/images/exampleImage.jpg"),
    datePosted: "2023-03-02",
  },
  {
    id: "3",
    title: "Youth Mentor",
    companyName: "Future Leaders Program",
    description:
      "Guide and mentor young students to help them develop leadership skills.",
    isApproved: false,
    location: "Online or Remote",
    category: "Education & Training",
    commitmentPeriod: "Regular - less than 6 months",
    registrationFormUrl: "https://example.com/register/youthmentor",
    imageURL: require("../assets/images/exampleImage.jpg"),
    datePosted: "2023-03-03",
  },
  {
    id: "4",
    title: "Animal Shelter Helper",
    companyName: "Paws & Claws Rescue",
    description:
      "Assist in taking care of rescued animals and helping with adoptions.",
    isApproved: true,
    location: "East Auckland",
    category: "Animal Welfare",
    commitmentPeriod: "Regular - more than 6 months",
    registrationFormUrl: "https://example.com/register/animalshelter",
    imageURL: require("../assets/images/exampleImage.jpg"),
    datePosted: "2023-03-04",
  },
  {
    id: "5",
    title: "Event Coordinator",
    companyName: "Charity Events NZ",
    description:
      "Plan and coordinate fundraising events for various charitable causes.",
    isApproved: true,
    location: "Auckland CBD",
    category: "Event Planning",
    commitmentPeriod: "One off - an event",
    registrationFormUrl: "https://example.com/register/eventcoordinator",
    imageURL: require("../assets/images/exampleImage.jpg"),
    datePosted: "2023-03-05",
  },
  {
    id: "6",
    title: "Tech Support Volunteer",
    companyName: "Digital Inclusion Initiative",
    description:
      "Help seniors and underserved communities learn basic digital skills.",
    isApproved: false,
    location: "Online or Remote",
    category: "Technology",
    commitmentPeriod: "Regular - less than 6 months",
    registrationFormUrl: "https://example.com/register/techsupport",
    imageURL: require("../assets/images/exampleImage.jpg"),
    datePosted: "2023-03-06",
  },
  {
    id: "7",
    title: "Sports Coach Volunteer",
    companyName: "Youth Sports Academy",
    description:
      "Coach young athletes in basketball and soccer to promote active lifestyles.",
    isApproved: true,
    location: "West Auckland",
    category: "Sports & Recreation",
    commitmentPeriod: "Regular - more than 6 months",
    registrationFormUrl: "https://example.com/register/sportscoach",
    imageURL: require("../assets/images/exampleImage.jpg"),
    datePosted: "2023-03-07",
  },
];
