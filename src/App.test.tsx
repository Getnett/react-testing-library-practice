import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  console.log("Runs...Before Each Test ");
  render(<App />);
});
interface InputTypeValues {
  email?: string;
  password?: string;
  confirmPassword?: string;
}
const typeIntoForm = async ({
  email,
  password,
  confirmPassword,
}: InputTypeValues) => {
  const user = userEvent.setup();
  const inputElementEmail = screen.getByRole("textbox", { name: /email/i });
  const inputElementPassword = screen.getByLabelText("Password");
  const inputElementConfrimPassword = screen.getByLabelText("Confirm Password");

  if (email) {
    await user.type(inputElementEmail, email);
  }
  if (password) {
    await user.type(inputElementPassword, password);
  }
  if (confirmPassword) {
    await user.type(inputElementConfrimPassword, confirmPassword);
  }

  return {
    inputElementEmail,
    inputElementPassword,
    inputElementConfrimPassword,
  };
};

it("renders <App/>", () => {});

test("inputs initially should be empty", () => {
  const inputElementEmail = screen.getByRole("textbox");
  const inputElementPassword = screen.getByLabelText("Password");
  const inputElementConfrimPassword = screen.getByLabelText("Confirm Password");

  screen.debug();
  expect(inputElementEmail).toHaveValue("");
  expect(inputElementPassword).toHaveValue("");
  expect(inputElementConfrimPassword).toHaveValue("");
});

test("user ables to type in to the inputs", async () => {
  const { inputElementEmail } = await typeIntoForm({ email: "ex@mail.com" });
  const { inputElementPassword } = await typeIntoForm({ password: "12345" });
  const { inputElementConfrimPassword } = await typeIntoForm({
    confirmPassword: "12345",
  });

  expect(inputElementEmail).toHaveValue("ex@mail.com");
  expect(inputElementPassword).toHaveValue("12345");
  expect(inputElementConfrimPassword).toHaveValue("12345");
});

it("should show an error for invalid email", async () => {
  const user = userEvent.setup();
  const emailErrorMessage = screen.queryByText(/the email is invalid/i);
  const inputElementEmail = screen.getByRole("textbox", { name: /email/i });
  const submitBtn = screen.getByRole("button", { name: /submit/i });

  expect(emailErrorMessage).not.toBeInTheDocument();
  await user.type(inputElementEmail, "exmail.com");
  await user.click(submitBtn);
  const emailErrorMessageAfterTyping =
    screen.queryByText(/the email is invalid/i);
  expect(emailErrorMessageAfterTyping).toBeInTheDocument();
});

it("should show  email error when both email and password is error", async () => {
  const user = userEvent.setup();
  const inputElementEmail = screen.getByRole("textbox", { name: /email/i });
  const inputPassword = screen.getByLabelText("Password");
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  screen.debug();
  await user.type(inputElementEmail, "exmail.com");
  await user.type(inputPassword, "1234");
  await user.click(submitBtn);

  const emailErrorMessageAfterTypingErrorFirst =
    screen.queryByText(/the email is invalid/i);
  const passwordErrorMessageAfterTypingErrorFirst = screen.queryByText(
    /password should be at least 5 characters/i
  );

  expect(emailErrorMessageAfterTypingErrorFirst).toBeInTheDocument();
  expect(passwordErrorMessageAfterTypingErrorFirst).not.toBeInTheDocument();
});

test("when email is valid and password is invalid show error for password field", async () => {
  const user = userEvent.setup();
  const inputElementEmail = screen.getByRole("textbox", { name: /email/i });
  const inputPassword = screen.getByLabelText("Password");
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  screen.debug();
  await user.type(inputElementEmail, "ex@mail.com");
  await user.type(inputPassword, "1234");
  await user.click(submitBtn);
  const passwordErrorMessageAfterTypingErrorSecond = screen.queryByText(
    /password should be at least 5 characters/i
  );
  const emailErrorMessageAfterTypingErrorSecond =
    screen.queryByText(/the email is invalid/i);

  expect(emailErrorMessageAfterTypingErrorSecond).not.toBeInTheDocument();
  expect(passwordErrorMessageAfterTypingErrorSecond).toBeInTheDocument();
});

test("for matching password", async () => {
  const user = userEvent.setup();
  const inputElementEmail = screen.getByRole("textbox", { name: /email/i });
  const inputPassword = screen.getByLabelText("Password");
  const inputConfirmPassword = screen.getByLabelText("Confirm Password");
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  await user.type(inputElementEmail, "nice@mailer.com");
  await user.type(inputPassword, "12345");
  await user.type(inputConfirmPassword, "23456");
  await user.click(submitBtn);
  const confirmPasswordDoesntMatch = screen.queryByText(
    /passwords do not match/i
  );
  expect(confirmPasswordDoesntMatch).toBeInTheDocument();
});
