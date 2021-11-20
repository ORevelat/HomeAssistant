
var CONFIG = {
   customTheme: CUSTOM_THEMES.TRANSPARENT, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.NORMAL, //SMALL, BIG are available
   tileSize: 150,
   tileMargin: 6,
   serverUrl: SECRETS.serverUrl,
   wsUrl: SECRETS.wsUrl,
   authToken: SECRETS.authToken, // optional long-lived token (CAUTION: only if TileBoard is not exposed to the internet)
   //googleApiKey: "XXXXXXXXXX", // Required if you are using Google Maps for device tracker
   //mapboxToken: "XXXXXXXXXX", // Required if you are using Mapbox for device tracker
   debug: false, // Prints entities and state change info to the console.
   pingConnection: true, //ping connection to prevent silent disconnections
   locale: 'en-us', // locale for date and number formats - available locales: it, de, es, fr, pt, ru, nl, pl, en-gb, en-us (default). See readme on adding custom locales.
   // next fields are optional
   events: [],
   timeFormat: 24,
   menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
   hideScrollbar: false, // horizontal scrollbar
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // HORIZONTALLY, VERTICALLY, GRID
   onReady: function () {},

   header: {
      styles: {
         padding: '30px 130px 0',
         fontSize: '28px'
      },
      right: [],
      left: [
         {
            type: HEADER_ITEMS.DATETIME,
            dateFormat: 'EEEE, dd LLLL',
         }
      ]
   },

   screensaver: {
      timeout: 60,
      slidesTimeout: 30,
      styles: { fontSize: '40px' },
      leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }],
      slides: [
         {
            bg: 'images/bg5.jpg',
            rightTop: [
               {
                  type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                  html: 'Domotique',
                  styles: { fontSize: '40px' }
               }
            ]
         }
      ]
   },

   pages: [
      {
         title: 'Main page',
         bg: 'images/bg5.jpg',
         icon: 'mdi-home-outline',
         groups: [
            {
               title: '',
               height: 3,
               width: 2,
               items: [
                  {
                     position: [0, 0],
                     height: 1,
                     width: 2,
                     type: TYPES.WEATHER,
                     classes: ['-compact'],
                     id: 'weather.auribeau_sur_siagne',
                     title: 'Météo',
                     state: '',
                     icons: {
                        'clear-day': 'clear',
                        'clear-night': 'nt-clear',
                        'cloudy': 'cloudy',
                        'rain': 'rain',
                        'sleet': 'sleet',
                        'snow': 'snow',
                        'wind': 'hazy',
                        'fog': 'fog',
                        'partly-cloudy-day': 'partlycloudy',
                        'partly-cloudy-night': 'nt-partlycloudy'
                     },
                     fields: {
                        summary: '@state',
                        temperature: '@attributes.temperature',
                        temperatureUnit: '°',
                        windSpeed: '@attributes.wind_speed',
                        windSpeedUnit: 'Km/h',
                        humidity: '@attributes.humidity',
                        humidityUnit: '%',
                     }
                  }
               ]
            },
            {
               title: '',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 1.5,
                     height: 1.5,
                     title: 'Consommation',
                     subtitle: '',
                     type: TYPES.GAUGE,
                     id: 'sensor.smart_meter_electric_consumed_w',
                     value: function (item, entity) {
                        return entity.state;
                     },
                     state: false,
                     settings: {
                        size: 200,
                        type: 'semi',
                        min: 0,
                        max: 10000,
                        append: '@attributes.unit_of_measurement',
                        duration: 1500,
                        thresholds: { 0: { color: 'green' }, 4500: { color: 'red' }, 9000: { color: 'red' } },
                        fractionSize: 0
                     },
                  },
                  {
                     position: [2, 0],
                     height: 1,
                     width: 1.5,
                     type: TYPES.CUSTOM,
                     id: {},
                     title: 'Allumées',
                     subtitle: 'Lumières',
                     action: function (item, entity) {
                        window.openPage(CONFIG.pages[2]);
                     },
                     icon: function () {
                        var lights = [
                           "&light.lumiere_bureau_current_value.state",
                           "&light.lumiere_entree_current_value.state",
                           "&light.lumiere_escalier_current_value.state",
                           "&light.lumiere_chambre_parents_current_value.state",
                           "&light.lumiere_salle_a_manger_current_value.state",
                           "&light.lumiere_salle_de_bain_current_value.state",
                           "&light.lumiere_salon_current_value.state",
                           "&light.lumiere_chambre_thea_current_value.state",
                           "&light.led_chambre_thea.state",
                           "&switch.sonoff_riviere_a.state",
                           "&switch.sonoff_4ch_jardin_4.state"
                        ];

                        var count = 0;
                        for (i = 0; i < lights.length; i++) {
                           if (this.parseFieldValue(lights[i]) === "on") {
                              count++;
                           }
                        }

                        switch (count) {
                           case 0: return 'mdi-numeric-0-circle-outline';
                           case 1: return 'mdi-numeric-1-circle-outline';
                           case 2: return 'mdi-numeric-2-circle-outline';
                           case 3: return 'mdi-numeric-3-circle-outline';
                           case 4: return 'mdi-numeric-4-circle-outline';
                           case 5: return 'mdi-numeric-5-circle-outline';
                           case 6: return 'mdi-numeric-6-circle-outline';
                           case 7: return 'mdi-numeric-7-circle-outline';
                           case 8: return 'mdi-numeric-8-circle-outline';
                           case 9: return 'mdi-numeric-9-circle-outline';
                           default: return 'mdi-numeric-9-plus-circle-outline';
                        }
                     }
                  },
                  {
                     position: [2, 1],
                     height: 1,
                     width: 1.5,
                     type: TYPES.CUSTOM,
                     id: {},
                     title: 'Allumées',
                     subtitle: 'Prises',
                     action: function (item, entity) {
                        window.openPage(CONFIG.pages[3]);
                     },
                     icon: function () {
                        var lights = [
                           "&switch.sonoff_garage_portail.state",
                           "&switch.sonoff_4ch_jardin_1.state",
                           "&switch.sonoff_4ch_jardin_2.state",
                           "&switch.sonoff_4ch_jardin_3.state",
                           "&switch.shelly25_jardin_channel_1.state",
                           "&switch.shelly25_arrosage_channel_1.state",
                           "&switch.shelly25_arrosage_channel_2.state",
                           "&switch.prise_tv_hifi_current_value.state",
                           "&switch.sonoff_salon.state",
                           "&switch.sonoff_bibliotheque_haut.state",
                           "&switch.prise_tv_current_value.state",
                           "&switch.sonoff_cuisine.state"
                        ];

                        var count = 0;
                        for (i = 0; i < lights.length; i++) {
                           if (this.parseFieldValue(lights[i]) === "on") {
                              count++;
                           }
                        }

                        switch (count) {
                           case 0: return 'mdi-numeric-0-circle-outline';
                           case 1: return 'mdi-numeric-1-circle-outline';
                           case 2: return 'mdi-numeric-2-circle-outline';
                           case 3: return 'mdi-numeric-3-circle-outline';
                           case 4: return 'mdi-numeric-4-circle-outline';
                           case 5: return 'mdi-numeric-5-circle-outline';
                           case 6: return 'mdi-numeric-6-circle-outline';
                           case 7: return 'mdi-numeric-7-circle-outline';
                           case 8: return 'mdi-numeric-8-circle-outline';
                           case 9: return 'mdi-numeric-9-circle-outline';
                           default: return 'mdi-numeric-9-plus-circle-outline';
                        }
                     }
                  },
                  {
                     position: [4, 0],
                     width: 1,
                     type: TYPES.DEVICE_TRACKER,
                     id: 'device_tracker.hass_olivier',
                     title: 'Olivier',
                     map: 'yandex',
                     states: {
                        home: "Home",
                        not_home: "Away",
                        office: "Office",
                     },
                     zoomLevels: [9, 13, 16],
                     hideEntityPicture: false,
                     slidesDelay: 2
                  },
                  {
                     position: [4, 1],
                     width: 1,
                     type: TYPES.DEVICE_TRACKER,
                     id: 'device_tracker.hass_sandrine',
                     map: 'yandex',
                     title: 'Sandrine',
                     states: {
                        home: "Home",
                        not_home: "Away",
                        office: "Office",
                     },
                     zoomLevels: [9, 13, 16],
                     hideEntityPicture: false,
                     slidesDelay: 2
                  }
               ]
            }
         ]
      },
      {
         title: 'Températures',
         bg: 'images/bg5.jpg',
         icon: 'mdi-temperature-celsius',
         tileSize: 120,
         groups: [
            {
               title: 'Extérieur',
               width: 1,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     height: 1.25,
                     type: TYPES.SENSOR,
                     title: 'Jardin',
                     subtitle: 'Humidité ' + '&sensor.thermometer_jardin_humidity.state' + '&sensor.thermometer_jardin_humidity.attributes.unit_of_measurement',
                     id: 'sensor.thermometer_jardin_temperature',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  }
               ]
            },
            {
               title: 'Rez de chaussée',
               width: 1,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     height: 1.25,
                     type: TYPES.SENSOR,
                     title: 'Salon',
                     id: 'sensor.thermometer_salon_temperature',
                     subtitle: 'Humidité ' + '&sensor.thermometer_salon_humidity.state' + '&sensor.thermometer_salon_humidity.attributes.unit_of_measurement',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [0, 1.25],
                     type: TYPES.SENSOR,
                     height: 1.25,
                     title: 'Salle à manger',
                     id: 'sensor.sallemanger_air_temperature',
                     subtitle: 'Luminosité ' + '&sensor.sallemanger_illuminance.state' + '&sensor.sallemanger_illuminance.attributes.unit_of_measurement',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [0, 2.50],
                     height: 1.25,
                     type: TYPES.SENSOR,
                     title: 'Garage',
                     id: 'sensor.thermometer_garage_temperature',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  }
               ]
            },
            {
               title: 'Etage',
               width: 3,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.SENSOR,
                     height: 1.25,
                     title: 'Couloir',
                     id: 'sensor.detecteur_escalier_air_temperature',
                     subtitle: 'Luminosité ' + '&sensor.detecteur_escalier_illuminance.state' + '&sensor.detecteur_escalier_illuminance.attributes.unit_of_measurement',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [1, 0],
                     type: TYPES.SENSOR,
                     height: 1.25,
                     title: 'Salle de bain',
                     id: 'sensor.salle_de_bain_thermometer_temperature',
                     subtitle: 'Humidité ' + '&sensor.salle_de_bain_thermometer_humidity.state' + '&sensor.salle_de_bain_thermometer_humidity.attributes.unit_of_measurement',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [1, 1.25],
                     type: TYPES.SENSOR,
                     height: 1.25,
                     title: 'Bureau',
                     id: 'sensor.thermometer_bureau_temperature',
                     subtitle: 'Humidité ' + '&sensor.thermometer_bureau_humidity.state' + '&sensor.thermometer_bureau_humidity.attributes.unit_of_measurement',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [2, 0],
                     type: TYPES.SENSOR,
                     height: 1.25,
                     title: 'Chambre Parents',
                     id: 'sensor.thermometer_chambre_parents_temperature',
                     subtitle: 'Humidité ' + '&sensor.thermometer_chambre_parents_humidity.state' + '&sensor.thermometer_chambre_parents_humidity.attributes.unit_of_measurement',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [2, 1.25],
                     type: TYPES.SENSOR,
                     height: 1.25,
                     title: 'Chambre Théa',
                     id: 'sensor.thermometer_chambre_thea_temperature',
                     subtitle: 'Humidité ' + '&sensor.thermometer_chambre_thea_humidity.state' + '&sensor.thermometer_chambre_thea_humidity.attributes.unit_of_measurement',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  }
               ]
            }
         ]
      },
      {
         title: 'Lumières',
         bg: 'images/bg5.jpg',
         icon: 'mdi-lightbulb',
         tileSize: 120,
         groups: [
            {
               title: 'Jardin',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'Rivière',
                     id: 'switch.shelly25_jardin_channel_2',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [0, 1],
                     title: 'Terrasse',
                     id: 'switch.sonoff_4ch_jardin_4',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
               ]
            },
            {
               title: 'Rez de chaussée',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'Entrée',
                     id: 'light.lumiere_entree_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [0, 1],
                     title: 'Escalier',
                     id: 'light.lumiere_escalier_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [1, 0],
                     title: 'Salon',
                     id: 'light.lumiere_salon_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [1, 1],
                     title: 'Salle à manger',
                     id: 'light.lumiere_salle_a_manger_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 255,
                           min: 0,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        }
                     ]
                  }
               ]
            },
            {
               title: 'Etage',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'Salle de bain',
                     id: 'light.lumiere_salle_de_bain_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [0, 1],
                     title: 'Bureau',
                     id: 'light.lumiere_bureau_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [1, 0],
                     title: 'Parents',
                     id: 'light.lumiere_chambre_parents_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [2, 0],
                     title: 'Théa',
                     id: 'light.lumiere_chambre_thea_current_value',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [2, 1],
                     title: 'Théa Leds',
                     id: 'light.led_chambre_thea',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  }
               ]
            }
         ]
      },
      {
         title: 'Prises',
         bg: 'images/bg5.jpg',
         icon: 'mdi-power-plug',
         tileSize: 120,
         groups: [
            {
               title: 'Jardin',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'Garage/Portail',
                     id: 'switch.sonoff_garage_portail',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  },
                  {
                     position: [1, 0],
                     title: 'Fontaine',
                     id: 'switch.sonoff_4ch_jardin_1',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  },
                  {
                     position: [2, 0],
                     title: 'Piscine G.',
                     id: 'switch.sonoff_4ch_jardin_2',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  },
                  {
                     position: [2, 1],
                     title: 'Piscine D.',
                     id: 'switch.sonoff_4ch_jardin_3',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  },
                  {
                     position: [0, 1],
                     title: 'Rivière',
                     id: 'switch.shelly25_jardin_channel_1',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  }
               ]
            },
            {
               title: 'Arrosage',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.POPUP,
                     id: 'switch.shelly25_arrosage_channel_1',
                     title: 'Pelouse',
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-water",
                        off: "mdi-water-off",
                     },
                     state: function (item, entity) {
                        return entity.state
                     },
                     popup: {
                        tileSize: 200,
                        items: [
                           {
                              position: [0, 0],
                              id: 'switch.shelly25_arrosage_channel_1',
                              type: TYPES.SWITCH,
                              states: {
                                 on: "On",
                                 off: "Off"
                              },
                              icons: {
                                 on: "mdi-water",
                                 off: "mdi-water-off",
                              }
                           },
                           {
                              position: [0, 1],
                              id: 'input_number.irrigation_lawn',
                              type: TYPES.SLIDER,
                              unit: 'min',
                              title: 'Durée',
                              slider: {
                                 max: 30,
                                 min: 1,
                                 step: 1
                              }
                           }
                        ]
                     }
                  },
                  {
                     position: [0, 1],
                     type: TYPES.POPUP,
                     id: 'switch.shelly25_arrosage_channel_2',
                     title: 'Goutte à Goutte',
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-water",
                        off: "mdi-water-off",
                     },
                     state: function (item, entity) {
                        return entity.state
                     },
                     popup: {
                        tileSize: 200,
                        items: [
                           {
                              position: [0, 0],
                              id: 'switch.shelly25_arrosage_channel_2',
                              type: TYPES.SWITCH,
                              states: {
                                 on: "On",
                                 off: "Off"
                              },
                              icons: {
                                 on: "mdi-water",
                                 off: "mdi-water-off",
                              }
                           },
                           {
                              position: [0, 1],
                              id: 'input_number.irrigation_pots',
                              type: TYPES.SLIDER,
                              unit: 'min',
                              title: 'Durée',
                              slider: {
                                 max: 30,
                                 min: 1,
                                 step: 1
                              }
                           }
                        ]
                     }
                  }
               ]
            },
            {
               title: 'Rez de chaussée',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'TV/HiFi',
                     id: 'switch.prise_tv_hifi_current_value',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  },
                  {
                     position: [1, 0],
                     title: 'Salon',
                     id: 'switch.sonoff_salon',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  },
                  {
                     position: [0, 1],
                     title: 'Bibliothèque',
                     id: 'switch.sonoff_bibliotheque_haut',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  },
                  {
                     position: [1, 1],
                     title: 'Cuisine',
                     id: 'switch.sonoff_cuisine',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  }
               ]
            },
            {
               title: 'Etage',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'TV/Android box',
                     id: 'switch.prise_tv_current_value',
                     type: TYPES.SWITCH,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-power-plug",
                        off: "mdi-power-plug-off",
                     }
                  }
               ]
            }
         ]
      },
      {
         title: 'Chauffage',
         bg: 'images/bg5.jpg',
         icon: 'mdi-home-thermometer',
         tileSize: 160,
         groups: [
            {
               title: 'Climatisation',
               height: 2,
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     id: "input_boolean.automation_enable_thermostat_rdc_clim",
                     title: "Mode Salon",
                     classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     icons: {
                        on: 'mdi-stop',
                        off: 'mdi-play'
                     },
                     states: {
                        on: "Automatique",
                        off: "Arrêt"
                     }
                  },
                  {
                     position: [0, 1],
                     id: "climate.daikin_salon",
                     type: TYPES.CLIMATE,
                     unit: 'C',
                     useHvacMode: true,  // Optional: enables HVAC mode (by default uses PRESET mode)
                     state: function (item, entity) {
                        return 'Current '
                           + entity.attributes.current_temperature
                           + '°';
                     },
                     states: {
                        'fan_only': 'Ventilateur',
                        'dry': 'Séchage',
                        'cool': 'Froid',
                        'heat': 'Chauffe',
                        'heat_cool': 'Automatique',
                        'off': 'Eteint',
                     },
                  },
                  {
                     position: [1, 0],
                     width: 1,
                     id: "input_boolean.automation_enable_thermostat_etage_clim",
                     title: "Mode Etage",
                     classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     icons: {
                        on: 'mdi-stop',
                        off: 'mdi-play'
                     },
                     states: {
                        on: "Automatique",
                        off: "Arrêt"
                     }
                  },
                  {
                     position: [1, 1],
                     id: "climate.daikin_etage",
                     type: TYPES.CLIMATE,
                     unit: 'C',
                     useHvacMode: true,  // Optional: enables HVAC mode (by default uses PRESET mode)
                     state: function (item, entity) {
                        return 'Current '
                           + entity.attributes.current_temperature
                           + '°';

                     },
                     states: {
                        'fan_only': 'Ventilateur',
                        'dry': 'Séchage',
                        'cool': 'Froid',
                        'heat': 'Chauffe',
                        'heat_cool': 'Automatique',
                        'off': 'Eteint',
                     },
                  }
               ]
            },
            {
               title: 'Chauffage',
               height: 2,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.INPUT_SELECT,
                     id: 'input_select.thermostat_mode',
                     title: 'Mode Chauffage',
                     icons: {
                        Normal: 'mdi-home',
                        Arrêt: 'mdi-palm-tree',
                        Absent: 'mdi-stop'
                     }
                  }
               ]
            }
         ]
      }
   ],
}
