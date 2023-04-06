import { useState } from "react";

interface ListProps {
  initialItems: string[];
}

function List({ initialItems }: ListProps) {
  const [list, setList] = useState(initialItems);
  const [newName, setNewName] = useState("");

  const addToList = () => {
    setTimeout(() => {
      setList((state) => [...state, newName]);
    }, 500);
    setNewName("");
  };

  const removeFromList = (thisItem: string) => {
    setTimeout(() => {
      setList((state) => state.filter((item) => item !== thisItem));
    }, 500);
  };

  const clearList = () => {
    setList([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Novo nome"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <button onClick={clearList}>Limpar lista</button>
      <ul>
        {list.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
