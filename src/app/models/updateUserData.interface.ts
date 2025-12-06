export interface UpdateUserDataDto {
  name?: string;
  email?: string;
  assets?: string[];
  investorType?: string | null;
  contentType?: string[];
}
