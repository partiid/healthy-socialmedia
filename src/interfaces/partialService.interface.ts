export interface PartialServiceInterface<T> {
    findAll(where: any): Promise<T[]>;
}