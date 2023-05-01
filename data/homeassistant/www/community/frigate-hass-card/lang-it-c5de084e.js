var e={frigate_card:"Frigate card",frigate_card_description:"Una scheda Lovelace per l'uso con Frigate",live:"Live",no_media:"Nessun contenuto multimediale da visualizzare",recordings:"Registrazioni",version:"Versione"},i={cameras:{camera_entity:"Entità della telecamera",dependencies:{all_cameras:"Mostra eventi per tutte le telecamere con questa telecamera",cameras:"Mostra eventi per telecamere specifiche con questa telecamera",editor_label:"Opzioni di dipendenza"},engines:{editor_label:"Opzioni del motore della fotocamera"},frigate:{camera_name:"Nome della telecamera frigate (autodificato dall'entità)",client_id:"ID client Frigate (per > 1 Frigate server)",editor_label:"Frigate Opzione",labels:"Etichette per fregate/filtri per oggetti",url:"Frigate URL del server",zones:"Frigate Zone"},go2rtc:{editor_label:"Opzioni go2rtc",modes:{editor_label:"Modalità go2rtc",mjpeg:"JPEG animato (MJPEG)",mp4:"MPEG-4 (MP4)",mse:"Estensioni sorgente multimediale (MSE)",webrtc:"Comunicazione Web in tempo reale (WebRTC)"},stream:"nome del flusso go2rtc"},hide:"Nascondi la videocamera dall'interfaccia utente",icon:"Icona per questa telecamera (Autoidentificato dall'entità)",id:"ID univoco per questa telecamera in questa carta",image:{editor_label:"Opzioni immagine",refresh_seconds:"Numero di secondi dopo i quali aggiornare l'immagine live (0=mai)",url:"URL dell'immagine da utilizzare al posto dell'istantanea dell'entità fotocamera"},live_provider:"Provider di visualizzazione dal vivo per questa telecamera",live_provider_options:{editor_label:"Opzioni del fornitore in tempo reale"},live_providers:{auto:"Automatica",go2rtc:"go2rtc",ha:"Streaming video di Home Assistant (ovvero HLS, LL-HLS, WebRTC tramite HA)",image:"Immagini Home Assistant",jsmpeg:"JSMpeg","webrtc-card":"Scheda WebRTC (ovvero la scheda WebRTC di Alexxit)"},motioneye:{editor_label:"Opzioni di MotionEye",images:{directory_pattern:"Modello di directory delle immagini",file_pattern:"Modello di file di immagini"},movies:{directory_pattern:"Modello di directory dei film",file_pattern:"Modello di file di film"},url:"URL dell'interfaccia utente di MotionEye"},title:"Titolo per questa telecamera (Autoidentificato dall'entità)",triggers:{editor_label:"Trigger Opzioni",entities:"Trigger da altre entità",motion:"Trigger rilevando automaticamente dal sensore di movimento",occupancy:"Attivare rilevando automatico tramite il sensore di presenza"},webrtc_card:{editor_label:"Opzioni della scheda WebRTC",entity:"Entità della telecamera della scheda WebRTC (non una telecamera Frigate)",url:"URL della telecamera della scheda WebRTC"}},common:{controls:{filter:{editor_label:"Filtro multimediale",mode:"Modalità filtro",modes:{left:"Filtro multimediale in un cassetto a sinistra",none:"Nessun filtro multimediale",right:"Filtro multimediale in un cassetto a destra"}},next_previous:{editor_label:"Successivo e precedente",size:"Successiva e Precedenti dimensioni di controllo nei pixel",style:"Stile di controllo successivo e precedente",styles:{chevrons:"Chevrons",icons:"Icone",none:"Nessuno",thumbnails:"Miniature"}},thumbnails:{editor_label:"Miniature",media:"Se mostrare miniature di clip o istantanee",medias:{clips:"Miniature di clip",snapshots:"Miniature istantanee"},mode:"Modalità miniatura",modes:{above:"Miniature sopra",below:"Miniature sotto",left:"Miniature in un cassetto a sinistra",none:"Nessuna miniatura",right:"Miniature in un cassetto a destra"},show_details:"Mostra i dettagli con le miniature",show_download_control:"Mostra il controllo del download sulle miniature",show_favorite_control:"Mostra il controllo preferito sulle miniature",show_timeline_control:"Mostra il controllo della sequenza temporale sulle miniature",size:"Dimensione delle miniature in pixel"},timeline:{editor_label:"Mini Cronologia",mode:"Modalità",modes:{above:"sopra",below:"sotto",none:"sessuna"}},title:{duration_seconds:"Secondi per visualizzare il titolo popup (0 = per sempre)",editor_label:"Controlli titolo popup",mode:"Modalità di visualizzazione del titolo",modes:{none:"Nessuna visualizzazione del titolo","popup-bottom-left":"Popup in basso a sinistra","popup-bottom-right":"Popup in basso a destra","popup-top-left":"Popup in alto a sinistra","popup-top-right":"Popup in alto a destra"}}},layout:{fit:"Adatta al layout",fits:{contain:"Il supporto è contenuto/in cassetta delle lettere",cover:"Il supporto si espande proporzionalmente per coprire la scheda",fill:"Il supporto viene allungato per riempire la scheda"},position:{x:"Percentuale di posizionamento orizzontale",y:"Percentuale di posizionamento verticale"}},media_action_conditions:{all:"Tutte le opportunità",hidden:"Sul browser/nascondere le schede",never:"Mai",selected:"Sulla selezione",unselected:"Sulla non selezione",visible:"Sul browser/visibilità della scheda"},timeline:{clustering_threshold:"Il conteggio degli eventi in cui sono raggruppati (0 = nessun clustering)",media:"I media vengono visualizzati la sequenza temporale",medias:{all:"Tutti i tipi di media",clips:"Clip",snapshots:"Istantanee"},show_recordings:"Mostra registrazioni",style:"",styles:{ribbon:"",stack:""},window_seconds:"La lunghezza predefinita della vista della sequenza temporale in secondi"}},dimensions:{aspect_ratio:"Proporzioni predefinite (ad es. '16:9')",aspect_ratio_mode:"Modalità proporzioni",aspect_ratio_modes:{dynamic:"Le proporzioni si adattano ai media",static:"Proporzioni statiche",unconstrained:"Proporzioni non vincolate"},max_height:"",min_height:""},image:{layout:"Disposizione dell'immagine",mode:"Modalità Visualizza immagine",modes:{camera:"Istantanea della telecamera di Home Assistant dell'entità telecamera",screensaver:"Logo Frigate incorporato",url:"Immagine arbitraria specificata dall'URL"},refresh_seconds:"Numero di secondi dopo i quali aggiornare (0 = mai)",url:"URL di immagine statica per la vista dell'immagine"},live:{auto_mute:"Muta automaticamente le telecamere in diretta",auto_pause:"Metti in pausa automaticamente le telecamere in diretta",auto_play:"Gioca automaticamente le telecamere dal vivo",auto_unmute:"Riattiva automaticamente l'audio delle telecamere live",controls:{editor_label:"Controlli dal vivo"},draggable:"Il Visualizzatore eventi può essere trascinato oppure puoi scorrere",layout:"Disposizione dal vivo",lazy_load:"Le telecamere dal vivo sono pigramente cariche",lazy_unload:"Le telecamere dal vivo sono pigramente non caricate",preload:"Precarica Live View in background",show_image_during_load:"Mostra un'immagine fissa durante il caricamento del live streaming",transition_effect:"Effetto di transizione della telecamera dal vivo"},media_viewer:{auto_mute:"Muta automaticamente i media",auto_pause:"Metti in Pausa automaticamente i media",auto_play:"Riproduci automaticamente i contenuti multimediali",auto_unmute:"Riattiva automaticamente i contenuti multimediali",controls:{editor_label:"Controlli di visualizzatore multimediale"},draggable:"Il visualizzatore multimediale può essere trascinato oppure può scorrere",layout:"Layout del visualizzatore multimediale",lazy_load:"Il media Viewer viene caricato pigramente nel carosello",transition_effect:"Effetto di transizione del visualizzatore multimediale",transition_effects:{none:"Nessuna transizione",slide:"Transizione diapositiva"}},menu:{alignment:"Allineamento dei menu",alignments:{bottom:"Allineato al fondo",left:"Allineato a sinistra",right:"Allineato a destra",top:"Allineato in cima"},button_size:"Dimensione del pulsante menu in pixel",buttons:{alignment:"Allineamento dei pulsanti",alignments:{matching:"Corrispondenza con l'allineamento del menu",opposing:"Contrastare l'allineamento del menu"},camera_ui:"Interfaccia utente della fotocamera",cameras:"Telecamere",clips:"Clip",download:"Download",enabled:"Pulsante abilitato",expand:"Espandere",frigate:"Frigate menu / Visualizzazione predefinita",fullscreen:"A schermo intero",icon:"Icona",image:"Immagine",live:"Abitare",media_player:"Invia a Media Player",priority:"Priorità",snapshots:"Istantanee",substreams:"Flusso/i secondario/i",timeline:"Timeline"},position:"Posizione del menu",positions:{bottom:"Posizionato sul fondo",left:"Posizionato a sinistra",right:"Posizionato a destra",top:"Posizionato in alto"},style:"Stile menu",styles:{hidden:"Menu nascosto",hover:"Menu al passaggio del mouse",none:"Nessun menu",outside:"Menu esterno",overlay:"Menu di overlay"}},overrides:{info:"Questa configurazione della scheda ha specificato manualmente le sostituzioni configurate che possono sostituire i valori mostrati nell'editor visivo, consultare l'editor di codice per visualizzare/modificare queste sostituzioni"},performance:{features:{animated_progress_indicator:"Indicatore di avanzamento animato",editor_label:"Opzioni funzionalità",media_chunk_size:"Dimensione del blocco multimediale"},profile:"Profilo delle prestazioni",profiles:{high:"Prestazioni alte",low:"Prestazioni basse"},style:{border_radius:"Curve",box_shadow:"Ombre",editor_label:"Opzione di stile"},warning:"Questa scheda è in modalità basso profilo, quindi le impostazioni predefinite sono state modificate per ottimizzare le prestazioni"},view:{camera_select:"Visualizza per le telecamere appena selezionate",dark_mode:"Tema scuro",dark_modes:{auto:"auto",off:"Off",on:"On"},default:"Visualizzazione predefinita",scan:{enabled:"Modalità di scansione abilitata",scan_mode:"Modalità di scansione",show_trigger_status:"Mostra bordo pulsante quando attivato",untrigger_reset:"Reset the view to default after untrigger",untrigger_seconds:"Reimposta la vista ai valori predefiniti dopo aver annullato l'attivazione"},timeout_seconds:"Ripristina la vista predefinita x secondi dopo l'azione dell'utente (0 = mai)",update_cycle_camera:"Scorri le telecamere quando si aggiorna la visualizzazione predefinita",update_force:"Aggiornamenti della scheda forza (ignora l'interazione dell'utente)",update_seconds:"Aggiorna la visualizzazione predefinita ogni x secondi (0 = mai)",views:{clip:"Clip più recente",clips:"Galleria delle clip",current:"Vista corrente",image:"Immagine statica",live:"Dal vivo",snapshot:"Snapshot più recente",snapshots:"Galleria delle istantanee",timeline:"Vista della timeline"}}},a={add_new_camera:"Aggiungi nuova telecamera",button:"Pulsante",camera:"Telecamera",cameras:"Telecamere",cameras_secondary:"Quali telecamere visualizzare su questa card",delete:"Elimina",dimensions:"Dimensioni",dimensions_secondary:"Dimensioni e opzioni di forma",image:"Immagine",image_secondary:"Opzioni di visualizzazione dell'immagine statica",live:"Live",live_secondary:"Opzioni di visualizzazione della telecamera live",media_gallery:"Galleria multimediale",media_gallery_secondary:"Opzioni della galleria multimediale",media_viewer:"Visualizzatore dei media",media_viewer_secondary:"Visualizzatore per supporti statici (clip, istantanee o registrazioni)",menu:"Menu",menu_secondary:"Opzioni di aspetto e funzionalità del menu",move_down:"Sposta verso il basso",move_up:"Sposta verso l'alto",overrides:"La sovrascrittura è attiva",overrides_secondary:"Rilevate sovrascritture della configurazione dinamica",timeline:"Timeline",timeline_secondary:"Opzioni della timeline degli eventi",upgrade:"Aggiornamento",upgrade_available:"È disponibile un aggiornamento della configurazione della scheda automatica",view:"Visualizzazione",view_secondary:"Cosa dovrebbe mostrare la carta e come mostrarla"},o={ptz:{down:"Giù",home:"Home",left:"Sinistra",right:"Destra",up:"Su",zoom_in:"Ingrandire",zoom_out:"Zoom indietro"}},t={could_not_render_elements:"Impossibile renderizzare gli elementi dell'immagine",could_not_resolve:"Impossibile risolvere l'URL dei media",diagnostics:"Diagnostica delle carte.Si prega di rivedere per informazioni riservate prima di condividere",download_no_media:"Nessun media da scaricare",download_sign_failed:"Impossibile firmare URL multimediale per il download",duplicate_camera_id:"Duplicato ID dellla telecamera Frigate, utilizzare il parametro 'ID' per identificare in modo univoco le telecamere",empty_response:"Ricevuto risposta vuota da Home Assistant per la richiesta",failed_response:"Impossibile ricevere risposta da Home Assistant per la richiesta",failed_retain:"Impossibile conservare l'evento",failed_sign:"Impossibile firmare l'URL ad Home Assistant",image_load_error:"L'immagine non può essere caricata",invalid_configuration:"Configurazione non valida",invalid_configuration_no_hint:"Nessun suggerimento di posizione disponibile (tipo difettoso o mancante?)",invalid_elements_config:"Configurazione degli elementi di immagine non valida",invalid_response:"Ricevuta una risposta non valida da Home Assistant per la richiesta",jsmpeg_no_player:"Impossibile avviare JSMPEG Player",live_camera_no_endpoint:"Impossibile ottenere l'endpoint della videocamera per questo provider live (configurazione incompleta?)",live_camera_not_found:"La telecamera configurata non è stata trovata",live_camera_unavailable:"Telecamera non disponibile",no_camera_engine:"Impossibile determinare il motore adatto per la fotocamera",no_camera_entity:"Impossibile trovare l'entità fotocamera",no_camera_entity_for_triggers:"È necessaria un'entità telecamera per rilevare automaticamente i trigger",no_camera_id:"Impossibile determinare l'ID della telecamera , potrebbe essere necessario impostare manualmente il parametro 'ID'",no_camera_name:"Impossibile determinare un nome della telecamera in Frigate, si prega di specificare 'camera_enty' o 'camera_name'",no_live_camera:"Il parametro fotocamera_enty deve essere impostato e valido per questo provider live",no_visible_cameras:"Nessuna telecamera visibile trovata, è necessario configurare almeno una telecamera non nascosta",reconnecting:"Riconnessione",timeline_no_cameras:"Nessuna telecamera damostrare in Frigate nella timeline",troubleshooting:"Controllare la risoluzione dei problemi",unknown:"Errore sconosciuto",upgrade_available:"È disponibile un aggiornamento di configurazione della scheda automatizzato, visitare l'editor di schede visive",webrtc_card_reported_error:"La scheda WebRTC ha riportato un errore",webrtc_card_waiting:"Aspettando che la scheda WebRTC si carichi ..."},n={camera:"Camera",duration:"Durata",in_progress:"In corso",score:"Punteggio",seek:"Cercare",start:"Avvia",what:"Che cosa",where:"Dove"},r={all:"Tutto",camera:"Telecamera",favorite:"Preferito",media_type:"Tipo di supporto",media_types:{clips:"Clip",recordings:"Registrazioni",snapshots:"Istantanee"},not_favorite:"Non preferito",select_camera:"Seleziona fotocamera...",select_favorite:"Seleziona preferito...",select_media_type:"Seleziona il tipo di supporto...",select_what:"Seleziona cosa...",select_when:"Seleziona quando...",select_where:"Seleziona dove...",tag:"Tag",what:"Che cosa",when:"Quando",whens:{past_month:"Mese scorso",past_week:"Settimana scorso",today:"Oggi",yesterday:"Ieri"},where:"Dove"},l={camera:"Camera",duration:"Durata",events:"Eventi",in_progress:"In corso",seek:"Cercare",start:"Inizio"},s={no_thumbnail:"Nessuna miniatura disponibile",retain_indefinitely:"L'evento sarà mantenuto indefinitamente",timeline:"Vedi evento nella timeline"},d={pan_behavior:{pan:"",seek:"","seek-in-media":""},select_date:"Scegli la data"},m={common:e,config:i,editor:a,elements:o,error:t,event:n,media_filter:r,recording:l,thumbnail:s,timeline:d};export{e as common,i as config,m as default,a as editor,o as elements,t as error,n as event,r as media_filter,l as recording,s as thumbnail,d as timeline};
