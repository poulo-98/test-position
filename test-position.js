window.onload = function () {
    fetchPOIs().then(r => r);
}
async function fetchPOIs() {
        try {
            const position = await getCurrentPosition();
            if (position) {
                const { latitude, longitude } = position.coords;
                const coordinates = [
                    latitude - 0.1,
                    longitude - 0.1,
                    latitude + 0.1,
                    longitude + 0.1
                ];
                const poiType = [
                    ['amenity', 'bar'],
                    ['amenity', 'biergarten'],
                    ['amenity', 'cafe'],
                    ['amenity', 'restaurant'],
                    ['amenity', 'fast_food'],
                    ['amenity', 'food_court'],
                    ['amenity', 'ice_cream']
                ];
                const food = await openstreetmapGetPOIs(coordinates, poiType);
                const myDiv = document.getElementById('my-div');
                if (myDiv) {
                    myDiv.innerHTML = food.map(poi => `<a href="${poi.osm_url}" target="_blank">${poi.name}</a><br>`).join('');
                }
            } else {
                console.error("La géolocalisation n'est pas disponible.");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des POIs:", error);
        }
    }

    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
