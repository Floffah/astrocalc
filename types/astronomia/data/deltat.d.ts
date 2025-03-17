export default m;
declare namespace m {
    namespace historic {
        let table: number[];
        let first: number;
        let last: number;
    }
    namespace data {
        let table_1: number[];
        export { table_1 as table };
        let first_1: number;
        export { first_1 as first };
        export let firstYM: number[];
        let last_1: number;
        export { last_1 as last };
        export let lastYM: number[];
    }
    namespace prediction {
        let table_2: number[];
        export { table_2 as table };
        let first_2: number;
        export { first_2 as first };
        let last_2: number;
        export { last_2 as last };
    }
}
