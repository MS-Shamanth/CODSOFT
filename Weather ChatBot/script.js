const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    $('#send-button').click(() => {
        const userMessage = $('#message-input').val().trim();
        if (userMessage) {
            appendMessage('user', userMessage);
            processUserMessage(userMessage);
            $('#message-input').val('');
        }
    });

    $('#message-input').keypress((e) => {
        if (e.which == 13) {
            $('#send-button').click();
        }
    });
});

function appendMessage(sender, message) {
    const messageClass = sender === 'bot' ? 'message bot' : 'message user';
    const messageHtml = `<div class="${messageClass}"><p>${message}</p></div>`;
    $('#chat-body').append(messageHtml);
    $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
}

function processUserMessage(message) {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('hello')) {
        appendMessage('bot', 'Hello! Enter the city name to get the weather update.');
    } else if (lowerCaseMessage.includes('bye')) {
        appendMessage('bot', 'Goodbye, Have a great day!');
    } else if (lowerCaseMessage.includes('thanks')) {
        appendMessage('bot', 'You\'re welcome, Have a great day!');
    } else {
        getWeather(message);
    }
}

async function getWeather(city) {
    const temp = `${url}?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            showWeather(data);
        } else {
            appendMessage('bot', 'City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        appendMessage('bot', 'Sorry, something went wrong. Please try again later.');
    }
}

function showWeather(data) {
    const weatherInfo = `
        <strong>${data.name}</strong><br>
        <b>Temperature</b>: ${data.main.temp}°C<br>
        <b>Description</b>: ${data.weather[0].description}
    `;
    appendMessage('bot', 'Here is the weather information for ' + weatherInfo);
}
