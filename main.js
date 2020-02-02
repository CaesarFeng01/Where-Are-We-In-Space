
            // Making a map and tiles 
            const mymap = L.map('issMap').setView([0, 0], 3);
            const attribution =
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(mymap);

            // Making a marker with a custom icon
            const issIcon = L.icon({
                iconUrl: 'iss.png',
                iconSize:     [50, 32], // size of the icon
                iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location   
            });

            const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

            
            const ISS_url = 'https://api.wheretheiss.at/v1/satellites/25544';
            const people_url = 'http://api.open-notify.org/astros.json';

            let initialize = true;

            async function getISS() {
                const res = await fetch(ISS_url);

                const data = await res.json();

                const { latitude, longitude, altitude, velocity } = data;

                marker.setLatLng([latitude, longitude]);

                if (initialize) {
                    mymap.setView([latitude, longitude], 3);
                    initialize = false;
                }
                
                document.getElementById('lat').textContent = latitude.toFixed(2);
                document.getElementById('lon').textContent = longitude.toFixed(2);
                document.getElementById('alt').textContent = altitude.toFixed(2);
                document.getElementById('vel').textContent = velocity.toFixed(2);
            }

            async function getPeople() {
                const res = await fetch(people_url);

                const data = await res.json();

                const { people, number } = data;
                /*
                for(i = 0; i < number; i++){
                    document.getElementById('people-in-space').innerHTML += " " + (i+1) + ": " + people[i].name + "<br />";
                }    */

                // alternate more efficient way of displaying names below
                let output = '';
                people.forEach((people) => {
                    output += `<li>${people.name}</li>`
                });
                document.getElementById('people-in-space').innerHTML = output;
            }

            getISS();  
            getPeople();

            setInterval(getISS, 1000);  

            const intro = document.querySelector(".intro");
            const title = document.querySelector("#title");
            const stats = document.querySelector("#statistics-wrapper");

            intro.addEventListener("mouseover", (e) => {
                document.querySelector('section').classList.add('content-highlight');
            });

            intro.addEventListener("mouseout", (e) => {
                document.querySelector('section').classList.remove('content-highlight');
            })

            title.addEventListener("mouseover", (e) => {
                document.querySelector('header').classList.add('title-emphasize');
            })

            title.addEventListener("mouseout", (e) => {
                document.querySelector('header').classList.remove('title-emphasize');
            })

            stats.addEventListener("mouseover", (e) => {
                document.querySelector('p').classList.add('stat-emp');
            })
        