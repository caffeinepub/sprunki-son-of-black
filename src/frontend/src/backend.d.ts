import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    barricadeDoor(doorId: string): Promise<void>;
    enterSaveSpot(): Promise<void>;
    exitSaveSpot(): Promise<void>;
    findCode(): Promise<void>;
    findKeycard(): Promise<void>;
    getPlayerState(): Promise<[bigint, string, boolean, boolean, boolean, Array<string>]>;
    setScene(scene: string): Promise<void>;
    unbarricadeDoor(doorId: string): Promise<void>;
    updateStress(amount: bigint): Promise<void>;
}
