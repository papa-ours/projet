import Axios from "axios";
import { injectable } from "inversify";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
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

    public getUsernameBySocketId(id: string): string {
        const foundUser: User | undefined = UsersContainerService.users.find((user: User) => {
            return user.socketId === id;
        });

        return foundUser ? foundUser.name : "";
    }

    public getSocketIdByUsername(username: string): string {
        const foundUser: User | undefined = UsersContainerService.users.find((user: User) => {
            return user.name === username;
        });

        return foundUser ? foundUser.socketId : "";
    }

    public addUser(user: User): void {
        UsersContainerService.users.push(user);
    }

    public deleteUserByName(name: string): void {
        const userIndex: number = UsersContainerService.users.findIndex((u: User) => {
            return u.name === name;
        });

        Axios.delete(`${SERVER_ADDRESS}/api/game/waitingRoom/all/${name}`);

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
