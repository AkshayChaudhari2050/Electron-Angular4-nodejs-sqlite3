export class Task {    
        id: number;
        title: string = '';
        description: string = '';
        fromDate: string = '';
        toDate: string = '';
    
        constructor(values: Object = {}) {
            Object.assign(this, values);
        }
    
    }
    