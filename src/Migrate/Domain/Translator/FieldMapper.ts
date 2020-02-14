export class FieldMapper<KEY extends string | number | symbol, VALUE> {

    protected map: Record<KEY, VALUE>;

    constructor(map: Record<KEY, VALUE>) {
        this.map = map;
    }

    getValue(key: KEY): VALUE {
        return this.map[key];
    };
}