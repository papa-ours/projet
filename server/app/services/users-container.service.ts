import { User } from "./user";

export class UsersContainerService {
    private static users: User[] = [];

    public addUser(user: User): void {
        UsersContainerService.users.push(user);
    }

    public deleteUserByName(name: string): void {
        const userIndex: number = UsersContainerService.users.findIndex((u: User) => {
            return u.name === name;
        });

        if (userIndex !== -1) {
            UsersContainerService.users.splice(userIndex, 1);
        }
    }

    public deleteUserById(id: string): void {
        const userIndex: number = UsersContainerService.users.findIndex((u: User) => {
            return u.id === id;
        });

        if (userIndex !== -1) {
            UsersContainerService.users.splice(userIndex, 1);
        }
    }
}
