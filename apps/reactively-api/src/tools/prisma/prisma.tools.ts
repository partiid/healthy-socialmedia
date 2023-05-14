export class PrismaTools {
    static async excludeFields<T>(model: T, fields: string[]): Promise<T> {
        const modelKeys = Object.keys(model);
        const filteredModelKeys = modelKeys.filter((key) => !fields.includes(key));
        const filteredModel = filteredModelKeys.reduce((obj, key) => {
            return {
                ...obj,
                [key]: model[key],
            };
        }, {});
        return filteredModel as T;
    }

}