import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ComParentChildService {

private subjects: any = [];

publish(eventName: string) {
// ensure a subject for the event name exists
this.subjects[eventName] = this.subjects[eventName] || new Subject();

// publish event
this.subjects[eventName].next();
}

on(eventName: string): any {
// ensure a subject for the event name exists
this.subjects[eventName] = this.subjects[eventName] || new Subject();

// return observable
return this.subjects[eventName].asObservable();
}

}