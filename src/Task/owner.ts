export class Owner {
    
        name: string = '';
        age: number;
        country: string = '';
        jobtitle: string = '';
        company: string = '';
    
        constructor(values: Object = {}) {
            Object.assign(this, values);
        }
    }
    