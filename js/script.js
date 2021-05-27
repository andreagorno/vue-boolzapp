// Milestone 1:
// Replica della grafica (immagine in allegato) con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse;
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto, ricavandoli dall'array contacts qui allegato

// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all'interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

var app = new Vue({
    el: "#root",

    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },     
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        activeContact: 0,

        newMessage: "",

        searchContact: "",
        
    },

    methods: {
        getImage: function(contactIndex) {
            return "img/avatar" + this.contacts[contactIndex].avatar + ".jpg";
        },

        getLastMessageData: function (contactIndex) {
            const lastMessageIndex = this.contacts[contactIndex].messages.length - 1;
            return this.contacts[contactIndex].messages[lastMessageIndex].date;
        },

        getLastMessageText: function (contactIndex) {
            const lastMessageIndex = this.contacts[contactIndex].messages.length - 1;
            return this.contacts[contactIndex].messages[lastMessageIndex].text.substr(0, 20) + "...";
        },

        getName: function (contactIndex) {
            
            return this.contacts[contactIndex].name;
        },

        setActive: function (newIndex) {
            this.activeContact = newIndex;
        },

        sendMessage: function () {
            // console.log("richiamo funzione add");
            if (this.newMessage.trim().length > 0) {
                // this.toDoList.push({
                //     testo: this.newToDo.testo,
                //     completed: false,
                // });
                let newMessageForm = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: this.newMessage,
                    status: "sent",
                };
                this.contacts[this.activeContact].messages.push(newMessageForm);

                this.newMessage = "";
            }

            setTimeout(() => {
            
                this.contacts[this.activeContact].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: "ok",
                    status: "received",
                });

            }, 1000);
        },

        filterByName: function () {
            console.log('richiamo funzione');
            // this.contacts.forEach(element => {
            //     if(element.name.startsWith(this.searchContact, 0) == false) {
            //         this.contacts.visible = false;
            //     };
            var filter = this.searchContact.toUpperCase();

            
            this.contacts.forEach(
                (element, index) => {
                    if (element.name.toUpperCase().indexOf(filter) > -1) {
                        this.contacts[index].visible = true;
                    } else {
                        this.contacts[index].visible = false;
                    }
                });
        
            
        },
    },
});

// firebase (database + autenticazione + hosting)
// netlify (hosting)
