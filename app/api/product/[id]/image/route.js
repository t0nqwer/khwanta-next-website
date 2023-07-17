import { connectToDatabase } from "@utils/database";
import Product from "@model/product";

export const PUT = async (request, { params }) => {
  const { image } = await request.json();
  try {
    await connectToDatabase();
    console.log(image);
    const data = await Product.updateOne({ _id: params.id }, { image: image }).select("image");
    if (data.acknowledged === true) {
      const res = await Product.findOne({ _id: params.id }).select("image");
      return new Response(JSON.stringify(res), { status: 201 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
