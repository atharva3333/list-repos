function searchProfile() {
    const username = document.getElementById('username').value;
  
    if (!username) {
      alert('Please enter a username');
      return;
    }
  
    const apiUrl = `https://api.github.com/users/${username}`;
    const profileContainer = document.getElementById('profile-container');
    const repoContainer = document.getElementById('repo-container');
    const resultsPerPageContainer = document.getElementById('resultsPerPageContainer');
    const loader = document.createElement('div');
    loader.className = 'loader';
    profileContainer.innerHTML = '';
    repoContainer.innerHTML = '';
    profileContainer.appendChild(loader);
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const publicRepos = data.public_repos;
        displayProfile(data);
        displayRepositories(data.repos_url + `?per_page=10`, publicRepos, repoContainer);
  
        // Show the "Results Per Page" dropdown after the user is searched for
        resultsPerPageContainer.style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        profileContainer.innerHTML = '<p>Error fetching data. Please try again.</p>';
      });
  }
  
  function changeResultsPerPage() {
    const resultsPerPage = document.getElementById('resultsPerPage').value;
    const username = document.getElementById('username').value;
  
    if (!username) {
      alert('Please enter a username');
      return;
    }
  
    const apiUrl = `https://api.github.com/users/${username}`;
    const profileContainer = document.getElementById('profile-container');
    const repoContainer = document.getElementById('repo-container');
    const loader = document.createElement('div');
    loader.className = 'loader';
    profileContainer.innerHTML = '';
    repoContainer.innerHTML = '';
    profileContainer.appendChild(loader);
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const publicRepos = data.public_repos;
        displayProfile(data);
        displayRepositories(data.repos_url + `?per_page=${resultsPerPage}`, publicRepos, repoContainer);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        profileContainer.innerHTML = '<p>Error fetching data. Please try again.</p>';
      });
  }
  
  function displayProfile(profile) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = `  
      <div>
        <img src="${profile.avatar_url}" alt="Profile Image" class="profile-img">
        <p class="profile-link"><a href="${profile.html_url}" target="_blank"><img class="link-icon" width="20" height="20" src="https://img.icons8.com/material-sharp/24/link--v1.png" alt="link--v1"/> ${profile.html_url}</a></p>
      </div>
      <div>
        <h2>${profile.name}</h2>
        <p>${profile.login}</p>
      </div>
    `;
  }
  
  function displayRepositories(reposUrl, totalRepos, repoContainer) {
    const loader = document.createElement('div');
    loader.className = 'loader';
    repoContainer.innerHTML = '';
    repoContainer.appendChild(loader);
  
    const reposPerPage = document.getElementById('resultsPerPage').value;
    const totalPages = Math.ceil(totalRepos / parseInt(reposPerPage));

    const fetchUrl = `${reposUrl}&sort=created&direction=asc`;
  
    fetch(fetchUrl)
      .then(response => response.json())
      .then(repositories => {
        const reposList = document.createElement('div');
        reposList.className = 'repos-list';
  
        repositories.forEach(repo => {
          const repoItem = document.createElement('div');
          repoItem.className = 'repo-card';
          repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> 
          <p>${repo.description}</p>
          `;
          
        
          // Fetch and display languages for each repository
          fetch(repo.languages_url)
            .then(response => response.json())
            .then(languages => {
              const languagesList = Object.keys(languages).map(language => `<span class="tags">${language}</span>`).join(' ');
              const languagesContainer = document.createElement('div');
              languagesContainer.innerHTML = `<div>${languagesList}</div>`;
              repoItem.appendChild(languagesContainer);
            })
            .catch(error => {
              console.error('Error fetching languages:', error);
            });
        
          reposList.appendChild(repoItem);
        });
        
  
        repoContainer.innerHTML = '';
        repoContainer.appendChild(reposList);
  
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
  
        for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.innerText = i;
          pageButton.addEventListener('click', () => {
            const pageUrl = `${reposUrl}&page=${i}&per_page=${reposPerPage}`;
            displayRepositories(pageUrl, totalRepos, repoContainer);
          });
          paginationContainer.appendChild(pageButton);
        }
  
        repoContainer.appendChild(paginationContainer);
      })
      .catch(error => {
        console.error('Error fetching repositories:', error);
        repoContainer.innerHTML = '<p>Error fetching repositories. Please try again.</p>';
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  }


  
  