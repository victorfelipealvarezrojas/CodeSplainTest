import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("renders RepositoriesSummary component", () => {
  const mock = jest.fn();
  render(<RepositoriesSummary repository={mock} />);
  const linkElement = screen.getByText(/issues need help/i);
  expect(linkElement).toBeInTheDocument();
});

test("displays the primary lenguage of the repossitory", () => {
  const repository = {
    stargazers_count: 2,
    open_issues: 5,
    forks: 30,
    language: "JavaScript",
  };
  render(<RepositoriesSummary repository={repository} />);
  const lenguage = screen.getByText("JavaScript");
  expect(lenguage).toBeInTheDocument();
});

test("displays information about the repoitory", () => {
  const repository = {
    stargazers_count: 0,
    open_issues: 0,
    forks: 0,
    language: "JavaScript",
  };
  render(<RepositoriesSummary repository={repository} />);

  for(let key in repository){
    const value = repository[key];
    const element = screen.getByText(value);
    expect(element).toBeInTheDocument();
  }
});
