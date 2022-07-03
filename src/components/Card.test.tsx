import { render, screen } from "@testing-library/react";
import Card from "./Card";

const defaultCardProps = {
  name: "Lilly",
  phone: "111-111-1111",
  email: "peter@mailer.com",
  image: {
    src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
    alt: "Cat",
  },
  favoured: false,
};
describe("Testing The Card Component", () => {
  test("render <Card/> component with name prop", () => {
    render(<Card {...defaultCardProps} />);
    expect(screen.getByRole("heading", { name: /Lilly/i })).toBeInTheDocument();
  });
  test("render <Card/> component with phone prop", () => {
    render(<Card {...defaultCardProps} />);
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });
  test("render <Card/> component with email prop", () => {
    render(<Card {...defaultCardProps} />);
    expect(screen.getByText(/peter@mailer.com/i)).toBeInTheDocument();
  });
  test("render <Card/> component with image prop", () => {
    render(<Card {...defaultCardProps} />);
    expect(screen.queryByAltText(/Cat/i)).toBeInTheDocument();
  });

  test("render <Card/> component with favoured prop value false to show outlined heart", () => {
    render(<Card {...defaultCardProps} />);
    expect(screen.queryAllByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryAllByAltText(/filled heart/i)).not.toBeInTheDocument();
  });
  test("render <Card/> component with favoured prop value true to show outlined heart", () => {
    render(<Card {...defaultCardProps} favoured={true} />);
    expect(screen.queryAllByAltText(/filled heart/i)).toBeInTheDocument();
    expect(screen.queryAllByAltText(/outlined heart/i)).not.toBeInTheDocument();
  });
});
