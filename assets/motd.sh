#!/usr/bin/env bash
# ============================================================
#  MOTD banner berwarna untuk login SSH/terminal
#  Pemasangan:  sudo cp "assets/motd.sh" /etc/update-motd.d/99-rq-banner
#               sudo chmod +x /etc/update-motd.d/99-rq-banner
#  (hapus juga 00-header/10-help-text bila ingin banner bersih)
# ============================================================

# Warna
G="\e[32m"; R="\e[31m"; Y="\e[33m"; C="\e[36m"; W="\e[0m"; B="\e[1m"

HOST=$(hostname)
USER=$(whoami)
DATE=$(date +"%A, %d %B %Y  %H:%M")
UPTIME=$(uptime -p 2>/dev/null | sed 's/up //')

# --- Info sistem ---
read LOAD1 _ <<< "$(cat /proc/loadavg)"
MEM=$(free -h | awk '/^Mem/{print $3" / "$2}')
DISK=$(df -h / | awk 'NR==2{print $3" / "$2" ("$5")"}')
IP=$(hostname -I 2>/dev/null | awk '{print $1}')

echo ""
echo -e "${C}${B}"
cat <<'EOF'
   ___  ___   ___  ___  ___   _   _  ___   _   _   ___  _  _
  | _ \| _ \ / _ \|   \/ __| /_\ | \| |/ _ \ | | | | / __|/ \| |
  |   /|   /| (_) | |) \__ \/ _ \| .` | (_) || |_| || (_ | .` |
  |_|_\|_|_\\ \___/|___/|___/_/ \_\_|\_|\___(\)\___/ \___/|_|\_|
EOF
echo -e "${W}"
echo -e "  ${G}============================================${W}"
echo -e "  ${Y}${B}Host   ${W}: ${G}${HOST}${W}"
echo -e "  ${Y}${B}User   ${W}: ${C}${USER}${W}"
echo -e "  ${Y}${B}Time   ${W}: ${C}${DATE}${W}"
echo -e "  ${Y}${B}Uptime ${W}: ${C}${UPTIME}${W}"
echo -e "  ${G}--------------------------------------------${W}"
echo -e "  ${Y}${B}Load   ${W}: ${R}${LOAD1}${W}"
echo -e "  ${Y}${B}Memory ${W}: ${R}${MEM}${W}"
echo -e "  ${Y}${B}Disk   ${W}: ${R}${DISK}${W}"
echo -e "  ${Y}${B}IP     ${W}: ${R}${IP:-"-"}${W}"
echo -e "  ${G}============================================${W}"
echo -e "  ${C}Selamat datang, ${B}${USER}${W}${C}! Semoga harimu menyenangkan :)${W}"
echo ""