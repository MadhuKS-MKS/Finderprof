const client_id = "9fcfc5f03135d788268f";
const client_secret = "f7037c65e57bede8937c2ae20201b8a54359b87d";
this.repos_sort = 'created: asc';

document.getElementById("search").addEventListener("keyup", getData);

async function getData(e) {
  console.log(e.target.value);
  if (e.target.value != "") {
    const profile = await fetch(
      `https://api.github.com/users/${e.target.value}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const repo = await fetch(
      `https://api.github.com/users/${e.target.value}/repos?per_page=${5}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const data = await profile.json();
    const repos = await repo.json();

    // console.log(repos);

    document.getElementById(
      "img"
    ).innerHTML = `<img src="${data.avatar_url}" width="250px"  />
                <a href="${data.html_url}" class="btn btn-primary btn-block  mt-5 mb-4">More Detail</a>`;
    document.getElementById(
      "dtl"
    ).innerHTML = ` <span class="badge badge-primary">Public Repository: ${data.public_repos}</span>
        <span class="badge badge-secondary">Public Gists: ${data.public_gists}</span>
        <span class="badge badge-success">Followers: ${data.followers}</span>
        <span class="badge badge-info">Following: ${data.following}</span>
       
        `;
    document.getElementById("detail").innerHTML = `<ul class="list-group mt-4">
      <li class="list-group-item">Name : ${data.name}</li>
  <li class="list-group-item">Company : ${data.company}</li>
  <li class="list-group-item">Blog: ${data.blog}</li>
  <li class="list-group-item">Location : ${data.location}</li>
  <li class="list-group-item">Member Since : ${data.created_at}</li>
</ul>
  
  `;

    console.log(repos);

    let output = `<h2 class="page-heading m-3">Latest Repository</h2>
        `;

    repos.forEach(function(repo) {
      output += `
          
          <div class="card card-body mb-2">
            <div class="row">
              <div class="col-md-6">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </div>
              <div class="col-md-6">
              <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-success">Forks: ${repo.forms_count}</span>
              </div>
            </div>
          </div>
         
        `;
    });

    // Output repos
    document.getElementById("rep").innerHTML = `${output}</ul>`;
  } else {
    document.getElementById("img").innerHTML = "";
    document.getElementById("dtl").innerHTML = "";
    document.getElementById("detail").innerHTML = "";
    document.getElementById("rep").innerHTML = "";
  }
}
