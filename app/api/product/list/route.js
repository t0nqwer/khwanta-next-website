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
    const data = await Product.find().select("id");

    const filter = data ? data.map((e) => +e.id) : [];
    const response = await fetch(`${url}/web/NewWeb?search=${search}&page=${page}&query=${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    });
    const data1 = await response.json();

    return new Response(JSON.stringify(data1), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
