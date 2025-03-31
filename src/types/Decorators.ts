export function ValidaCompra(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorCompra: number) {
        if(valorCompra <=0) {
            throw new Error("o valor a ser comprado deve ser maior que zero");
        }

        if(valorCompra > this.saldo) {
            throw new Error("seu saldo é insuficiente.")
        }

        return originalMethod.apply(this, [valorCompra]);
    }
    return descriptor;
}