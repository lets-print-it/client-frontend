export interface OAuthResponse {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  photo_url: string | null;
  auth_date: number;
  hash: string;
}
