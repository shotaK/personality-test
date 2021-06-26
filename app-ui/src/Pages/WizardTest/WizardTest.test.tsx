import { rest } from "msw";
import { setupServer } from "msw/node";
import { waitFor, fireEvent } from "@testing-library/react";

import renderWithStore from "Utils/Test/renderWithStore";

import WizardTest from ".";
import apiUrls from "Config/api-urls";

const server = setupServer(
  rest.get(`${apiUrls.api.host}${apiUrls.api.tests.base}`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: "60d6ea532e24806dbee98302",
          questions: [
            {
              _id: "60d6ea532e24806dbee98303",
              title:
                "You’re really busy at work and a colleague is telling you their life story and personal woes. You:",
              answers: [
                {
                  _id: "60d6ea532e24806dbee98304",
                  title: "Don’t dare to interrupt them",
                  weight: 0,
                },
                {
                  _id: "60d6ea532e24806dbee98305",
                  title:
                    "Think it’s more important to give them some of your time; work can wait",
                  weight: 4,
                },
                {
                  _id: "60d6ea532e24806dbee98306",
                  title: "Listen, but with only with half an ear",
                  weight: 8,
                },
                {
                  _id: "60d6ea532e24806dbee98307",
                  title:
                    "Interrupt and explain that you are really busy at the moment",
                  weight: 12,
                },
              ],
            },
            {
              _id: "60d6ea532e24806dbee98308",
              title:
                "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:",
              answers: [
                {
                  _id: "60d6ea532e24806dbee98309",
                  title: "Don’t dare contradict them",
                  weight: 0,
                },
                {
                  _id: "60d6ea532e24806dbee9830a",
                  title: "Think that they are obviously right",
                  weight: 4,
                },
                {
                  _id: "60d6ea532e24806dbee9830b",
                  title: "Defend your own point of view, tooth and nail",
                  weight: 8,
                },
                {
                  _id: "60d6ea532e24806dbee9830c",
                  title: "Continuously interrupt your colleague",
                  weight: 12,
                },
              ],
            },
            {
              _id: "60d6ea532e24806dbee9830d",
              title: "You are taking part in a guided tour of a museum. You:",
              answers: [
                {
                  _id: "60d6ea532e24806dbee9830e",
                  title:
                    "Are a bit too far towards the back so don’t really hear what the guide is saying",
                  weight: 0,
                },
                {
                  _id: "60d6ea532e24806dbee9830f",
                  title: "Follow the group without question",
                  weight: 4,
                },
                {
                  _id: "60d6ea532e24806dbee98310",
                  title: "Make sure that everyone is able to hear properly",
                  weight: 8,
                },
                {
                  _id: "60d6ea532e24806dbee98311",
                  title:
                    "Are right up the front, adding your own comments in a loud voice",
                  weight: 12,
                },
              ],
            },
            {
              _id: "60d6ea532e24806dbee98312",
              title:
                "During dinner parties at your home, you have a hard time with people who:",
              answers: [
                {
                  _id: "60d6ea532e24806dbee98313",
                  title: "Ask you to tell a story in front of everyone else",
                  weight: 12,
                },
                {
                  _id: "60d6ea532e24806dbee98314",
                  title: "Talk privately between themselves",
                  weight: 0,
                },
                {
                  _id: "60d6ea532e24806dbee98315",
                  title: "Hang around you all evening",
                  weight: 8,
                },
                {
                  _id: "60d6ea532e24806dbee98316",
                  title: "Always drag the conversation back to themselves",
                  weight: 4,
                },
              ],
            },
          ],
          scores: [
            {
              _id: "60d6ea532e24806dbee98317",
              minAverageScore: 0,
              maxAverageScore: 5,
              description: "You are an introvert",
            },
            {
              _id: "60d6ea532e24806dbee98318",
              minAverageScore: 6,
              maxAverageScore: 12,
              description: "You are an extrovert",
            },
          ],
          __v: 0,
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home page", () => {
  test("default home page", async () => {
    const { queryByTestId, getByLabelText, getByTestId } = renderWithStore(
      <WizardTest />
    );

    await waitFor(() =>
      expect(queryByTestId("action-next")).toBeInTheDocument()
    );
    expect(queryByTestId("action-previous")).not.toBeInTheDocument();
    expect(queryByTestId("action-finish")).not.toBeInTheDocument();

    fireEvent.click(getByLabelText("Listen, but with only with half an ear"));
    fireEvent.change(getByLabelText("Listen, but with only with half an ear"), {
      target: { value: "60d6ea532e24806dbee98304" },
    });

    const labelRadio: Partial<HTMLInputElement> = getByLabelText(
      "Listen, but with only with half an ear"
    );

    expect(labelRadio.checked).toEqual(true);

    fireEvent.click(getByTestId("action-next"));
    fireEvent.click(getByTestId("action-previous"));

    expect(labelRadio.checked).toEqual(true);

    fireEvent.click(getByTestId("action-next"));
    fireEvent.click(getByTestId("action-next"));
    fireEvent.click(getByTestId("action-next"));
    expect(queryByTestId("action-finish")).toBeInTheDocument();
  });
});
