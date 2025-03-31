export function ValidaCompra(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorCompra) {
        if (valorCompra <= 0) {
            throw new Error("o valor a ser comprado deve ser maior que zero");
        }
        if (valorCompra > this.saldo) {
            throw new Error("seu saldo é insuficiente.");
        }
        return originalMethod.apply(this, [valorCompra]);
    };
    return descriptor;
}
