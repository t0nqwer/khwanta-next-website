export const GET = async (req) => {
  try {
    return new Response(JSON.stringify("newPrompt"), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
