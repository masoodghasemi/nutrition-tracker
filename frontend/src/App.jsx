import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/log_food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1,
        items: [{ name: input }],
        timestamp: new Date().toISOString()
      })
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Nutrition Tracker</h1>
      <input
        type="text"
        placeholder="Enter food (e.g. 2 eggs)"
        className="border p-2 w-full mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
        Log Food
      </button>
      {response && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;