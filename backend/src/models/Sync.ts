import { User } from "./User";
import { Post } from "./Post";
import { Event } from "./Event";
import { PostLike } from './PostLike';
import { PostComment } from "./PostComment";
import { EventLike } from './EventLike';
import { EventComment } from "./EventComment";
import { Rsvp } from './Rsvp';

Rsvp.sync({ force: true });
PostLike.sync({ force: true });
EventLike.sync({ force: true });
EventComment.sync({ force: true });
PostComment.sync({ force: true });
Post.sync({ force: true });
Event.sync({ force: true });
User.sync({ force: true });
