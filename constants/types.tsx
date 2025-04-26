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
  fullName?: string;
  organisationName: string;
  email: string;
};

export type Enac = {
  email: string;
  fullName: string;
  id: string;
};

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
  imageURL?: string;
  date?: Date | null | string;
  companyId: string;
  isOpen: boolean;
}

//enacadmin@gmail.com
//UZ69X8wKIWhcPVvu0U442KLKdsl1
//fullName
