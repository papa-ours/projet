export class DeepCloner {
    public static clone<T>(t: T): T {
        return JSON.parse(JSON.stringify(t));
    }
}
