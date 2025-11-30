import { connectDB } from "@/lib/db";
import Lesson from "@/models/Lesson";

export async function GET(req) {
  await connectDB();

  try {
    // Check if sample lesson exists
    let lesson = await Lesson.findOne({ isSample: true });

    // If no sample lesson exists, create one
    if (!lesson) {
      lesson = new Lesson({
        title: "Greetings and Introductions",
        description: "Learn basic English greetings and how to introduce yourself.",
        level: "beginner",
        category: "Vocabulary",
        isSample: true,
        content: {
          introduction:
            "In this lesson, you'll learn essential greetings and how to introduce yourself in English. These are the first words you'll need when meeting someone new!",
          mainContent: [
            {
              heading: "Basic Greetings",
              text: "The most common greetings in English are:",
              example:
                '"Hello" - The most universal greeting\n"Hi" - Casual and friendly\n"Good morning" - Used before 12 PM\n"Good afternoon" - Used after 12 PM\n"Good evening" - Used after 5 PM',
            },
            {
              heading: "How to Introduce Yourself",
              text: "When meeting someone new, you should introduce yourself. Here are common ways to do it:",
              example:
                '"My name is John." - Simple introduction\n"I\'m Sarah." - Casual way\n"Nice to meet you." - After introducing yourself\n"What\'s your name?" - Asking for someone\'s name',
            },
            {
              heading: "Polite Responses",
              text: "Always respond politely when someone greets you or introduces themselves.",
              example:
                '"Nice to meet you too." - When someone says nice to meet you\n"Pleased to meet you." - More formal\n"Good to see you." - When meeting someone you know',
            },
          ],
          summary:
            "Remember: Greetings are the foundation of all conversations. Practice saying these phrases aloud to get comfortable with pronunciation!",
        },
        vocabulary: [
          {
            word: "Hello",
            bengaliMeaning: "হ্যালো",
            example: 'Hello, how are you?',
          },
          {
            word: "Greeting",
            bengaliMeaning: "স্বাগত / অভিবাদন",
            example: "A warm greeting can start a good conversation.",
          },
          {
            word: "Introduce",
            bengaliMeaning: "পরিচয় করান / পরিচয় দেওয়া",
            example: "Let me introduce you to my friend.",
          },
          {
            word: "Name",
            bengaliMeaning: "নাম",
            example: "What is your name?",
          },
          {
            word: "Nice",
            bengaliMeaning: "সুন্দর / ভালো / আনন্দদায়ক",
            example: "Nice to meet you!",
          },
        ],
      });

      await lesson.save();
    }

    return Response.json(lesson, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
