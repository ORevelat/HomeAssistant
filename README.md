
# Overview
Ma configuration personnelle de Home Assistant, utilisée quotidiennement au travers de ses automatisations et de Alexa.

Modifications régulières au grès des envies et différents tests (bon normalement pas en live car un container docker dédié pour cela, mais ca arrive :D).

Mise à jour pour Home Assistant: **0.99.3**

# Environnement
Grosso modo mon installation domotique tourne autour d'une VM, d'un raspberry et d'assistants Alexa (Echo et Echo Dot).

Dès que ce n'est pas sur la VM directement, j'essaye soit d'exposer le périphérique via Socat au pire, ou d'utiliser MQTT pour publier les données.\
Dans ce sens, j'utilise ou je crée de petit soft python:
- [zigbee2mqtt](https://www.zigbee2mqtt.io/)
- ble2mqtt (developpé), pour quelques périphériques Xiaomi 'captés' depuis un Raspberry PI.
- rflink2mqtt (developpé), basé sur l'approche de zigbee2mqtt et zwave2mqtt
- [zwave2mqtt](https://github.com/OpenZWave/Zwave2Mqtt) - test en cours

Au final, mon installation se compose de:
- une 20ène de périphériques ZWave (dont certains ne sont pas encore la) principalement pour
  * les lumières (Fibaro)
  * les fils pilote (Qubino)
  * de capteurs de présences (Fibaro)
  * mesure de la consomation au compteur (Qubino)
  * prises avec mesure de consomation (NeoCoolcam)
- des SonOff (des Basic, des S26 et un Pro 4Ch) avec firmware Tasmotta
- des périphériques BT-LE (Xiaomi miflora, thermomètre)
- des périphériques Zigbee
  * thermomètres
  * bouton multi-click
  * détecteur de présence
- une DOTI
  * le retour visuel c'est quand même pratique, gadget mais pratique :)
- bandeau LED (via controlleur [magichome](https://www.aliexpress.com/item/32727054293.html))
- Amazon Echo/Dot de façon quotidienne
  * commande vocale via le bridge Haaska
  * TTS via Alexa Media Player (HACS)

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
  * stack Automation
    * Home Assistant
    * Appdaemon
    * PostgreSQL
    * InfluxDB
    * TasmoAdmin
    * Zigbee2Mqtt
    * Zigbee2MqttAssistant
    * RFLink2Mqtt
  * stack Utils
    * Mosquitto server
    * Grafana
  * stack Automation Test
    * Home Assistant(s)
    * Zwave2Mqtt

Docker gère bien d'autre conteneur tel que:
  * Sites Web
  * Db Mongo - pour les sites webs principalement
  * Reverse Proxy - tout le traffic entrant (via un Firewall pFSense) passe par lui
  * Certbot - pour la génération / renew de mes certificats SSL
  * ...

Et pour démarrer portainer:

    docker run -d -p 9002:9000 --restart always  -v /var/run/docker.sock:/var/run/docker.sock -v /path/to/your/data/portainer:/data --name  portainer portainer/portainer

#### Image docker customisées
J'utilise des images docker customisées principalement pour me faciliter mon utilisation de périphériques ou de mise à jour.

Aucune modification du logiciel officiel, mais un ajout de certaines dépendances / logiciels, ainsi que la mise à jour apt de rigueur.

Disponible dans le répertoire /docker-build.

### Raspberry n°1
Malgré une très bonne clé BT-LE, dure de capter des périphériques au rez-de-chaussé, donc j'ai déporté un vieux PI du tirroir directement dans le salon.

#### Hardware
- Raspberry PI 1B
- clé USB Bluetooth LE Sena UD100-G03

#### Software
- Raspbian Stretch sur une µSD de 4Go
- Python + logiciel home-made pour envoyer les infos de périfériques BT-LE via MQTT (anciennement les scripts shell dispo dans le repositorie sous /scripts)
