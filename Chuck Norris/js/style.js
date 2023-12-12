async function searchChuckNorrisJokes(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const jokesContainer = document.getElementById('jokesContainer');

    
    jokesContainer.innerHTML = '';

    
    if (searchInput.value.trim() !== '') {
        try {
            
            const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${searchInput.value}`);
            const data = await response.json();

            if (data.total === 0) {
                jokesContainer.textContent = 'No jokes found.';
                jokesContainer.style.color = 'white';
                return;
            }

            
            let currentRow;

            data.result.forEach((joke, index) => {
                
                if (index % 4 === 0) {
                    currentRow = document.createElement('div');
                    currentRow.classList.add('joke-row');
                    jokesContainer.appendChild(currentRow);
                }

                const jokeBox = document.createElement('div');
                jokeBox.classList.add('joke-box', 'bg-' + getRandomColor());

                
                jokeBox.style.height = 'content';

                jokeBox.textContent = joke.value;
                currentRow.appendChild(jokeBox);
            });
        } catch (error) {
            console.error('Error fetching Chuck Norris jokes:', error);
        }
    }
}


function getRandomColor() {
    const colors = ['secondary', 'success', 'primary', 'danger', 'warning', 'info'];
    return colors[Math.floor(Math.random() * colors.length)];
}
