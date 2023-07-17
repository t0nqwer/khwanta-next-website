import Product from "@model/product";
import { url } from "@utils/URL";
import { connectToDatabase } from "@utils/database";
import Fabric from "@model/fabric";
import Brand from "@model/brand";
import Category from "@model/category";

export const POST = async (request, { params }) => {
  const { id, code, name, fabric, price, description, detail, image, category, brand, size } = await request.json();
  try {
    await connectToDatabase();

    const isFabric = await Fabric.findOne({ id: fabric.id });
    const Fabricdata = isFabric
      ? isFabric
      : await Fabric.create({
          id: fabric.id,
          name: fabric.name,
        });

    const isBrand = await Brand.findOne({ name: brand });
    const Branddata = isBrand ? isBrand : await Brand.create({ name: brand });

    const isCategory = await Category.findOne({ name: category });
    const Categorydata = isCategory ? isCategory : await Category.create({ name: category });

    const newProduct = new Product({
      id,
      code,
      name,
      fabric: Fabricdata,
      price,
      description,
      detail,
      image,
      category: Categorydata,
      brand: Branddata,
      size,
    });

    await newProduct.save();

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
