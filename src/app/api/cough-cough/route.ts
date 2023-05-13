import { NextResponse, type NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import sendgrid from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY");
}

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: NextRequest) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const requestParams = await request.json();

  const sendTo = requestParams.to;
  const sendFrom = requestParams.from;
  const toName = requestParams.toName;
  const fromName = requestParams.fromName;
  const subject = "I am off sick today";

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `My name is ${fromName}. My manager's name is ${toName}.  Write me a professional excuse for calling in sick using my name to sign off and start the letter by addressing my manager.`,
      },
    ],
  });
  const response = completion.data.choices[0].message?.content;

  console.log(response);

  const msg = {
    To: sendTo,
    from: {
      email: "getarealjob@sicky.pro",
      name: sendFrom,
    },
    subject,
    replyTo: sendFrom,
    text: response,
  };
  // @ts-ignore
  await sendgrid.send(msg).catch((error) => {
    error.response.body.errors.forEach((err) => {
      console.log(err);
    });
  });

  return NextResponse.json({ success: true });
}
