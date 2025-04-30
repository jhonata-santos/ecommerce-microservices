import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate the Content-Type of incoming requests.
 * Only allows requests with 'application/json' Content-Type.
 *
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export function validateContentType(req: Request, res: Response, next: NextFunction) {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(415).json({ 
            title: 'Unsupported Media Type',
            status: 415,
            detail: 'Unsupported Media Type. Only application/json is allowed.'
        });
    } else {
        next();
    }
}