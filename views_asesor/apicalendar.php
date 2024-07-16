<!DOCTYPE html>
<html>

<head>
    <title>Google Calendar API Quickstart</title>
    <meta charset="utf-8" />
</head>

<body>
    <p>Google Calendar API Quickstart</p>

    <!-- Add buttons to initiate auth sequence and sign out -->
    <button id="authorize_button" onclick="handleAuthClick()">Authorize</button>
    <button id="signout_button" onclick="handleSignoutClick()">Sign Out</button>

    <h2>Create Event</h2>
    <form id="eventForm">
        <label for="eventDate">Date:</label>
        <input type="date" id="eventDate" required>

        <label for="eventTime">Time:</label>
        <input type="time" id="eventTime" required>

        <label for="eventDescription">Description:</label>
        <input type="text" id="eventDescription" required>
        <button type="button" onclick="createCustomEvent()">Create Event</button>

    </form>

    <h2>Upcoming Events</h2>
    <pre id="content" style="white-space: pre-wrap;"></pre>

    <script type="text/javascript">
        /* exported gapiLoaded */
        /* exported gisLoaded */
        /* exported handleAuthClick */
        /* exported handleSignoutClick */

        const CLIENT_ID = '1094341174854-t8p8304kp54ong589ji8h75pgdoe4d41.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyChcZwG7p5Cym_Muo75i0HW95qZsMlPXHU';
        const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
        const SCOPES = 'https://www.googleapis.com/auth/calendar';

        let tokenClient;
        let gapiInited = false;
        let gisInited = false;

        document.getElementById('authorize_button').style.visibility = 'hidden';
        document.getElementById('signout_button').style.visibility = 'hidden';

        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }

        async function initializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            gapiInited = true;
            maybeEnableButtons();
        }

        function gisLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });
            gisInited = true;
            maybeEnableButtons();
        }

        function maybeEnableButtons() {
            if (gapiInited && gisInited) {
                document.getElementById('authorize_button').style.visibility = 'visible';
            }
        }

        function handleAuthClick() {
            tokenClient.callback = async (resp) => {
                if (resp.error !== undefined) {
                    throw (resp);
                }
                document.getElementById('signout_button').style.visibility = 'visible';
                document.getElementById('authorize_button').innerText = 'Refresh';
                await listUpcomingEvents();
            };

            if (gapi.client.getToken() === null) {
                tokenClient.requestAccessToken({
                    prompt: 'consent'
                });
            } else {
                tokenClient.requestAccessToken({
                    prompt: ''
                });
            }
        }

        function handleSignoutClick() {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
                document.getElementById('content').innerText = '';
                document.getElementById('authorize_button').innerText = 'Authorize';
                document.getElementById('signout_button').style.visibility = 'hidden';
            }
        }

        async function listUpcomingEvents() {
            try {
                const request = {
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime',
                };
                const response = await gapi.client.calendar.events.list(request);
                const events = response.result.items;
                console.log(events)
                if (!events || events.length == 0) {
                    document.getElementById('content').innerText = 'No events found.';
                } else {
                    const output = events.reduce(
                        (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
                        'Events:\n');
                    document.getElementById('content').innerText = output;
                }
            } catch (err) {
                document.getElementById('content').innerText = err.message;
            }
        }

        async function createCustomEvent() {
            const eventDate = document.getElementById('eventDate').value;
            const eventTime = document.getElementById('eventTime').value;
            const eventDescription = document.getElementById('eventDescription').value;

            const dateTime = `${eventDate}T${eventTime}:00`;

            try {
                // Verificar si el calendario 'leadslotizador' existe
                let calendarId = await getCalendarId('leadslotizador');

                if (!calendarId) {
                    // Si el calendario no existe, créalo
                    const response = await gapi.client.calendar.calendars.insert({
                        resource: {
                            summary: 'leadslotizador'
                        }
                    });

                    console.log('Calendario creado con ID:', response.result.id);
                    // Utiliza el ID del nuevo calendario
                    calendarId = response.result.id;
                }

                // Utiliza el ID del calendario (existente o recién creado) para crear el evento
                console.log(calendarId)
                // Configura el recordatorio de 5 minutos antes del evento
                const reminders = {
                    'useDefault': false,
                    'overrides': [{
                            'method': 'popup',
                            'minutes': 5
                        },
                        {
                            'method': 'email',
                            'minutes': 5
                        }, // Ejemplo: Correo electrónico 10 minutos antes
                    ],
                };
                // Agrega invitados al evento (reemplaza 'correo1@gmail.com' y 'correo2@gmail.com' con las direcciones de correo de tus invitados)
                const attendees = [{
                        'email': 'jbohorquez2299@gmail.com'
                    },
                    {
                        'email': 'smithvm127@gmail.com'
                    },
                    {
                        'email': 'vivelainmobiliaria19@gmail.com'
                    }
                ];
                const request = {
                    'calendarId': calendarId,
                    'resource': {
                        'summary': eventDescription,
                        'start': {
                            'dateTime': dateTime,
                            'timeZone': 'America/Lima',
                        },
                        'end': {
                            'dateTime': dateTime,
                            'timeZone': 'America/Lima',
                        },
                        'reminders': reminders,
                        'attendees': attendees,
                    },
                };

                const response = await gapi.client.calendar.events.insert(request);
                console.log('Event created:', response.result);

                // Actualiza la lista de eventos después de crear el evento
                await listUpcomingEvents();
            } catch (err) {
                console.error('Error creating event:', err);
            }
        }

        async function getCalendarId(calendarSummary) {
            try {
                const response = await gapi.client.calendar.calendarList.list();
                const calendars = response.result.items;
                console.log(calendars)

                const matchingCalendar = calendars.find(calendar => calendar.summary === calendarSummary);

                return matchingCalendar ? matchingCalendar.id : null;
            } catch (err) {
                console.error('Error getting calendar ID:', err);
                return null;
            }
        }

        async function createCalendar(calendarSummary) {
            try {
                const response = await gapi.client.calendar.calendars.insert({
                    resource: {
                        summary: calendarSummary
                    }
                });

                return response.result.id;
            } catch (err) {
                console.error('Error creating calendar:', err);
                return null;
            }
        }
    </script>
    <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
    <script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>
</body>

</html>