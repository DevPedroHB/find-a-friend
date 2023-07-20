/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Define um tipo genérico para representar o objeto ou array
type GenericObjectOrArray = Record<string, any> | any[];

// Define a função genérica para remover propriedades do objeto ou array
export function removeProperties<T extends GenericObjectOrArray>(
  data: T,
  propertiesToRemove: string[],
  nestedProperties?: { objects?: string[]; arrays?: string[] }
): T {
  function removePropertiesRecursively(obj: any): any {
    if (typeof obj !== "object" || obj === null) return obj;

    // Remove as propriedades diretamente do objeto
    propertiesToRemove.forEach((prop) => delete obj[prop]);

    // Remove propriedades de objetos aninhados
    if (nestedProperties?.objects) {
      nestedProperties.objects.forEach((path) => {
        const keys = path.split(".");
        let currentObj = obj;

        for (const key of keys.slice(0, -1)) {
          currentObj = currentObj[key];

          if (currentObj === undefined || currentObj === null) return;
        }

        delete currentObj[keys[keys.length - 1]];
      });
    }

    // Remove propriedades de arrays aninhados
    if (nestedProperties?.arrays) {
      nestedProperties.arrays.forEach((path) => {
        const keys = path.split(".");
        let currentObj = obj;

        for (const key of keys.slice(0, -1)) {
          currentObj = currentObj[key];

          if (!Array.isArray(currentObj)) return;
        }

        const prop = keys[keys.length - 1];

        if (Array.isArray(currentObj) && currentObj[0]?.hasOwnProperty(prop)) {
          currentObj.forEach((item: any) => delete item[prop]);
        }
      });
    }

    // Processa os objetos ou arrays aninhados recursivamente
    for (const key in obj) {
      obj[key] = removePropertiesRecursively(obj[key]);
    }

    return obj;
  }

  return removePropertiesRecursively(data) as T;
}
