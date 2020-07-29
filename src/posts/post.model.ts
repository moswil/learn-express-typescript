import mongoose from 'mongoose';
import IPost from './post.interface';

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  title: String,
});

const postModel = mongoose.model<IPost & mongoose.Document>('Post', postSchema);

export default postModel;
