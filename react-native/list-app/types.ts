export interface TUnsplashPhoto {
  alt_description: string;
  blur_hash: string;
  color: string;
  created_at: Date;
  current_user_collections: any[];
  description: null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: RootObjectLinks;
  promoted_at: null;
  sponsorship: null;
  tags: Tag[];
  topic_submissions: TopicSubmissions;
  updated_at: Date;
  urls: Urls;
  user: User;
  width: number;
}

export interface RootObjectLinks {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

export interface Tag {
  title: string;
  type: string;
}

export interface TopicSubmissions {}

export interface Urls {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

export interface User {
  accepted_tos: boolean;
  bio: string;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string;
  last_name: null;
  links: UserLinks;
  location: null;
  name: string;
  portfolio_url: string;
  profile_image: ProfileImage;
  social: Social;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  twitter_username: null;
  updated_at: Date;
  username: string;
}

export interface UserLinks {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

export interface ProfileImage {
  large: string;
  medium: string;
  small: string;
}

export interface Social {
  instagram_username: string;
  paypal_email: null;
  portfolio_url: string;
  twitter_username: null;
}

export type TFIlterArgs = {
  color: string;
  orientation: string;
  page: number
};
