export function useGetSortableValue() {
    const valueToSort = (value: unknown): string | number => {
        if (value instanceof Date) {
            return value.getTime();
        }
        switch (typeof value) {
            case "string":
                return value;
            case "number":
                return value;
            case "bigint":
                return value.toString(10);
            case "object":
                return JSON.stringify(value);
            case "undefined":
                return "";
            case "boolean":
                return Number(value);
            case "function":
            case "symbol":
                return String(value);
            default:
                return "";
        }
    };
    return [valueToSort] as const;
}
