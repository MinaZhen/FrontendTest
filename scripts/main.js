"use strict"


// Add a listener to the form and when is submitted, calls logic
document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault()

    let input = this.elements[0];

    let username = input.value;

    let user = {}
    let repos = {}

    input.value = ""

    logic.findUser(username)
        .then(resp => {
            user = resp;
            if (resp.login) return logic.showRepos(username); else throw resp
        })
        .then(repos => {
            if (repos.message) throw new Error("There is a problem with the repositories"); else return repos
        })
        .then(repos => view(user, repos))
        .catch(err => {             
            if (err.message === "Not Found"){
                return view("Does not exist")
            } else {
                return view(err.message)
            }
        })

})

/**
 * Renders the views depending of the parameters, is called from submit
 * 
 * @param {string|Object} append - error message or user object
 * @param {Object} repos - repositories object
 */
function view(append, repos) {

    let div = document.getElementById("append")
    div.innerHTML = ""
    div.style.display = "none"

    if (typeof append === "string") {

        div.innerHTML = `<div class="error"> ${append} </div>`
        div.style.display = "block"

    } else if (Array.isArray(repos)){

        let toAppend = `<div class="profile"> <img src=${append.avatar_url} alt="avatar"}> <div class="info"> <em>@${append.login}</em>`;

        (append.name !==  null) ? toAppend += `<h1>${append.name}</h1>` : toAppend += `<h1></h1>`;
        (append.bio !==  null) ? toAppend += `<p>${append.bio}</p>` : toAppend += `<p> </p>`;

        
        if (repos.length === 0) {

            toAppend += `</div></div> <p>This user has not repositories.</p>`
            div.innerHTML = toAppend
            div.style.display = "block"

        } else {

            toAppend += `</div></div> <div class="repos"><span>Repositories</span><ul id="list"></ul></div>`
            div.innerHTML = toAppend
            div.style.display = "block"

            let list = document.getElementById("list")
    
            repos.map((repo) => {
                list.innerHTML += `
                <li><div class="repo-name"> <span>${repo.name}</span> </div> 
                    <div> 
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Octicons-repo-forked.svg" /> ${repo.stargazers_count}  
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Octicons-star.svg" /> ${repo.forks} 
                    </div>
                </li>`
            })
        }

    }
}