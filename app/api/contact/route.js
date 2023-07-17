import { connectToDatabase } from "@utils/database";
import About from "@model/about";
export const GET = async () => {
  try {
    await connectToDatabase();
    const about = await About.findOne({});
    return new Response(JSON.stringify(about), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch", { status: 500 });
  }
};
export const POST = async (req) => {
  try {
    await connectToDatabase();

    const { address, tel, email, facebook, instagram } = await req.json();
    console.log(address, tel, email, facebook, instagram);
    const about = {};
    if (address) about.address = address;
    if (tel) about.tel = tel;
    if (email) about.email = email;
    if (facebook) about.facebook = facebook;
    if (instagram) about.instagram = instagram;
    console.log(about);
    await About.findOneAndUpdate({}, about, { upsert: true });
    // const about = new About(req.body);
    return new Response(JSON.stringify(about), {
      setStatus: 200,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return new Response({ setStatus: 500, message: "error" });
  }
};
