export interface Filter {
  category: string;
  commitment: string;
  location: string;
}

export type Volunteer = {
  id: string;
  fullName: string;
  email: string;
};

export type Organisation = {
  id: string;
  fullName: string;
  organisationName: string;
  email: string;
};
