const mongoose = require("mongoose");
const Test = require("../models/Tests");

const testSeeder = () => {
  const db = mongoose.connection;

  db.once("open", () => {
    const testData = new Test({
      questions: [
        {
          title:
            "You’re really busy at work and a colleague is telling you their life story and personal woes. You:",
          answers: [
            {
              title: "Don’t dare to interrupt them",
              weight: 0,
            },
            {
              title:
                "Think it’s more important to give them some of your time; work can wait",
              weight: 4,
            },
            {
              title: "Listen, but with only with half an ear",
              weight: 8,
            },
            {
              title:
                "Interrupt and explain that you are really busy at the moment",
              weight: 12,
            },
          ],
        },
        {
          title:
            "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:",
          answers: [
            {
              title: "Don’t dare contradict them",
              weight: 0,
            },
            {
              title: "Think that they are obviously right",
              weight: 4,
            },
            {
              title: "Defend your own point of view, tooth and nail",
              weight: 8,
            },
            {
              title: "Continuously interrupt your colleague",
              weight: 12,
            },
          ],
        },
        {
          title: "You are taking part in a guided tour of a museum. You:",
          answers: [
            {
              title:
                "Are a bit too far towards the back so don’t really hear what the guide is saying",
              weight: 0,
            },
            {
              title: "Follow the group without question",
              weight: 4,
            },
            {
              title: "Make sure that everyone is able to hear properly",
              weight: 8,
            },
            {
              title:
                "Are right up the front, adding your own comments in a loud voice",
              weight: 12,
            },
          ],
        },
        {
          title:
            "During dinner parties at your home, you have a hard time with people who:",
          answers: [
            {
              title: "Ask you to tell a story in front of everyone else",
              weight: 12,
            },
            {
              title: "Talk privately between themselves",
              weight: 0,
            },
            {
              title: "Hang around you all evening",
              weight: 8,
            },
            {
              title: "Always drag the conversation back to themselves",
              weight: 4,
            },
          ],
        },
      ],
      scores: [
        {
          minAverageScore: 0,
          maxAverageScore: 5,
          description: "You are an introvert",
        },
        {
          minAverageScore: 6,
          maxAverageScore: 12,
          description: "You are an extrovert",
        },
      ],
    });

    testData.save((err) => {
      if (err) {
        return console.error(err);
      }

      console.log("Test saved to collection.");
    });
  });
};

module.exports = testSeeder;
