import {DomainEvent} from "./DomainEvent";

export abstract class AggregateRoot {
    private _domainEvents: DomainEvent[];

    protected constructor(){
        this._domainEvents = [];
    }

    protected addDomainEvent(domainEvent: DomainEvent): void{
        this._domainEvents.push(domainEvent);
    }

    protected addDomainEvents(domainEvents: DomainEvent[]): void{
        this._domainEvents.push(...domainEvents);
    }

    get domainEvents(): DomainEvent[]{
        return this._domainEvents;
    }

    clearEvents(): void{
        this._domainEvents = [];
    }
}