import {DOTNotationUtils, Path} from "../utils/DotNotationUtils";

export function useDotNotation() {
    return [DOTNotationUtils.getObjectValue] as const;
}

export type {Path};
