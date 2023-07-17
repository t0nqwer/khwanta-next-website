import { connectToDatabase } from "@utils/database";
import Product from "@model/product";
export const PUT = async (request, { params }) => {
  const { name } = await request.json();
  try {
    console.log(name);
    await connectToDatabase();
    const data = await Product.updateOne({ _id: params.id }, { name: name });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
