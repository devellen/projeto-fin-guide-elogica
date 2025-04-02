
export function ValidaInputs(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (mercadoria: string, valor: number, quantidade: number) {
        if(!mercadoria || isNaN(valor)) {
            throw new Error("preencha todos os campos.");
        }

        if(valor <= 0 || quantidade <= 0 ) {
            throw new Error("valor e quantidade deve ser maior que zero")
        }

        if(valor>999) {
            throw new Error("valor deve ser menor que 999")
        }
        return originalMethod.apply(this, [mercadoria, valor, quantidade]);
    }
    return descriptor;
}
