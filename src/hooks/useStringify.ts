function isDate(date: unknown): date is Date {
    return date instanceof Date;
}

export function useStringify() {
    const stringify = (value: unknown): string => {
        switch (typeof value) {
            case "string":
                return value;
            case "number":
            case "bigint":
                return value.toString(10);
            case "object":
                if (isDate(value)) return value.toLocaleDateString();
                return JSON.stringify(value, undefined, 4);
            case "undefined":
                return "";
            case "boolean":
                return value ? 'TRUE' : 'FALSE';
            case "function":
            case "symbol":
                return String(value);
            default:
                return "";
        }
    };
    return [stringify] as const;
}
