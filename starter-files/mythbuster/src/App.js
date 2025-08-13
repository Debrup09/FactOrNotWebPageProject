import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// function Counter() {
//   const [count, setCount] = useState(8);

//   return (
//     <div>
//       <span style={{ fontSize: "40px" }}>{count}</span>
//       <button className="btn btn-large" onClick={() => setCount(count + 1)}>
//         +1
//       </button>
//       <button className="btn btn-large" onClick={() => setCount(0)}>
//         Reset
//       </button>
//     </div>
//   );
// }

function App() {
  const [showForm, setShowForm] = useState(false);
  const [fact, setFact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCat, setCurrentCat] = useState("all");

  useEffect(
    function () {
      async function getFact() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCat !== "all") query = query.eq("category", currentCat);

        const { data: fact, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFact(fact);
        else alert("There was a problem");
        setIsLoading(false);
      }

      getFact();
    },
    [currentCat]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFact={setFact} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCat={setCurrentCat} />

        {isLoading ? <Loader /> : <FactList fact={fact} setFact={setFact} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Mythbuster";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="65" width="65" alt="This is a Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Post your myth"}
      </button>
    </header>
  );
}

function isValidUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFact, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const textLength = text.length;
  const [isUploading, setIsUploading] = useState(false);

  //Stopping submit from reloading
  async function handleSubmit(e) {
    e.preventDefault();

    //checking if data is valid or not
    if (text && isValidUrl(source) && category && textLength <= 200)
      console.log("valid");

    // adding new fact object
    setIsUploading(true);
    const { data: newFact, error } = await supabase
      .from("facts")
      .insert([{ text, source, category }])
      .select();
    setIsUploading(false);

    //adding the fact object to ui
    if (!error) setFact((fact) => [newFact[0], ...fact]);

    //resetting the input fields
    setText("");
    setSource("");
    setCategory("");

    //closing the form
    setShowForm(false);
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a Myth..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span> {200 - textLength}</span>
      <input
        type="text"
        placeholder="Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">CHOOSE ONE:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Go
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCat }) {
  return (
    <aside>
      <ul>
        <li className="button">
          <button className="btn btn-all" onClick={() => setCurrentCat("all")}>
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="button">
            <button
              className="btn btn-categories"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCat(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ fact, setFact }) {
  if (fact.length === 0)
    return (
      <p className="message">Be the first to post a Myth in this Category.</p>
    );

  return (
    <section>
      <ul className="facts-list">
        {fact.map((fact) => (
          <Fact key={fact.id} fact={fact} setFact={setFact} />
        ))}
      </ul>
      <p>There are {fact.length} entries present.</p>
    </section>
  );
}

function Fact({ fact, setFact }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleVote() {
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ votesInteresting: fact.votesInteresting + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    console.log(updatedFact);

    if (!error) {
      setFact((fact) =>
        fact.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    }
  }

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="links" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>

      <span
        className="category"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>

      <div className="reactions">
        <button onClick={handleVote} disabled={isUpdating}>
          👍 {fact.votesInteresting}
        </button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
