import { Request, Response } from 'express';
import { ProductRequestDto } from '../../../application/dtos/product-request-dto';
import { ProductResponseDto } from '../../../application/dtos/product-response-dto';
import { ProductUseCase } from '../../../application/use-cases/product-use-case';

export class ProductController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const productRequetDto: ProductRequestDto = req.body;
            const productResponseDto: ProductResponseDto = await new ProductUseCase().create(productRequetDto);
            res.status(201).json({ data: productResponseDto });    
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // public async readAll(req: Request, res: Response): Promise<void> {
    //     // const products = await this.useCase.getAll();
    //     res.status(200).json({ message: 'Products listed successfully' });
    // }

    // public async read(req: Request, res: Response): Promise<void> {
    //     // const product = await this.useCase.get(req.params.id);
    //     res.status(200).json({ message: 'Product show successfully' });
    // }

    // public async updateAll(req: Request, res: Response): Promise<void> {
    //     // const product = new Product(req.body.id, req.body.name, req.body.description, req.body.price, req.body.stock);
    //     // await this.useCase.update(product);
    //     res.status(200).json({ message: 'Product updated successfully' });
    // }

    // public async updatePartial(req: Request, res: Response): Promise<void> {
    //     // const product = new Product(req.body.id, req.body.name, req.body.description, req.body.price, req.body.stock);
    //     // await this.useCase.update(product);
    //     res.status(200).json({ message: 'Product partial updated successfully' });
    // }

    // public async delete(req: Request, res: Response): Promise<void> {
    //     // await this.useCase.delete(req.params.id);
    //     res.status(200).json({ message: 'Product deleted successfully' });
    // }

    // public async deleteAll(req: Request, res: Response): Promise<void> {
    //     // await this.useCase.deleteAll();
    //     res.status(200).json({ message: 'All products deleted successfully' });
    // }
}

export default ProductController;