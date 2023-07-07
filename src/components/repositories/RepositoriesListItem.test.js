import { screen, render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

/*
jest.mock("../tree/FileIcon", () => {
    return function DummyFileIcon() {
        return "File Icon Component"
    };
});
*/

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "A declarative, efficient, and ",
    owner: { login: "facebook" },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return {...repository};
}

const pause = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};

test("show a link to the github homepage for this repository", async () => {
  const { html_url } = renderComponent();

  /*
    await act(async () => {
    await pause();
    });
  */

  await screen.findByRole("img", { name: "JavaScript" }); //act is not needed here
  const link = screen.getByRole("link",{
        name: /github repository/i
  });
  expect(link).toHaveAttribute("href", html_url);
});

test("show a link to the github homepage for this repository v2", async () => {

    const repository2 = {
        full_name: "facebook/ts",
        language: "TypeScript",
        description: "A declarative, efficient, and ",
        owner: { login: "facebook" },
        name: "ts",
        html_url: "https://github.com/facebook/ts",
      };

      render(
        <MemoryRouter>
          <RepositoriesListItem repository={repository2} />
        </MemoryRouter>
      );

    const { html_url } = repository2;

    await screen.findByRole("img", { name: "TypeScript" }); //act is not needed here
    const link = await screen.findByRole("link",{
          name: /github repository/i
    });
    expect(link).toHaveAttribute("href", html_url);
  });

test("show a fileicon with the approprite icon", async () => {
    renderComponent();
    const icon = await screen.findByRole("img", { name: "JavaScript" });
    expect(icon).toHaveClass("js-icon");
});

test("show a link to the code edtitor page", async () => {
    const {owner, full_name} =renderComponent();
    await screen.findByRole("img", { name: "JavaScript" });

    const link = await screen.findByRole("link", {
        name:  new RegExp(owner.login)
    });

    expect(link).toHaveAttribute("href", `/repositories/${full_name}`);
});
