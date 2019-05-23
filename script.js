'use strict';

const searchURL = 'https://api.github.com';

function displayResults(responseJson, maxResults, login) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();

    $('#results > h2').text(`Github Repos for ${login}:`);

    for (let i = 0; i < responseJson.length & i < maxResults ; i++){

        $('#results-list').append(
            `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
                
                <p>ID: ${responseJson[i].id}</p>
                <p>Desc: ${responseJson[i].description}</p>
                <p>Created: ${responseJson[i].created_at}</p>
                <p>Last Updated: ${responseJson[i].updated_at}</p>      
             </li>
`
        )};
    //display the results section
    $('#results').removeClass('hidden');
};

function getNews(query, maxResults=10) {

    //const queryString = formatQueryParams(params)
    const url = searchURL + '/users/'+ query +'/repos';

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults, query))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userName = $('#user-name').val();
        const maxResults = $('#max-results').val();
        getNews(userName, maxResults);
    });
}

$(watchForm);