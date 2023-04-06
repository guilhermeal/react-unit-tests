import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

/* TESTE SIMPLES DE TELA 
test("sum", () => {
  expect(2 * 2).toBe(4);
});

test("HelloWorld", () => {
  const { getByText } = render(<App />);

  expect(getByText("Hello World")).toBeInTheDocument();
 });

test("Has Title", () => {
  const { getByText } = render(<App />);

  expect(getByText("Hello World")).toHaveAttribute("class", "title");
});

*/

describe("List Component", () => {
  it("should render list items", () => {
    const { getByText } = render(
      <List initialItems={["Guilherme", "Allan", "Xavier", "Almeida"]} />
    );

    expect(getByText("Guilherme")).toBeInTheDocument();
    expect(getByText("Allan")).toBeInTheDocument();
    expect(getByText("Xavier")).toBeInTheDocument();
    expect(getByText("Almeida")).toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText, debug } = render(
      <List initialItems={[]} />
    );
    const textAddButton = "Adicionar";
    const newName = "Jeremias";

    const addButton = getByText(textAddButton);
    const inputElement = getByPlaceholderText("Novo nome");

    expect(addButton).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();

    await userEvent.type(inputElement, newName);
    await userEvent.click(addButton);

    // FORMA FEITA ANTES - SEM DELAY (SETIMEOUT) QUE SIMULA RESPOSTA DO BACKEND
    // expect(getByText(newName)).toBeInTheDocument();

    // FORMA FEITA DEPOIS - COM DELAY (SETIMEOUT) QUE SIMULA RESPOSTA DO BACKEND
    await waitFor(() => {
      expect(getByText(newName)).toBeInTheDocument();
    });
  });

  it("should be able to add new item and remove to the list", async () => {
    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      queryByText,
      debug,
    } = render(<List initialItems={['Guilherme']} />);
    const textAddButton = "Adicionar";
    const textRemoveButton = "Remover";
    const newName = "Jeremias";

    const addButton = getByText(textAddButton);
    const inputElement = getByPlaceholderText("Novo nome");

    expect(addButton).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();

    debug();
    await userEvent.type(inputElement, newName);
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText(newName)).toBeInTheDocument();
    });

    debug();

    const removeButtons = getAllByText(textRemoveButton);
    const qtdRemoveButtons = removeButtons.length;
    const lastRemoveButton = qtdRemoveButtons - 1;

    userEvent.click(removeButtons[lastRemoveButton]);

    await waitFor(() => {
      expect(queryByText(newName)).not.toBeInTheDocument();
    });
    debug();
  });
});
