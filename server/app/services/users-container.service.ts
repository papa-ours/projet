import { User } from "./user";

export class UsersContainerService {
    private static users: Map<string, string> = new Map();

    public addUser(user: User): void {
        UsersContainerService.users.set(user.socketId, user.name);
    }
}
