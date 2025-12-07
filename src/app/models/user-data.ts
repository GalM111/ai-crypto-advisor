import { InvestorType } from './investor-type';

export interface UserData {
  _id: string; // MongoDB id
  name: string;
  email: string;
  assets: string[];
  investorType?: string | null;
  contentType: string[];
  createdAt?: string;
  likedContent?: string,
  dislikedContent?: string;
}
