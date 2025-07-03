import { Request, Response } from 'express';
import ProductModel from '../../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;

    const product = new ProductModel({
      name,
      price,
      description,
      createdBy: (req as any).user.id,
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};