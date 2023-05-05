import React from "react";

export function useSelect<T extends string | number>(options: T[], defaultSelected: T) {
    const valueType = typeof options[0];
    const [selected, setSelected] = React.useState<T>(defaultSelected);
    const selectValue = (value: T) => options.some(v => v === value)
        ? setSelected(value)
        : undefined;
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): T => {
        const value = valueType === "number"
            ? Number(event.target.value)
            : valueType === "string"
                ? event.target.value
                : null;
        if (value !== null) {
            selectValue(value as T);
        }
        return value as T;
    };

    return [selected, handleSelectChange, options] as const;
}
