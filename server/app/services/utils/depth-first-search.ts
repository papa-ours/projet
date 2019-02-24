export class DepthFirstSearch {

    public static search<T>(initial: T, getValidNeighbors: (current: T) => T[]): T[] {

        return getValidNeighbors(initial);
    }
}