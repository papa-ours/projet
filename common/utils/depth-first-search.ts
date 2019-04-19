export class DepthFirstSearch {

    public static search<T>(initial: T, getValidNeighbors: (current: T) => T[]): T[] {
        const elements: T[] = [initial];
        const stack: T[] = [initial];

        while (stack.length > 0) {
            getValidNeighbors(stack.pop() as T).forEach((current: T) => {
                if (!DepthFirstSearch.contains(current, stack) && !DepthFirstSearch.contains(current, elements)) {
                    stack.push(current);
                    elements.push(current);
                }
            });
        }

        return elements;
    }
    
    private static contains<T>(element: T, array: T[]): boolean {
        return array.find((t: T) => t === element) !== undefined;
    }
}
