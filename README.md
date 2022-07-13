
# Overview
Ma configuration personnelle de Home Assistant, utilisée quotidiennement au travers de ses automatisations et de Alexa.

Mise à jour pour Home Assistant: **2022.6.7**

# Environnement
Grosso modo mon installation domotique tourne autour d'une VM, et d'assistants Alexa (Echo, Echo Dot(s) & Show).

Dès que ce n'est pas sur la VM directement, j'essaye soit d'exposer le périphérique via Socat au pire, ou d'utiliser MQTT pour publier les données.\
Dans ce sens, j'utilise ou je crée de petit soft python. Ce qui donne actuellement:
- [zigbee2mqtt](https://www.zigbee2mqtt.io/)
- [zwavejs](https://github.com/zwave-js/zwavejs2mqtt)
- rflink2mqtt

Au final, mon installation se compose de:
- une 30ène de périphériques ZWave principalement pour
  * les lumières (Fibaro)
  * les fils pilote (Qubino)
  * de capteurs de présences (Fibaro)
  * mesure de la consomation au compteur (Qubino)
  * prises avec mesure de consomation (NeoCoolcam pour les plug, fibaro pour les micro-modules)
- des SonOff (des Basic, des S26 et un Pro 4Ch) avec firmware Tasmotta
- des Shelly (des 1PM et 2.5) via integration officielle
- des périphériques Zigbee
  * thermomètres
  * bouton multi-click
  * détecteur de présence
- bandeau LED (via controlleur [magichome](https://www.aliexpress.com/item/32727054293.html))
- Amazon Echo/Dot/Show de façon quotidienne
  * commande vocale via le bridge Haaska
  * TTS via Alexa Media Player (HACS)
- un panneau LED 64x32 avec son RPI Zero, piloté via MQTT
  * le retour visuel c'est quand même pratique, gadget mais pratique :)

### Home Assistant

#### Hardware
- VM (Proxmox) 
- 4 CPU / 4 Go de RAM
- 30+10 Go de disque dur
- dongles USB
  * clé Aeotec ZWave Gen5
  * RFLink
  * clé HSPA Huawei E169
  * clé Bluetooth LE CSR 4.0
  * clé CC2531 Zigbee ~~clé Zigbee Zigate~~

#### Software
Après avoir utilisé directement Home Assistant en mode venv python sur l'OS directement, je suis passé sur une installation utilisant Docker pour la facilité de mise à jour principalement (outre le fait que le principe des conteneurs c'est le bien !).
De plus j'utilise Portainer pour la gestion des différentes stacks et containers.

- Linux Debian Stretch
- Docker CE (18.x + docker-compose)
- Conteneurs:
  * Portainer
  * **stack Automation**
    * Home Assistant
    * PostgreSQL
    * InfluxDB
    * TasmoAdmin
    * ZWavejs2Mqtt
    * Zigbee2Mqtt
    * RFLink2Mqtt
  * **stack Utils**
    * Mosquitto server
    * Grafana
  * **stack Automation Test**
    * Home Assistant(s)

Docker gère bien d'autre conteneur tel que:
  * Sites Web
  * Db Mongo - pour les sites webs principalement
  * ...

Et pour démarrer portainer:

    docker run -d -p 9002:9000 --restart always  -v /var/run/docker.sock:/var/run/docker.sock -v /path/to/your/data/portainer:/data --name  portainer portainer/portainer

### NVR
Utilisation d'une stack [Frigate](https://github.com/blakeblackshear/frigate) et d'un custom composant [Frigate custom component](https://github.com/blakeblackshear/frigate-hass-integration).

Détection d'object (person + cat) des caméras, avec sauvegarde sur disque de l'image + bounding-boxes si une détection.

### Image docker customisées
J'utilise des images docker customisées principalement pour me faciliter mon utilisation de périphériques ou de mise à jour.

Aucune modification du logiciel officiel, mais un ajout de certaines dépendances / logiciels, ainsi que la mise à jour apt de rigueur.

Disponible dans le répertoire /docker-build.

### Rflink2mqtt
Inspirés de zigbee2mqtt et écris en python.

Envoie les infos de périfériques captés via un RFLink vers MQTT. Support de l'autodiscovery MQTT de Home Assistant.
