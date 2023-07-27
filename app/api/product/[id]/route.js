import { connectToDatabase } from "@utils/database";
import Product from "@model/product";
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    const data = await Product.findOne({ _id: params.id }).populate("category fabric brand");
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  const { image, description, detail } = await request.json();
  try {
    console.log(params.id);
    await connectToDatabase();
    const data = await Product.updateOne(
      { _id: params.id },
      { image: image, description: description, detail: detail }
    );
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    console.log(params.id);
    await connectToDatabase();
    const data = await Product.deleteOne({ _id: params.id });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
