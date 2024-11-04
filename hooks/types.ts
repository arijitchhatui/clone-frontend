//users

export interface UserProfilesEntity {
  userId: string;

  user: { email: string };
  fullName: string;
  username: string;
  bio: string;

  gender: string;

  pronouns: string;

  region: string;

  avatarURL: string;
  bannerURL: string;
  websiteURL: string;

  postCount: number;
  followerCount: number;
  followingCount: number;

  following: boolean;
  isOnline: boolean
}

export interface UpdateUserInput {
  username: string;
  website: string;
  bannerURL: string;
  pronouns: string;
  bio: string;
  avatarURL: string;
  websiteURL: string;
}

// posts

export interface PostsEntity {
  _id: string;
  userId: string;
  caption: string;
  imageURL: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isFollowing: boolean;
  shareCount: number;
  saveCount: number;
  createdAt: Date;
  user: UserProfilesEntity;
  comments?: CommentsEntity[];
  saves?: SavesEntity[];
}

export interface CreatePostInput {
  caption: string;
  imageURL: string;
}
export interface UpdatePostInput {
  caption: string;
}

export interface CommentPostInput {
  comment: string;
}

export interface CommentsEntity {
  _id: string;
  comment: string;
  user: UserProfilesEntity;
}

export interface SavesEntity {
  userId: string;
  postId: string;
  reelsId: string;
}
export interface FollowersEntity {
  followingUserId: string;
  followedUserId: string;
  createdAt: Date;
  deletedAt: Date;
}

export interface ChannelsEntity {
  _id: string;
  users: string[];
  receiver: UserProfilesEntity;
  lastMessage: {
    _id: string;
    message: string;
    createdAt: string;
  } | null;
}

export interface MessagesEntity {
  senderId: string;
  receiverId: string;
  channelId: string;
  message: string;
  imageURL: string | null;
  createdAt: Date;
  user: UserProfilesEntity;
}

export interface EditMessageInput {
  message: string;
  imageURL: string;
}
export interface MessageUserInput {
  receiverId: string;
  message: string;
}
