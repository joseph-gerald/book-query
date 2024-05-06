// initalize variables to access elements
const query_text_elm = document.getElementById("query_content")
const sumbit_button = document.getElementById("submit_query");
const resultTitle = document.querySelector(".search-result-title");
const results = document.querySelector(".results");

// state
let started = false;

// hides form by pushing it down under screen
const hideForm = async () => {
    if (started) return;
    started = true;

    const title = document.getElementById("title");
    const searchForm = document.querySelector(".search-form");
    const glowBox = document.querySelector(".glow-box")

    title.style.transform = "translateY(-50vh) rotate(270deg)";
    title.style.scale = "200%";
    title.style.filter = "blur(12px)";

    searchForm.style.position = "fixed";
    searchForm.style.bottom = "30px";

    glowBox.style.bottom = "-50px";

    setTimeout(() => {
        title.remove();
        resultTitle.style.marginTop = "-3px";
    }, 750);
}

// sleep utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// submit function
async function submit(query_text) {
    if (query_text.length == 0) // empty query check
    {
        query_text_elm.placeholder = "Please type something...";
        query_text_elm.focus();
        return;
    }

    query_text_elm.placeholder = "Search Now";
    sumbit_button.style.backgroundColor = "var(--primary-button-color)";

    query_submission(query_text); // pass data to query handler
}

async function query_submission(query_text) {
    if (sumbit_button.value != "Submit") return;
    hideForm();

    sumbit_button.value = "...";
    sumbit_button.classList.add("clicked")

    resultTitle.innerText = "Querying..."

    // store start time for calculating time used, logging, etc
    const startTime = Date.now();

    // fetch data
    const data = Object.values(await (await fetch("https://baconipsum.com/api/?type=meat-and-filler&start-with-lorem=1&paras=3")).json());
    const dogs = await (await fetch("https://api.thedogapi.com/v1/images/search?limit=3")).json();

    const dataSize = data.length;

    let index = 0;

    // set title on top of the screen to data info (response size)
    resultTitle.innerText = `Got ${dataSize} ${dataSize == 1 ? "result" : "results"} for ${query_text}!`;
    sumbit_button.value = "Submit";
    
    // stop blocking queries
    sumbit_button.classList.remove("clicked")

    // clear results so we can insert new results
    results.innerHTML = "";

    // handle zero results with a sad face
    if (dataSize == 0) {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result")
        resultDiv.style.height = "100%"
        resultDiv.style.backgroundColor = "transparent";
        resultDiv.style.display = "flex";
        resultDiv.style.boxShadow = "none";
        resultDiv.style.justifyContent = "center";
        resultDiv.innerHTML =
            `
        <h1>Found no ${query_text} 😔</h1>
        `
        results.appendChild(resultDiv)
    }

    // insert results
    for (const part of data) {
        addResult(`
        <h2 style="margin: 0">Index = ${index++}</h2>
        <h6 style="margin: 0">${part}</h6>
        <img style="border-radius: 10px; margin-top: 10px" src="${dogs[index].url}">
        `)
    }
}

// result logic/styling
const addResult = async (html) => {
    const resultDiv = document.createElement("div");
    
    resultDiv.classList.add("result")
    resultDiv.style.height = "100%"
    resultDiv.style.display = "flex";
    resultDiv.style.flexDirection = "column"
    resultDiv.innerHTML = html

    // insert element into results
    results.appendChild(resultDiv)
}

// submit data if submit button is clicked
sumbit_button.addEventListener("click", () => {
    submit(query_content.value)
});

// keypress handler
query_text_elm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submit(query_content.value)
});