import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "../../routes/HomeRoute";
import { expect } from "@playwright/test";
import { createServer } from "../../test/server";

createServer([
  {
    path: "/api/repositories",
    methosd: "get",
    res: (req, res, ctx) => {
      //requeest interceptado, corresponde a la solicitud de get a los repositorios de API.
      const language = req.url.searchParams.get("q").split("language:")[1];
      //desponse interceptado
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 1, full_name: `${language}_two` },
          { id: 1, full_name: `${language}_tree` },
        ],
      };
    },
  },
]);

test("renders two links for each lenguage", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );
  // await pause();
  // screen.debug();
  const languages = [
    "Javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  languages.forEach(async (language) => {
    const link = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(link).toHaveLength(3);
    expect(link[0]).toHaveeTextContent(`${language}_one`);
    expect(link[0]).toHaveeTextContent(`${language}_two`);
    expect(link[0]).toHaveeTextContent(`${language}_tree`);
    //href
    expect(link[0].getAttribute("href")).toEqual(`/repositories/${language}_one`);
    expect(link[1].getAttribute("href")).toEqual(`/repositories/${language}_two`);
    expect(link[2].getAttribute("href")).toEqual(`/repositories/${language}_tree`);
  });
});
