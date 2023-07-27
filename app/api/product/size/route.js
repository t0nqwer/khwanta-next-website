import { connectToDatabase } from "@utils/database";
import { url } from "@utils/URL";
import Product from "@model/product";
import Hero from "@model/hero";
export const PUT = async (request, { params }) => {
  const { size, id } = await request.json();
  try {
    console.log(id, size);
    await connectToDatabase();
    await Product.updateOne({ id: id }, { size: size });
    const find = await Product.findOne({ id: id });

    return new Response(JSON.stringify(find), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
