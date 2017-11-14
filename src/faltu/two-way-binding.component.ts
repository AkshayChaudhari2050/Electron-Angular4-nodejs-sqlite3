import { Component } from '@angular/core';

@Component({
    selector: 'hello-world',
    templateUrl: './app.componentTo.html',
})
export class TwoWayBindingComponent {

     person: any;

    constructor() {
        this.reset();
    }

     reset(): void {
        this.person = {
            name: {
                forename: 'John',
                surname: 'Doe'
            },
            address: {
                street: 'Lexington Avenue',
                city: 'New York',
                country: 'USA'
            }
        }
    }
}