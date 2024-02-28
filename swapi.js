// Clau de l'API d'OpenWeatherMap
const OPENWEATHER_API_KEY = "7b3284127183ee66da9db0128c1089d0";

// Funció per obtenir la informació meteorològica d'una ciutat
async function obtenirMeteorologia(ciutat) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciutat}&appid=${OPENWEATHER_API_KEY}`
    );
    const dades = await res.json();

    // Crida a la funció per mostrar la informació a l'HTML
    mostrarInformacioMeteorologica(dades);

    return dades;
  } catch (error) {
    throw new Error("Error en obtenir la informació meteorològica.");
  }
}

// Funció per canviar la ciutat i obtenir nova informació meteorològica
async function canviarCiutatIObtenirMeteorologia(novaCiutat) {
  try {
    const novesDadesMeteorologiques = await obtenirMeteorologia(novaCiutat);
    console.log(novesDadesMeteorologiques);

    // Mostra la nova informació a la interfície d'usuari
    mostrarInformacioMeteorologica(novesDadesMeteorologiques);
  } catch (error) {
    console.error(error);
  }
}

// Funció per mostrar la informació meteorològica a l'HTML
function mostrarInformacioMeteorologica(dadesMeteorologiques) {
  const divInformacioMeteorologica = document.getElementById("weather-info");

  const temperaturaCelsius = dadesMeteorologiques.main.temp - 273.15;

  divInformacioMeteorologica.innerHTML = `
    <p>Nom de la Ciutat: ${dadesMeteorologiques.name}</p>
    <p>Temperatura: ${temperaturaCelsius.toFixed(2)} °C</p>
    <p>Descripció: ${dadesMeteorologiques.weather[0].description}</p>
  `;
}

// Funció per filtrar la informació meteorològica segons la temperatura mínima
function filtrarDadesMeteorologiques(dadesMeteorologiques, temperaturaMinima) {
  // Obté la temperatura en graus Celsius a partir de les dades meteorològiques
  const temperaturaCelsius = dadesMeteorologiques.main.temp - 273.15;

  // Comprova si la temperatura és igual o superior a la temperatura mínima especificada
  return temperaturaCelsius >= temperaturaMinima;
}

// CRUD

// CREAR
async function crearDadesMeteorologiques(ciutat, temperatura, descripcio) {
  try {
    // Envia una sol·licitud POST per crear noves dades meteorològiques
    const res = await fetch("http://localhost:3000/weatherData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ciutat,
        temperatura,
        descripcio,
      }),
    });

    // Obté i imprimeix la resposta del servidor
    const novesDadesMeteorologiques = await res.json();
    console.log("Nova dada meteorològica creada:", novesDadesMeteorologiques);

    // Retorna les noves dades meteorològiques creades
    return novesDadesMeteorologiques;
  } catch (error) {
    // Captura i gestiona qualsevol error que pugui ocórrer durant la creació de dades meteorològiques
    console.error("Error en crear la dada meteorològica:", error);
    throw new Error("Error en crear la dada meteorològica.");
  }
}

// LLEGIR
async function obtenirTotesLesDadesMeteorologiques() {
  try {
    // Realitza una sol·licitud GET per obtenir totes les dades meteorològiques
    const res = await fetch("http://localhost:3000/weatherData");
    // Obté i imprimeix les dades meteorològiques actuals
    const dadesMeteorologiques = await res.json();
    console.log("Dades meteorològiques actuals:", dadesMeteorologiques);

    // Retorna les dades meteorològiques obtingudes
    return dadesMeteorologiques;
  } catch (error) {
    // Captura i gestiona qualsevol error que pugui ocórrer durant la lectura de dades meteorològiques
    console.error("Error en obtenir les dades meteorològiques:", error);
    throw new Error("Error en obtenir les dades meteorològiques.");
  }
}

// MODIFICAR
async function modificarDadesMeteorologiques(id, novesDades) {
  try {
    // Realitza una sol·licitud PUT per actualitzar les dades meteorològiques amb l'ID especificat
    const res = await fetch(`http://localhost:3000/weatherData/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novesDades),
    });

    // Obté i imprimeix les dades meteorològiques actualitzades
    const dadesMeteorologiquesActualitzades = await res.json();
    console.log(
      "Dada meteorològica actualitzada:",
      dadesMeteorologiquesActualitzades
    );

    // Retorna les dades meteorològiques actualitzades
    return dadesMeteorologiquesActualitzades;
  } catch (error) {
    // Captura i gestiona qualsevol error que pugui ocórrer durant la modificació de dades meteorològiques
    console.error("Error en actualitzar la dada meteorològica:", error);
    throw new Error("Error en actualitzar la dada meteorològica.");
  }
}

// ELIMINAR
async function eliminarDadesMeteorologiques(id) {
  try {
    // Realitza una sol·licitud DELETE per eliminar les dades meteorològiques amb l'ID especificat
    const res = await fetch(`http://localhost:3000/weatherData/${id}`, {
      method: "DELETE",
    });

    // Imprimeix un missatge indicant que les dades meteorològiques han estat eliminades amb èxit
    console.log("Dada meteorològica eliminada amb èxit.");
  } catch (error) {
    // Captura i gestiona qualsevol error que pugui ocórrer durant l'eliminació de dades meteorològiques
    console.error("Error en eliminar la dada meteorològica:", error);
    throw new Error("Error en eliminar la dada meteorològica.");
  }
}

export default {
  obtenirMeteorologia,
  mostrarInformacioMeteorologica,
  canviarCiutatIObtenirMeteorologia,
  filtrarDadesMeteorologiques,
  crearDadesMeteorologiques,
  obtenirTotesLesDadesMeteorologiques,
  modificarDadesMeteorologiques,
  eliminarDadesMeteorologiques,
};
