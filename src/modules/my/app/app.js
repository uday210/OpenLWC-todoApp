import { LightningElement, track } from 'lwc';
import fire from './fire';

export default class App extends LightningElement {
    @track
    todoItems = [];
    todoItemKeys = [];
    todoItem = '';
    connectedCallback() {
        this.getFirebaseData();
    }
    todoItemChange(event) {
        this.todoItem = event.target.value;
    }
    addTodoItem() {
        console.log('addTodoItem');
        const newMessage = {
            id: this.todoItems.length + 1,
            value: this.todoItem,
            timestamp: new Date().getTime()
        };
        this.todoItems.push(newMessage);

        let messageRef = fire
            .database()
            .ref('messages')
            .orderByKey()
            .limitToLast(100);
        fire.database().ref('messages').push(newMessage);
        this.todoItem = '';
    }

    getFirebaseData() {
        let ref = fire.database().ref('messages');
        ref.on('value', (snapshot) => {
            const state = snapshot.val();
            console.log(state);
            if (state) {
                this.todoItems = Object.values(state);
                this.todoItemKeys = Object.keys(state);
                console.log(new Date(this.todoItems[0].timestamp));
            } else {
                this.todoItems = [];
                this.todoItemKeys = [];
            }
        });
        console.log('DATA RETRIEVED');
        console.log();
    }

    deleteTodo(event) {
        var key = this.todoItemKeys[event.target.dataset.index];
        fire.database()
            .ref('messages')
            .child('' + key)
            .remove();
    }
}
