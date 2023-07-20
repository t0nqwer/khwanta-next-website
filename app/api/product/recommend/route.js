import { connectToDatabase } from "@utils/database";
import { url } from "@utils/URL";
import Product from "@model/product";
import Hero from "@model/hero";
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    const hero = await Hero.findOne()
      .select("_id recommend")
      .populate({ path: "recommend.product", populate: { path: "fabric" } });
    const arryOfObject = hero.recommend.map((item) => item.product.id);
    const data = await Product.find({ id: { $nin: arryOfObject } }).populate("category fabric");

    return new Response(JSON.stringify({ hero, data }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = await request.json();
  try {
    await connectToDatabase();
    const product = await Product.findById(id);
    const hero = await Hero.findOne();
    await Hero.updateOne({ _id: hero._id }, { $push: { recommend: { product: product } } });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const { id, arrid } = await request.json();
  try {
    console.log(id, arrid);
    await connectToDatabase();
    const product = await Product.findById(id);
    const hero = await Hero.findOne();
    await Hero.updateOne({ _id: hero._id }, { $pull: { recommend: { product: product } } });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
