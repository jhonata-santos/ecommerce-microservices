import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to log incoming requests.
 *
 * Logs the HTTP method, URL, and timestamp of each request.
 *
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;
    const start = process.hrtime();
    let responseBody: any;
    const originalEnd = res.end.bind(res);
    
    res.end = (chunk?: any, encodingOrCallback?: BufferEncoding | (() => void), callback?: () => void) => {
        if (chunk) {
            try {
                responseBody = JSON.parse(chunk.toString());
            } catch {
                responseBody = chunk.toString();
            }
        }

        if (typeof encodingOrCallback === 'function') {
            return originalEnd(chunk, encodingOrCallback);
        }

        const safeEncoding: BufferEncoding = encodingOrCallback || 'utf8';
        return originalEnd(chunk, safeEncoding, callback);
    };

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
        const statusColor = (res.statusCode >= 200 && res.statusCode < 300) ? '\x1b[32m' : '\x1b[31m';

        console.log(`${statusColor}================= START REQUEST ================= `);
        console.log(`Method: ${method}`);
        console.log(`Url: ${req.protocol}://${req.hostname}:${req.socket.localPort}${url}`);
        console.log(`Status Code: ${res.statusCode} - ${responseTime}ms`);
        console.log(`Headers: \n${JSON.stringify(req.headers, null, 2)}`);
        console.log(`Body: \n${responseBody ? JSON.stringify(responseBody, null, 2) : 'No response body'}`);
        console.log(`================== END REQUEST ================== \x1b[0m`);
    });

    next();
}