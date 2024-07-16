import { User } from "./User";
import { Post } from "./Post";
import { Event } from "./Event";
import { PostLike } from './PostLike';
import { PostComment } from "./PostComment";
import { PostCommentLike } from './PostCommentLike';
import { EventLike } from './EventLike';
import { EventComment } from "./EventComment";
import { EventCommentLike } from "./EventCommentLike";
import { Rsvp } from './Rsvp';

export function sync() {
  // User.sync({ force: true });
  // Post.sync({ force: true });
  // Event.sync({ force: true });
  // PostLike.sync({ force: true });
  // PostComment.sync({ force: true });
  // EventLike.sync({ force: true });
  // EventComment.sync({ force: true });
  // Rsvp.sync({ force: true });
  EventCommentLike.sync({ alter: true });
  PostCommentLike.sync({ alter: true });
}
