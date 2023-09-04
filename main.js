const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//Search images.json and filter it
const searchImages = async searchText => {
    const res = await fetch("images.json");
    const images=await res.json();

    //Get matches to current text input
    let matches=images.filter(image => {
        const regex = new RegExp(`^${searchText}`,"gi");
        return image.title.match(regex);
    });

    if (searchText.length===0){
        matches=[];
        matchList.innerHTML='';
    }

    outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
    if (matches.length>0){
        const html=matches.map(match =>`
            <div class="card card-body mb-1">
                <a href="${match.link}"><h4>${match.title} (${match.location})</h4></a>
            </div>
        `)
        .join('');

    matchList.innerHTML=html;

    }
};

search.addEventListener("input",()=>searchImages(search.value));