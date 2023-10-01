const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="user profile picture" />
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado.'}</h1>
                                <p>${user.bio ?? 'Não possuio bio cadastrada.'}</p>
                                <p>Seguidores: ${user.followers }</p>
                                <p>Seguindo: ${user.following }</p>
                            </div>
                        </div>`  
                        
        let repositoriesItens = ''
            user.repositories.forEach(repository => {
                repositoriesItens += `<li><a href="${repository.html_url}" target="_blank">${repository.name}<br>
                <ul class="repo-info">
                    <li>🍴${repository.forks_count}</li>
                    <li>👀${repository.watchers_count}</li>
                    <li>⭐${repository.stargazers_count}</li>
                    <li>👩‍💻${repository.language ?? 'Nd.'}</li>
                </ul></a></li>`
            })
            document.querySelector('.profile-data').innerHTML += 
                `<div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>${repositoriesItens}</ul>
                </div>`; 
                if (user.repositories.length === 0) {
                    document.querySelector('.profile-data').innerHTML += 
                        `<div class="repositories section">
                            <h2>Repositórios</h2>
                            <p>Este usuário não possui repositórios.</p>
                        </div>`;
        }
        let eventsItens = ''
        user.events.forEach(event => {
            
            if (event.type === 'PushEvent') {
                eventsItens += `<p><span class='bold'>${event.repo.name}</span> - ${event.payload.commits[0].message ?? "Sem informações"}</p>`
             } else if (event.type === 'CreateEvent') { 
                eventsItens += `<p><span class='bold'>${event.repo.name}</span> - ${event.payload.description  ?? "Sem informações" }</p>`
            }
        })
        document.querySelector('.profile-data').innerHTML +=  
            `<div class="repositories section">
                <h2>Eventos</h2>
                ${eventsItens}
            </div>`
    },
    renderNotFound() {
        this.userProfile.innerHTML = `<div class="info">
                                        <h1>Usuário não encontrado.</h1>
                                    </div>`
    }
}

export { screen }


