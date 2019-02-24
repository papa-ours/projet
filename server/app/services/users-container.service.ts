import { User } from "./user";

export class UsersContainerService {
    private static users: User[] = [];

    public addUser(user: User): void {
        UsersContainerService.users.push(user);
    }
}
