const apiKey = 'AIzaSyCQQatySalX9GXjlwDfr8ri5HzogmG5ZV4';

let map, autocompleteOrigin, autocompleteDestination;

function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 8
    });

    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

    directionsRenderer.setMap(map);

    autocompleteOrigin = new google.maps.places.Autocomplete(
        document.getElementById('origin'),
        { types: ['geocode'] }
    );

    autocompleteDestination = new google.maps.places.Autocomplete(
        document.getElementById('destination'),
        { types: ['geocode'] }
    );

    setDefaultDateTime();
}

function setDefaultDateTime() {
    const dateInput = document.getElementById('travelDate');
    const timeInput = document.getElementById('travelTime');

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    dateInput.value = today;

    now.setHours(now.getHours() + 1);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
}

function calculateDistance() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('travelDate').value;
    const travelTime = document.getElementById('travelTime').value;

    if (!origin || !destination) {
        alert('Por favor, preencha os campos de origem e destino.');
        return;
    }

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);

            const distanceInMeters = response.routes[0].legs[0].distance.value;
            const distanceInKm = distanceInMeters / 1000;
            const price = (distanceInKm * 1.50).toFixed(2);

            const resultElement = document.getElementById('result');
            resultElement.innerHTML = `
                <h2>Resumo da Viagem</h2>
                <p><strong>Ponto de Partida:</strong> ${origin}</p>
                <p><strong>Destino Final:</strong> ${destination}</p>
                <p><strong>Data da Viagem:</strong> ${travelDate}</p>
                <p><strong>Horário da Viagem:</strong> ${travelTime}</p>
                <p><strong>Distância:</strong> ${distanceInKm.toFixed(2)} km</p>
                <p><strong>Preço Estimado:</strong> € ${price}</p>
            `;
            resultElement.style.display = 'block';

            document.getElementById('image-container').style.display = 'none';
            document.getElementById('map').style.display = 'block';
        } else {
            document.getElementById('result').innerHTML = 'Rota não encontrada.';
            document.getElementById('result').style.display = 'block';
        }
    });
}