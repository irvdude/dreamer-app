//import dotenv to access env vars in .env
import * as dotenv from "dotenv";
dotenv.config();

//imports config and openaiapi from openai
import OpenAI from "openai";

//new open ai config obj
// const configuration = new Configuration({
//   //access openai key env var
//   apiKey: process.env.OPENAI,
// });

//inits OpenAI SDK
const openai = new OpenAI({ apiKey: process.env.OPENAI });

//import expressjs
import express from "express";
//import cors (cross origin resoruce sharing)
import cors from "cors";

//app for express
const app = express();
//express app uses cors
app.use(cors());
//express uses express.json()
app.use(express.json());

//creates post request async-ly to /dream endpoint
//req meaning "request" res meaning "response"
app.post("/dream", async (req, res) => {
  //prompt requests the body of the prompt of user desc of image
  try {
    const prompt = req.body.prompt;

    //prompt- is an argument in aiResponse to generate image based on user prompt
    //await ensures that code is ran after image is generated
    //n only gens 1 image
    //size is resolution of image
    const aiResposne = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    //image grabs generated image url
    const image = aiResposne.data[0].url;
    //res.send sends the image as a response to user
    res.send({ image });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

//starts up server using port 8080 and callback fn logs server is starting
app.listen(8080, () => console.log("make art on http://localhost:8080/dream"));
