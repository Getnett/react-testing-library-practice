import { render, screen, waitFor } from "@testing-library/react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import { act } from "react-dom/test-utils";
import FocusableInput from "./FocusComponent";

// const server = setupServer(
//   rest.get('/greeting', (_req, res, ctx) => {
//     return res(ctx.json({greeting: 'hello there'}))
//   }),
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

it("renders input element  ", () => {
  render(<FocusableInput shouldFocus={true} />);
});

// it("renders input element focused on first render ", () => {
//   render(<FocusableInput shouldFocus={true} />);
//   const elementInput = screen.findByRole("input");
//   expect(elementInput).toHaveFocus;
// });

it("renders list item with name paris ", async () => {
  render(<FocusableInput shouldFocus={true} />);
  //await waitFor(() => screen.getAllByText('Paris'))
  const elementInput = await screen.findByTestId("first-data");
  screen.debug();
  expect(elementInput).toBeInTheDocument();
});
