
var CONFIG = {
   customTheme: CUSTOM_THEMES.TRANSPARENT,
   transition: TRANSITIONS.ANIMATED_GPU,
   entitySize: ENTITY_SIZES.NORMAL,
   tileSize: 150,
   tileMargin: 6,
   serverUrl: SECRETS.serverUrl,
   wsUrl: SECRETS.wsUrl,
   authToken: SECRETS.authToken,
   debug: false,
   pingConnection: true,

   events: [],
   timeFormat: 24,
   menuPosition: MENU_POSITIONS.LEFT,
   hideScrollbar: false,
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY,

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
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     height: 1,
                     width: 2,
                     type: TYPES.WEATHER,
                     classes: ['-compact'],
                     id: {},
                     title: 'Météo',
                     state: '&sensor.dark_sky_summary.state',
                     icon: '&sensor.dark_sky_icon.state',
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
                        summary: '&sensor.dark_sky_summary.state',
                        temperature: '&sensor.dark_sky_temperature.state',
                        temperatureUnit: '&sensor.dark_sky_temperature.attributes.unit_of_measurement',
                        windSpeed: '&sensor.dark_sky_wind_speed.state',
                        windSpeedUnit: '&sensor.dark_sky_wind_speed.attributes.unit_of_measurement',
                        humidity: '&sensor.dark_sky_humidity.state',
                        humidityUnit: '&sensor.dark_sky_humidity.attributes.unit_of_measurement',
                     }
                  },
                  {
                     position: [0, 1],
                     type: TYPES.WEATHER_LIST,
                     width: 2,
                     height: 2,
                     title: 'Prévisions',
                     id: {},
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
                     hideHeader: false,
                     primaryTitle: 'Prévision',
                     list: [1, 2, 3, 4, 5].map(function (id) {
                        var forecast = "&sensor.dark_sky_overnight_low_temperature_" + id + "d.state - ";
                        forecast += "&sensor.dark_sky_daytime_high_temperature_" + id + "d.state";
                        forecast += "&sensor.dark_sky_daytime_high_temperature_" + id + "d.attributes.unit_of_measurement";

                        var weekday = new Array(7);
                        weekday[0] = "Dim";
                        weekday[1] = "Lun";
                        weekday[2] = "Mar";
                        weekday[3] = "Mer";
                        weekday[4] = "Jeu";
                        weekday[5] = "Ven";
                        weekday[6] = "Sam";

                        var month = new Array(12);
                        month[0] = "Janv.";
                        month[1] = "Févr.";
                        month[2] = "Mars";
                        month[3] = "Avr.";
                        month[4] = "Mai";
                        month[5] = "Juin";
                        month[6] = "Juil.";
                        month[7] = "Août";
                        month[8] = "Sept.";
                        month[9] = "Oct.";
                        month[10] = "Nov.";
                        month[11] = "Déc.";

                        return {
                           date: function () {
                              var d = new Date(Date.now() + id * 24 * 60 * 60 * 1000);
                              return weekday[d.getDay()] + ' ' + d.getDate() + ' ' + month[d.getMonth()];
                           },
                           icon: "&sensor.dark_sky_icon_" + id + "d.state",
                           primary: forecast
                        }
                     })
                  }
               ]
            },
            {
               title: 'Maison',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 1.5,
                     height: 1.5,
                     title: 'Consommation',
                     subtitle: '',
                     type: TYPES.GAUGE,
                     id: 'sensor.qubino_smart_meter_power',
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
                     position: [0, 1.5],
                     height: 1,
                     width: 1.5,
                     type: TYPES.CUSTOM,
                     id: {},
                     title: 'Allumées',
                     subtitle: 'Lumières',
                     action: function (item, entity) {
                        window.openPage(CONFIG.pages[1]);
                     },
                     icon: function() {
                        var lights = [
                           "&light.fibaro_dimmer_bureau_level.state",
                           "&light.fibaro_dimmer_entree_level.state",
                           "&light.fibaro_dimmer_escalier_level.state",
                           "&light.fibaro_dimmer_parents_level.state",
                           "&light.fibaro_dimmer_salle_a_manger_level.state",
                           "&light.fibaro_dimmer_salledebain_level.state",
                           "&light.fibaro_dimmer_salon_level.state",
                           "&light.fibaro_dimmer_thea_level.state",
                           "&light.led_chambre_thea.state"
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
                     position: [0, 2.5],
                     height: 1,
                     width: 1.5,
                     type: TYPES.CUSTOM,
                     id: {},
                     title: 'Allumées',
                     subtitle: 'Prises',
                     action: function (item, entity) {
                        window.openPage(CONFIG.pages[2]);
                     },
                     icon: function() {
                        var lights = [
                           "&switch.sonoff_garage_portail.state",
                           "&switch.sonoff_4ch_jardin_1.state",
                           "&switch.sonoff_4ch_jardin_2.state",
                           "&switch.sonoff_4ch_jardin_3.state",
                           "&switch.sonoff_4ch_jardin_4.state",
                           "&switch.prise_neocoolcam_tv_hifi_switch.state",
                           "&switch.sonoff_salon.state",
                           "&switch.sonoff_bibliotheque_haut.state",
                           "&switch.prise_neocoolcam_switch.state"
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
                  }
               ]
            },
            {
               title: 'Extérieur',
               width: 1,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.SENSOR,
                     title: 'Jardin',
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
                     type: TYPES.SENSOR,
                     title: 'Salon',
                     id: 'sensor.thermometer_salon_temperature',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [0, 1],
                     type: TYPES.SENSOR,
                     title: 'Salle à manger',
                     id: 'sensor.fibaro_motion_salle_a_manger_temperature',
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
                     title: 'Couloir',
                     id: 'sensor.fibaro_motion_etage_temperature',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [1, 0],
                     type: TYPES.SENSOR,
                     title: 'Salle de bain',
                     id: 'sensor.thermometer_salle_de_bain_temperature',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [1, 1],
                     type: TYPES.SENSOR,
                     title: 'Bureau',
                     id: 'sensor.thermometer_bureau_temperature',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [2, 0],
                     type: TYPES.SENSOR,
                     title: 'Chambre Parents',
                     id: 'sensor.thermometer_chambre_parents_temperature',
                     state: false,
                     filter: function (value) {
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [2, 1],
                     type: TYPES.SENSOR,
                     title: 'Chambre Théa',
                     id: 'sensor.thermometer_chambre_thea_temperature',
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
               title: 'Rez de chaussée',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'Entrée',
                     id: 'light.fibaro_dimmer_entree_level',
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
                     id: 'light.fibaro_dimmer_escalier_level',
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
                     id: 'light.fibaro_dimmer_salon_level',
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
                     id: 'light.fibaro_dimmer_salle_a_manger_level',
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
                     id: 'light.fibaro_dimmer_salledebain_level',
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
                     id: 'light.fibaro_dimmer_bureau_level',
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
                     id: 'light.fibaro_dimmer_parents_level',
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
                     id: 'light.fibaro_dimmer_thea_level',
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
               title: 'Extérieur',
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
                     position: [0, 1],
                     title: 'Jardin 1',
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
                     position: [1, 1],
                     title: 'Jardin 2',
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
                     position: [0, 2],
                     title: 'Jardin 3',
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
                     position: [1, 2],
                     title: 'Jardin 4',
                     id: 'switch.sonoff_4ch_jardin_4',
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
               ]
            },
            {
               title: 'Rez de chaussée',
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     title: 'TV/HiFi',
                     id: 'switch.prise_neocoolcam_tv_hifi_switch',
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
                     id: 'switch.prise_neocoolcam_switch',
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
      }
   ],
}
