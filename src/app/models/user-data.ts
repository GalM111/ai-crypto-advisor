import { InvestorType } from './investor-type';

export interface UserData {
  _id: string; // MongoDB id
  name: string;
  email: string;
  assets: string[];
  // use the InvestorType enum
  investorType?: string | null;
  contentType: string[];
  createdAt?: string;
  likedContent?: string,
  dislikedContent?: string;
}
