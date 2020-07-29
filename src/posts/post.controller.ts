import { Router, Request, Response } from 'express';

import IController from '../interfaces/controller.interface';
import Logger from '../utils/logger';
import postModel from './post.model';
import Post from './post.interface';

export default class PostsController implements IController {
  public path = '/posts';
  public router = Router();
  private post = postModel;
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createPost);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.patch(`${this.path}/:id`, this.modifyPost);
  }

  private getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await this.post.find();
      res.status(200).json(posts);
    } catch (error) {
      this.logger.log('error', error);
    }
  };

  private getPostById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const post = await this.post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      this.logger.log('error', error);
    }
  };

  private deletePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const post = await this.post.findByIdAndDelete(id);
      if (post) {
        res.status(204);
      } else {
        res.status(404);
      }
    } catch (error) {
      this.logger.log('error', error);
    }
  };

  private modifyPost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const postData: Post = req.body;
      const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
      res.status(200).json(post);
    } catch (error) {
      this.logger.log('error', error);
    }
  };

  private createPost = async (req: Request, res: Response) => {
    try {
      const postData: Post = req.body;
      const post = await this.post.create(postData);
      res.status(200).json(post);
    } catch (error) {
      this.logger.log('error', error);
    }
  };
}
