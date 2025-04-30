import express from 'express';
import { createRateLimiter } from './infrastructure/http/middlewares/rate-limiter';
import { validateContentType } from './infrastructure/http/middlewares/validate-content-type';
import { requestLogger } from './infrastructure/http/middlewares/request-logger';
import productRouter from './infrastructure/http/routes/product-routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(requestLogger);
app.use(createRateLimiter(15 * 60 * 1000, 100));
app.use(validateContentType);

// Routes
app.use('/', productRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
