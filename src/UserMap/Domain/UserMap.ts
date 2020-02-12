import {AggregateRoot, EntityId} from "ts-ddd-common";

class UserMapProp {

}

class UserMapId {

}

export class UserMap extends AggregateRoot<EntityId<UserMapId>, UserMapProp> {

}

