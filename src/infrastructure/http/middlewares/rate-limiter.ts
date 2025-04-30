import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter Middleware
 * Limits the number of requests per IP in a specific time interval.
 * 
 * @param {number} windowMs - Time in milliseconds for the threshold interval.
 * @param {number} max - Maximum number of requests allowed per IP.
 * @returns {function} Rate limiting middleware.
 */
export function createRateLimiter(windowMs: number, max: number) {
    return rateLimit({
        windowMs,
        max,
        headers: true,
        handler: (req: Request, res: Response) => {
            res.status(429).json({
                title: 'Too Many Requests',
                status: 429,
                detail: 'You have exceeded the request limit. Please try again later.'
            });
        },
    });
};