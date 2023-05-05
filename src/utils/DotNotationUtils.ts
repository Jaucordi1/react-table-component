export type IsAny<T> = unknown extends T
    ? ([keyof T] extends [never]
        ? false
        : true)
    : false;

export type IsDate<T> = T extends Date ? true : false;

type ExcludeArrayKeys<T> = T extends ArrayLike<any>
    ? Exclude<keyof T, keyof any[]>
    : keyof T;

type PathImpl<T, Key extends keyof T> = Key extends string
    ? IsAny<T[Key]> extends true
        ? never
        : IsDate<T[Key]> extends true
            ? Key
            : T[Key] extends Record<string, any>
                ?
                | `${Key}.${PathImpl<T[Key], ExcludeArrayKeys<T[Key]>> & string}`
                | `${Key}.${ExcludeArrayKeys<T[Key]> & string}`
                : never
    : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

export type Path<T> = keyof T extends string
    ? PathImpl2<T> extends infer P
        ? P extends string | keyof T
            ? P
            : keyof T
        : keyof T
    : never;

export type Choose<
    T extends Record<string | number, any>,
    K extends Path<T>,
> = K extends `${infer U}.${infer Rest}`
    ? Rest extends Path<T[U]>
        ? Choose<T[U], Rest>
        : never
    : T[K];

class DotNotationUtils {
    public getObjectValue = <T extends {}, K extends Path<T>>(obj: T, key: K) => {
        // null | undefined
        if (obj == null) return obj as Choose<T, K>;

        // Root key
        if (!key.includes(".")) {
            return this.getKeyValue(obj, key as keyof T) as Choose<T, K>;
        }

        // Dot notation path
        const pathParts = this.getObjectPathParts<T, K>(obj, key);

        // Hopper through pathParts to get final path value, if possible
        return pathParts.reduce(
            (value, keyPart) => {
                // null | undefined
                if (value == null) return value;
                return this.getKeyValue(value, keyPart as keyof typeof value) as Choose<T, K>;
            },
            obj as Choose<T, K>,
        );
    };

    private getKeyValue = <T extends {}, K extends keyof T>(obj: T, key: K): T[K] => {
        if (Array.isArray(obj)) {
            if (isNaN(Number(key))) {
                throw new Error(`Key '${key as string}' can't be used to index given array`);
            }
            return obj[Number(key)];
        } else {
            return obj[key];
        }
    };

    private getObjectPathParts = <T extends {}, K extends Path<T>>(obj: T, key: K): K[] => {
        return String(key).split(".") as K[];

    };
}

export const DOTNotationUtils = new DotNotationUtils();
