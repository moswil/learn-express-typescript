import { Router, Request, Response, NextFunction } from 'express';

import IController from '../interfaces/controller.interface';
import postModel from './post.model';
import Post from './post.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import catchAsync from '../utils/catchAsync';
import { postValidator } from './post.validators';
import { validation as postValidationResult } from '../middleware/validation.middleware';

export default class PostsController implements IController {
  public path = '/posts';
  public router = Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, postValidator, postValidationResult, this.createPost);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.patch(`${this.path}/:id`, postValidator, postValidationResult, this.modifyPost);
  }

  private getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const posts = await this.post.find();
    res.status(200).json(posts);
  });

  private getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const post = await this.post.findById(id);
    if (!post) {
      return next(new PostNotFoundException(id));
    }
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  });

  private deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const post = await this.post.findByIdAndDelete(id);
    if (!post) {
      return next(new PostNotFoundException(id));
    }
    res.status(204);
  });

  private modifyPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const postData: Post = req.body;
    const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
    if (!post) {
      return next(new PostNotFoundException(id));
    }
    res.status(200).json(post);
  });

  private createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postData: Post = req.body;
    const post = await this.post.create(postData);
    res.status(200).json(post);
  });
}
