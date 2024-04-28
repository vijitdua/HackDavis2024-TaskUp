import {db} from 'firebase';
export function getTask(id) {
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

export function addTask(task) {
    return db.collection('tasks').add({
        taskName: task.taskName,
        description: task.description,
        priority: task.priority,
        dateTime: task.dateTime,
        completed: task.completed
    })
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        });
}
