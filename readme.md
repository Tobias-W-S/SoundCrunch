Er is opeens een bug gekomen waardoor de connectie met de firebase raar doet, dit kan "gefixt" worden door in VSC te updaten, of opnieuw in te loggen
het kan ook via een actie uitvoeren die de app updated, bijvoorbeeld user data aanpassen

Alle onderdelen:

auth.jsx -- Authenticatie van firestore
App.jsx -- Main page, dit wordt gebruikt als main, hier worden belangrijke functies uitgevoerd zoals het checken en uitvoeren van inlog systemen. Hier maakt die ook nieuwe users en de data aan als de user nog niet bestaat. Dit werkt ook als de universele navigatie van de project
home.jsx -- De home pagina, hier wordt je automatisch geredirect als je ingelogd bent, bevat alle data van de ingelogde user en kan je data bewerken.
login.jsx -- een pagina als je niet ingelogd bent.
discover.jsx -- De pagina om andere users te vinden die niet als privé zijn gezet. Hier kan je ook een song/soundbyte ophalen van een willekeurige user en andere users liken/blocken.
neighbour.jsx -- functioneel hetzelfde als home.jsx, met maar 2 verschillen: je kan niks aanpassen op deze page en het haalt data op van een andere user. 
chats.jsx -- Oorspronkelijk de pagina waar je met andere users kan chatten.