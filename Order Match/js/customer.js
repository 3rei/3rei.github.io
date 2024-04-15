export class Customer {
    static types = {
        Child: { minOrder: 1, maxOrder: 2, patience: 10 },
        Youth: { minOrder: 1, maxOrder: 3, patience: 20 },
        WorkingAdult: { minOrder: 2, maxOrder: 4, patience: 25 },
        FamilyOf3: { minOrder: 3, maxOrder: 5, patience: 30 },
        DeliveryDriver: { minOrder: 4, maxOrder: 6, patience: 10 }
    };

    constructor(type) {
        const { minOrder, maxOrder, patience } = Customer.types[type];
        this.type = type;
        this.patience = patience;
        this.orderSize = Math.floor(Math.random() * (maxOrder - minOrder + 1)) + minOrder;
        this.orderItems = []; // Fill this with random items based on orderSize
    }

    generateOrder(items) {
        for (let i = 0; i < this.orderSize; i++) {
            this.orderItems.push(items[Math.floor(Math.random() * items.length)]);
        }
    }
}
