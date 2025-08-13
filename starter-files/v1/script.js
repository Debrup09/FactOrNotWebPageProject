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

const CATEGORIES = [
  { name: "Technology", color: "#3b82f6" },
  { name: "Science", color: "#16a34a" },
  { name: "Finance", color: "#ef4444" },
  { name: "Society", color: "#eab308" },
  { name: "Entertainment", color: "#db2777" },
  { name: "Health", color: "#14b8a6" },
  { name: "History", color: "#f97316" },
  { name: "News", color: "#8b5cf6" },
];

//selecting dom elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".input-form");
const factsList = document.querySelector(".facts-list");

//Render facts in list
factsList.innerHTML = "";

//Load data from Supabase
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://btcpxlwqesoprjbxrhfb.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Y3B4bHdxZXNvcHJqYnhyaGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5ODk5NzYsImV4cCI6MjA3MDU2NTk3Nn0.llxCGk2AeIGsrRfPiE-8yni34B_mkMnbJiZkpQjcveY",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Y3B4bHdxZXNvcHJqYnhyaGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5ODk5NzYsImV4cCI6MjA3MDU2NTk3Nn0.llxCGk2AeIGsrRfPiE-8yni34B_mkMnbJiZkpQjcveY",
      },
    }
  );
  const data = await res.json();
  //const filteredData = data.filter((fact) => fact.category === "Science");

  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
      <p>
        ${fact.text}
        <a
          class="links"
          href=${fact.source}
          target="_blank"
          >(Source)</a>
      </p>

      <span class="category" style="background-color: ${
        CATEGORIES.find((cat) => cat.name === fact.category).color
      }"
        >${fact.category}</span>
  </li>`
  );

  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

//toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Post your Myth";
  }
});

/*
const calcAge = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Invalid. Year needs to be equal or less than ${new Date().getFullYear()}`;

const name = "Debrup Saha";
const age = calcAge(2005);

const str = `Hey I am ${name} and i am ${age} years old and i am ${
  age > 18 ? "an adult" : "not an adult"
}`;

console.log(str);

const myInfo = {
  name: "Debrup",
  age: new Date().getFullYear() - 2005,
  student: true,

  createSummary: function () {
    return `${this.name} is ${
      this.student ? "a student" : "unemployed"
    } and of ${this.age} years old`;
  },
};

const { name, isStudent } = myInfo;

console.log(myInfo.createSummary());

const arr = [2, 4, 6, 8];
arr.forEach(function (i) {
  // console.log(i);
});

const mappedArr = arr.map((el) => el * 10);
console.log(mappedArr);
*/
