import { injectable } from "inversify";
import { User } from "./user";

@injectable()
export class UsersContainerService {
    private static users: User[] = [];

    public static get usernames(): string[] {
        return UsersContainerService.users.map((user: User) => user.name);
    }

    public static clearUsers(): void {
        UsersContainerService.users = [];
    }

    public addUser(user: User): void {
        UsersContainerService.users.push(user);
    }

    public deleteUserByName(name: string): void {
        const userIndex: number = UsersContainerService.users.findIndex((u: User) => {
            return u.name === name;
        });

        this.deleteUserAt(userIndex);
    }

    public deleteUserById(id: string): void {
        const userIndex: number = UsersContainerService.users.findIndex((u: User) => {
            return u.socketId === id;
        });

        this.deleteUserAt(userIndex);
    }

    private deleteUserAt(index: number): void {
        if (index !== -1) {
            UsersContainerService.users.splice(index, 1);
        }
    }
}
