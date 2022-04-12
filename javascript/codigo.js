class oferta {
  constructor(tipo, destino, dias, precio, pension) {
    this.tipo = tipo;
    this.destino = destino;
    this.dias = dias;
    this.precio = precio;
    this.pension = pension;
  }

  mensaje() {
    swal(
      " El viaje es de tipo " +
      this.tipo +
      ", el mejor destino para tu eleccion es " +
      this.destino +
      ", la duracion del viaje es de " +
      this.dias +
      " dias, incluye  " +
      this.pension +
      " y el valor por persona es de $" +
      this.precio +
      ".-"
    );
  }
}

const oferta1 = new oferta("aventura", "mendoza", 10, 20000, "media pension ");
const oferta2 = new oferta("relax", "san juan ", 15, 30000, "pension completa");
const oferta3 = new oferta("romantica", "tucuman", 17, 40000, "media pension");
const oferta4 = new oferta(
  "diversion",
  "san carlos de bariloche",
  25,
  60000,
  "pension completa"
);
const oferta5 = new oferta("cultura", "Salta", 5, 5000, "media pension");
const oferta6 = new oferta(
  "relax",
  "San Miguel de Tucuman",
  5,
  5000,
  "media pension"
);
const oferta7 = new oferta("romantica", "Arequito", 5, 5000, "media pension");
const oferta8 = new oferta("diversion", "El Naranjo", 5, 5000, "media pension");
const oferta9 = new oferta("acentura", "Canals", 5, 5000, "media pension");
const oferta10 = new oferta("aventura", "Cordoba", 5, 5000, "media pension");

function getSelectValue() {
  var selectedValue = document.getElementById("opAven1").value;
  console.log(selectedValue);

  switch (selectedValue) {
    case "1": 
      alert(
        "Perfecto, elegiste el mejor viaje de Aventura, a continuacion te cuento los detalles."
      );

      if (selectedValue === "1") { 
        oferta1.mensaje();
        break;
      }
      case "2":
        alert(
          "Perfecto, elegiste el mejor viaje de Relax, a continuacion te cuento los detalles."
        );

        if (selectedValue === "2") {
          oferta2.mensaje();
          break;
        }
        case "3":
          alert(
            "Perfecto, elegiste el mejor Viaje Romentico, a continuacion te cuento los detalles."
          );

          if (selectedValue === "3") {
            oferta3.mensaje();
            break;
          }
          case "4":
            alert(
              "Perfecto, elegiste divertirte a full, a continuacion te cuento los detalles."
            );

            if (selectedValue === "4") {
              oferta4.mensaje();
              break;
            }
            case "5":
              alert(
                "Perfecto, elegiste el mejor viaje Cultural, a continuacion te cuento los detalles."
              );

              if (selectedValue === "5") {
                oferta5.mensaje();
                break;
              }

              default:
                alert(
                  "Creo que no entendi lo que escribiste, podrias verificar que el nuemro de opcion sea la correcta?"
                );
  }

  alert(
    "A continuacion te detallamos todos los destinos nacionales a los que podes acceder"
  );
  const destinoNacional = [
    "San Fernando del Valle de Catamarca ",
    "Resistencia ",
    "Rawson ",
    "Córdoba ",
    "Corrientes ",
    "Paraná ",
    "Formosa ",
    "San Salvador de Jujuy ",
    "Santa Rosa ",
    "La Rioja ",
    "Mendoza ",
    "Posadas ",
    "Neuquén ",
    "Viedma ",
    "Salta ",
    "San Juan ",
    "San Luis ",
    "Río Gallegos ",
    "Santa Fe ",
    "Santiago del Estero ",
    "Ushuaia ",
    "San Miguel de Tucumán ",
  ];

  alert(destinoNacional.join("\n"));
  alert(
    "te lo ordeno alfabeticamente para que sea mas facil encontrar tu destino"
  );
  alert(destinoNacional.sort());

  const nuevosDestinos = document.getElementById("nuevosDestinos");
  for (let i = 0; i < destinoNacional.length; i++) {
    const li = document.createElement("li");
    li.textContent = destinoNacional[i];
    nuevosDestinos.appendChild(li);
    console.log(nuevosDestinos);
  }
}
const tituloPrincipal = document.getElementById("tituloPrincipal");

tituloPrincipal.innerText = " Viajamos a donde quieras !!!";

const noDerechos = document.getElementById("noDerechos");

noDerechos.innerText =
  " No todos los derechos son reservados, algunos si otros no. jajaja ";

function btnInfoTipo() {
  swal({
    title: " Mail Enviado  ",
    text: "Te enviamos toda la informacion requerida a tu mail registrado. Muchas gracias por elegirnos.",
    icon: "success",
  });
}

guardarEnLocalStorage();

function guardarEnLocalStorage() {
  let personaRegistro = {
    nombre: document.getElementById("nombreRegistro").value,

    correo: document.getElementById("emailRegistro").value,

    residencia: document.getElementById("paisDeResidencia").value,
  };

  localStorage.setItem("personaRegistro", JSON.stringify(personaRegistro));

  traerLocalstorage();

  function traerLocalstorage() {
    let personaRegistro = JSON.parse(localStorage.getItem("personaRegistro"));

    console.log(personaRegistro);
  }
}


//me llevo el set de datos almacenados en la constante JSON, a un archivo .json independiente
//Tendré que agregarle las comillas a cada propiedad, porque el archivo .json solo entiende strings
//Resuelto esto, ahora tendré que recurrir a fetch() para leer su contenido e integrarlo en JS
//los archivos .JSON no soportan código JS en su interior. Tenemos que poner una estructura íntegramente JSON
//no variables, no constantes, no condicionales, nada que tenga que ver con JS
//el archivo .JSON simulará un backend que no tenemos, y nos proveerá esa información que nuestra app web necesita

const inputFiltrar = document.querySelector("#filtrar")
const tbody = document.querySelector("tbody")
const URL = "/javascript/ofertas.json"
let arrayOfertas = ""


const obtenerDatos = ()=> {
  fetch(URL)
           .then(response => 
              response.json()
           )
           .then(data => {
              //console.table(data)
              arrayOfertas = data
              //cargoGrillaOfertas() //activarlo primero, luego comentarlo x finally()
           })
            .catch(error => {
               console.error("Se ha producido un error", error)
               arrayOfertas = [{id: "Error al obtener datos", Destino: "", Estadia: "", Precio: ""}]
            }
           )
            .finally(error =>
               cargoGrillaOfertas()
            )
           //cargarOfertas() //Si dejo acá, fuera de la promesa, es probable que me de error
}

const cargoGrillaOfertas = ()=> {
  let detalleTabla = ""
  arrayOfertas.forEach(ofertas => {
        detalleTabla += `<tr>
                          <td>${ofertas.id}</td>
                          <td>${ofertas.Destino}</td>
                          <td>${ofertas.Estadia}</td>
                          <td>${ofertas.Precio}</td>
                       </tr>`
  })
  tbody.innerHTML = detalleTabla
}

document.addEventListener("DOMContentLoaded", obtenerDatos)
  