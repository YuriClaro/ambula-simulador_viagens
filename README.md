# Ambula - Simulador de Viagens
Página Web que simula viagens de ambulância exibindo o preço da viagens com a API do Google Maps

## Tech Stack
- HTML5
- Javascript
- CSS
## APIs

- Google Maps JavaScript API: Utilizada para criar e interagir com o mapa.

A função `google.maps.Map` cria o mapa no frontend.

A função `google.maps.DirectionsService` calcula as rotas entre origem e destino.

A função `google.maps.DirectionsRenderer` exibe a rota calculada no mapa.

- Google Places API: Usada para fornecer sugestões de autocompletar nos campos de origem e destino.

A função `google.maps.places.Autocomplete` oferece uma lista de sugestões enquanto o usuário digita os endereços.
