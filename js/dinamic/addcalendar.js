// calendar
const CLIENT_ID =
  "1094341174854-t8p8304kp54ong589ji8h75pgdoe4d41.apps.googleusercontent.com";
const API_KEY = "AIzaSyChcZwG7p5Cym_Muo75i0HW95qZsMlPXHU";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

var tokenClient;
var gapiInited = false;
var gisInited = false;
function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
}

async function handleAuthClick() {
  const authInfo = JSON.parse(localStorage.getItem("authInfo"));

  if (authInfo && authInfo.accessToken) {
    // Verificar si el token ha caducado
    const now = Date.now() / 1000; // tiempo actual en segundos
    if (authInfo.expiresAt && now >= authInfo.expiresAt) {
      // Si el token ha caducado, solicitar uno nuevo
      await renewAccessToken();
    }

    // Si ya hay un token en el localStorage, inicializa gapi.client con ese token
    gapi.client.setToken({ access_token: authInfo.accessToken });
    console.log(gapi.client);
  } else {
    // Si no hay token en el localStorage, solicitar uno nuevo
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      // Almacena la información de autenticación en localStorage
      const newAuthInfo = {
        accessToken: resp.access_token,
        expiresAt: Date.now() / 1000 + resp.expires_in, // Calcula el tiempo de expiración
        // Puedes agregar más información del usuario si es necesario
      };

      localStorage.setItem("authInfo", JSON.stringify(newAuthInfo));

      // Inicializa gapi.client con el nuevo token
      gapi.client.setToken({ access_token: newAuthInfo.accessToken });
      console.log(gapi.client);
    };

    // Solicitar token de acceso
    tokenClient.requestAccessToken({
      prompt: "consent",
    });
  }
}

async function renewAccessToken() {
  // Solicitar un nuevo token de acceso
  await tokenClient.requestAccessToken({
    prompt: "none", // No se solicitará interacción del usuario si el token ha caducado
  });

  // Obtener la información actualizada del token y almacenarla en localStorage
  const updatedAuthInfo = {
    accessToken: gapi.client.getToken().access_token,
    expiresAt: Date.now() / 1000 + gapi.client.getToken().expires_in,
  };

  localStorage.setItem("authInfo", JSON.stringify(updatedAuthInfo));
}

async function handleSignoutClick() {
  localStorage.removeItem("authInfo");

  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    document.getElementById("content").innerText = "";
    document.getElementById("authorize_button").innerText = "Authorize";
    document.getElementById("signout_button").style.visibility = "hidden";
  }
}

// async function listUpcomingEvents() {
//   try {
//     const request = {
//       calendarId: "primary",
//       timeMin: new Date().toISOString(),
//       showDeleted: false,
//       singleEvents: true,
//       maxResults: 10,
//       orderBy: "startTime",
//     };
//     const response = await gapi.client.calendar.events.list(request);
//     const events = response.result.items;
//     if (!events || events.length == 0) {
//       document.getElementById("content").innerText = "No events found.";
//     } else {
//       const output = events.reduce(
//         (str, event) =>
//           `${str}${event.summary} (${
//             event.start.dateTime || event.start.date
//           })\n`,
//         "Events:\n"
//       );
//       document.getElementById("content").innerText = output;
//     }
//   } catch (err) {
//     document.getElementById("content").innerText = err.message;
//   }
// }

async function createCustomEvent(
  summary,
  eventDescription,
  eventDate,
  eventTime
) {
  const dateTime = `${eventDate}T${eventTime}`;

  try {
    // Verificar si el calendario 'leadslotizador' existe
    let calendarId = await getCalendarId("leadslotizador");
    // console.log(calendarId);
    // return;
    if (!calendarId) {
      // Si el calendario no existe, créalo
      const response = await gapi.client.calendar.calendars.insert({
        resource: {
          summary: "leadslotizador",
        },
      });

      console.log("Calendario creado con ID:", response.result.id);
      // Utiliza el ID del nuevo calendario
      calendarId = response.result.id;
    }

    // Configura el recordatorio de 5 minutos antes del evento
    const reminders = {
      useDefault: false,
      overrides: [
        {
          method: "popup",
          minutes: 5,
        },
        {
          method: "popup",
          minutes: 30,
        },
        {
          method: "email",
          minutes: 30,
        }, // Ejemplo: Correo electrónico 10 minutos antes
        {
          method: "email",
          minutes: 5,
        }, // Ejemplo: Correo electrónico 10 minutos antes
      ],
    };

    // Agrega invitados al evento (reemplaza 'correo1@gmail.com' y 'correo2@gmail.com' con las direcciones de correo de tus invitados)
    // const attendees = [
    //   { email: "correo1@gmail.com" },
    //   { email: "correo2@gmail.com" },
    // ];

    // Utiliza el ID del calendario (existente o recién creado) para
    const request = {
      calendarId: calendarId,
      resource: {
        summary: summary,
        description: eventDescription,
        start: {
          dateTime: dateTime,
          timeZone: "America/Lima",
        },
        end: {
          dateTime: dateTime,
          timeZone: "America/Lima",
        },
        reminders: reminders,
        // attendees: attendees,
      },
    };
    console.log("Detalles de la solicitud:", JSON.stringify(request));
    const response = await gapi.client.calendar.events.insert(request);
    console.log("Event created:", response.result);
  } catch (err) {
    console.error("Error creating event:", err);
  }
}

async function getCalendarId(calendarSummary) {
  try {
    const response = await gapi.client.calendar.calendarList.list();
    const calendars = response.result.items;
    console.log(response);

    for (const calendar of calendars) {
      if (calendar.summary === calendarSummary) {
        return calendar.id;
      }
    }

    // El calendario no fue encontrado
    return null;
  } catch (err) {
    console.error("Error getting calendar ID:", err);
    return null;
  }
}
