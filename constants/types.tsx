export interface Filter {
  category: string;
  commitment: string;
  location: string;
}

export interface Volunteer {
  id: string; // The volunteer's unique identifier from firebase
  fullname: string; // The volunteer's full name
  email: string; // The volunteer's email address
}
