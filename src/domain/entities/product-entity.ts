export class ProductEntitie {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public stock: number;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(name: string, description: string, price: number, stock: number) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    private validate() {
        if (!this.name) { throw new Error('Name is required'); }
        if (!this.description) { throw new Error('Description is required'); }
        if (this.price <= 0) { throw new Error('Price must be greater than 0'); }
        if (this.stock < 0) { throw new Error('Stock cannot be negative'); }
    }

    public decreaseStock(quantity: number): void {
        if (quantity <= 0) { throw new Error('Quantity must be greater than 0'); }
        if (this.stock < quantity) { throw new Error('Insufficient stock'); }        
        this.stock -= quantity;
    }

    public increaseStock(quantity: number): void {
        if (quantity <= 0) { throw new Error('Quantity must be greater than 0'); }
        this.stock += quantity;
    }
}