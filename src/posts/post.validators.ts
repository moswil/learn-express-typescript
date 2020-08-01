import { check } from 'express-validator';

export const postValidator = [
  check('author')
    .trim()
    .notEmpty()
    .withMessage('Author name is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Author name should be 5 to 50 characters long'),
  check('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 15 })
    .withMessage('Content should be at least 10 characters long'),
  check('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 10 })
    .withMessage('The title should be at least 10 characters long'),
];
