import swapi from "./swapi.js";

async function principal() {
  try {
    // Obté i mostra la informació meteorològica per defecte
    const dadesMeteorologiquesPerDefecte = await swapi.obtenirMeteorologia("Barcelona");
    swapi.mostrarInformacioMeteorologica(dadesMeteorologiquesPerDefecte);

    // Filtra la informació meteorològica segons la temperatura mínima
    if (swapi.filtrarDadesMeteorologiques(dadesMeteorologiquesPerDefecte, 13)) {
      console.log("Complaix amb el criteri de temperatura mínima.");
    } else {
      console.log("No complaix amb el criteri de temperatura mínima.");
    }

    // Canvia la ciutat i obté nova informació meteorològica
    const novaCiutat = "Granada";
    await swapi.canviarCiutatIObtenirMeteorologia(novaCiutat);

    // CRUD
    // Obtenir i mostrar dades meteorològiques existents
    const totesLesDadesMeteorologiques = await swapi.obtenirTotesLesDadesMeteorologiques();

    // Crear un nou conjunt de dades meteorològiques
    // const novesDadesMeteorologiques = await swapi.crearDadesMeteorologiques('Paris', 18, 'Plujós');

    // Actualitzar el nou conjunt de dades meteorològiques
    // const dadesMeteorologiquesActualitzades = await swapi.modificarDadesMeteorologiques(4, {
    //   temperatura: 20,
    //   descripcio: 'Assolellat',
    // });

    // Eliminar el conjunt de dades meteorològiques actualitzat
     //await swapi.eliminarDadesMeteorologiques("2");

  } catch (error) {
    console.error(error);
  }
}

principal();
