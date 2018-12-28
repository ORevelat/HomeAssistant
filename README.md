
# Overview
Ma configuration personnelle de Home Assistant, utilisée quotidiennement au travers de ses automatisations et de Alexa.

Modifications régulières au grès des envies et différents tests (bon normalement pas en live car une VM dédiée pour cela, mais ca arrive :D).

Mise à jour pour Home Assistant: **0.82.1**

# Environnement
Grosso modo mon installation domotique tourne autour d'une VM, de deux raspberry et d'assistants Alexa (Echo et Echo Dot).

Dès que ce n'est pas sur la VM directement, j'essaye soit d'exposer le périphérique via Socat, ou alors d'utiliser MQTT pour publier les données. Pour ce dernier point, j'ai réaliser un petit soft python qui me permet de récupérer à interval régulier des infos et de les publier.

- une 20ène de périphériques ZWave (dont certains ne sont pas encore la) principalement pour
  * les lumières (Fibaro)
  * les fils pilote (Qubino)
  * mesure de la consomation au compteur (Qubino)
  * prises avec mesure de consomation (NeoCoolcam)
- des SonOff (des Basic et un Pro 4Ch) avec firmware Tasmotta
- des périphériques BT-LE (Xiaomi miflora, thermomètre)
- des périqphériques Zigbee (work in progress !)
- une DOTI
  * le retour visuel c'est quand même pratique, gadget mais pratique :)
- un Amazon Echo de façon quotidienne
  * commande vocale avec une skill home-made
  * TTS via un script shell

### Home Assistant

#### Hardware
- VM (ESXi) 
- 2 CPU / 2 Go de RAM
- 8+40 Go de disque dur
- RFLink
- stick USB HSDPA Huawei E169

#### Software
Après avoir utilisé directement Home Assistant en mode venv python sur l'OS directement, je suis passé sur une installation utilisant Docker pour la facilité de mise à jour principalement (outre le fait que le principe des conteneurs c'est le bien !).

- Linux Debian Stretch
- Docker CE (18.x) avec Docker-Compose
- Conteneurs:
  * Home Assistant
  * Appdaemon
  * PostgreSQL
  * Mosquitto broker
  * InfluxDB
  * Grafana

#### Image docker customisées
J'utilise des images docker customisées de Home Assitant et AppDaemon afin de faciliter mon utilisation de:
- clé ZWave
- RFLink
- dongle 3G

Aucune modification du logiciel officiel, mais un ajout de certaines dépendances / logiciels, ainsi que la mise à jour apt de rigueur.

Disponible dans le répertoire /docker-build.

### Raspberry n°1

#### Hardware
- Raspberry PI 2B
- clé USB Bluetooth LE CSR 4.0
- Dongle Aeotec ZWave Gen5

En cours (mais je n'ai pas encore d'utilisation concrète)
- Dongle Zigate

#### Software
- Raspbian Stretch sur une µSD de 4Go
- socat pour exposer l'Aeotec et la Zigate via TCP/IP
- Python + logiciel home-made pour envoyer les infos de périfériques BT-LE via MQTT (anciennement les scripts shell dispo dans le repositorie sous /scripts)

### Raspberry n°2
Malgré une très bonne clé BT-LE, dure de capter des périphériques au rez-de-chaussé, donc j'ai déporté un vieu PI du tirroir directement dans le salon.

#### Hardware
- Raspberry PI 1B
- clé USB Bluetooth LE Sena UD100-G03

#### Software
- Raspbian Stretch sur une µSD de 4Go
- Python + logiciel home-made pour envoyer les infos de périfériques BT-LE via MQTT (anciennement les scripts shell dispo dans le repositorie sous /scripts)
