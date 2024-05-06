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

function truncateText(text, maxLength = 360) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

async function downloadURI(uri, name) {
    var link = document.createElement("a");
    const response = await fetch(uri);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

async function query_submission(query_text) {
    if (sumbit_button.value != "Submit") return;
    hideForm();

    sumbit_button.value = "...";
    sumbit_button.classList.add("clicked")

    resultTitle.innerText = "Querying..."

    // store start time for calculating time used, logging, etc
    const startTime = Date.now();

    const url = new URL("https://itunes.apple.com/search"),
        params = {
            "term": query_text,
            "country": "no",
            "entity": "ebook",
            "limit": 25
        };

    url.search = new URLSearchParams(params).toString();

    // fetch data
    const books = Object.values(await (await fetch(url)).json())[1];

    const dataSize = books.length;

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
    for (const book of books) {
        console.log(book)

        // They sometimes have html in the description, so we need to parse it
        const el = document.createElement("html");
        el.innerHTML = book.description;

        const getRes = res => book.artworkUrl60.replace("60x60bb", `${res}x${res}bb`)

        addResult(`
        <img style="border-radius: 7.5px; border: 1px solid var(--theme-button-border-color); cursor: pointer; filter: blur(5px); transition-duration: 1500ms;" onload="if (this.src == '${getRes(400)}') return; { setTimeout(() => { this.src='${getRes(400)}'; this.style.filter = '' }, 50); }" src="${getRes(60)}" onclick="downloadURI('${getRes(100_000)}', 'bruh')">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
            <h4 style="margin: 0; cursor: pointer;" onclick="window.open('${book.trackViewUrl}')">${truncateText(book.trackName)}</h4>
            <h4 style="margin: 0; cursor: pointer; text-align: right;" onclick="window.open('${book.artistViewUrl}')">${truncateText(book.artistName)}</h4>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin: 10px; gap: 10px;">
            ${book.genres.slice(0, 4).map(genre => {
            return `<h6 style="margin: 0">${genre}</h6>`
        }).join("•")
            }
        </div>
        <h6 style="margin: 0">${truncateText(el.innerText)}</h6>
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