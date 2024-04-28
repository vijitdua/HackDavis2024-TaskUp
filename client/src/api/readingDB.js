import { db } from './firebase';

function getTask(id) {
    return db.collection('tasks').doc(id).get()
        .then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch(error => {
            console.log("Error getting document:", error);
        });
}
