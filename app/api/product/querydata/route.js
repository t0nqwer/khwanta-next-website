import { connectToDatabase } from "@utils/database";
import { url } from "@utils/URL";

export const GET = async (request, { params }) => {
  try {
    const response = await fetch(`${url}/web/getquerycode`);
    const data = await response.json();

    return new Response(JSON.stringify(data.code), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
