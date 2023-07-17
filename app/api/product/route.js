import Product from "@model/product";
import { url } from "@utils/URL";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const query = searchParams.get("query") || "";
  const search = searchParams.get("search") || "";
  console.log(page);
  try {
    await connectToDatabase();
    const data = await Product.find().populate("category fabric");
    console.log(data);

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
