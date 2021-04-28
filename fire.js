import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyCYAZLQQjePgKmXSVo5Mu4epLWHG-ZVWqM",
                authDomain: "messengerapp333.firebaseapp.com",
                databaseURL: "https://messengerapp333-default-rtdb.firebaseio.com",
                projectId: "messengerapp333",
                storageBucket: "messengerapp333.appspot.com",
                messagingSenderId: "930889908244",
                appId: "1:930889908244:web:603e57c0eae46ea1e8a701",
                measurementId: "G-Z9JYW4H8SB"
            })
        }
    };

    checkAuth = ()  => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {

        messages.forEach(item => {
            const messages = {
                text: item.text,
                timestamp : firebase.database.ServerValue.TIMESTAMP,
                user : item.user
            };

            this.db.push(messages);
        });
       
    };

    parse = message => {
        const {user, text, timestamp} = message.val();
        const { key: _id } = message;
        const createAt = new Date(timestamp);

        return {
            _id,
            createAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    get db () {
        return firebase.database().ref("messages");
    }


    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();