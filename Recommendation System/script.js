const apiKey = '52b95fbbea8e99019f1846935418ccb3';
const genreDropdown = $('#genre-dropdown');
const languageDropdown = $('#language-dropdown');
const recommendationsDiv = document.getElementById('recommendations');

const mixedGenres = [
    { id: '10749,35', name: 'Romcom' },
    { id: '878,53', name: 'Sci-Fi Thriller' }
];

$(document).ready(function() {
    $('.select2').select2();
    fetchGenres();
    fetchLanguages();
});

async function fetchGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
        const data = await response.json();
        const allGenres = [...data.genres, ...mixedGenres];
        allGenres.forEach(genre => {
            genreDropdown.append(new Option(genre.name, genre.id));
        });
    } catch (error) {
        alert('Failed to load genres. Please try again later.');
    }
}

async function fetchLanguages() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);
        const data = await response.json();
        data.forEach(language => {
            languageDropdown.append(new Option(language.english_name, language.iso_639_1));
        });
    } catch (error) {
        alert('Failed to load languages. Please try again later.');
    }
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmI5NWZiYmVhOGU5OTAxOWYxODQ2OTM1NDE4Y2NiMyIsIm5iZiI6MTcyMzM5ODI4OS4xMzMxNywic3ViIjoiNjZiMzY4ODA3ZDQyNTdkYTAyNDUyYTFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.f_5-lqUGHlMagBNHr1dXycy6zhAhQrAPFp7QrkG3Dso'
    }
  };
  
  fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

async function fetchRecommendations(genreId, languageCode) {
    try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
        if (genreId) url += `&with_genres=${genreId}`;
        if (languageCode) url += `&with_original_language=${languageCode}`;

        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results.sort((a, b) => b.vote_average - a.vote_average);

        recommendationsDiv.innerHTML = '';

        if (movies.length === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.textContent = 'No recommendations found.';
            recommendationsDiv.appendChild(noResultsDiv);
            recommendationsDiv.style.display = 'block';
            return;
        }

        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie';
            movieDiv.innerHTML = `<h3>${movie.title} (${movie.release_date.split('-')[0]})</h3>
                                  <h4>Rating: <i class="fa-sharp fa-solid fa-star" style="color: #ff9500;"></i> ${movie.vote_average}</h4>
                                  <p>${movie.overview}</p>`;
            recommendationsDiv.appendChild(movieDiv);
        });

        recommendationsDiv.style.display = 'block';
    } catch (error) {
        alert('Failed to load recommendations. Please try again later.');
    }
}

document.getElementById('movie-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const genreId = genreDropdown.val();
    const languageCode = languageDropdown.val();
    await fetchRecommendations(genreId, languageCode);
});
