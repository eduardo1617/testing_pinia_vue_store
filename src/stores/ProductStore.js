import { defineStore, acceptHMRUpdate } from "pinia";

export const useProducStore = defineStore("ProductStore", {
    state: () => {
        return {
            products: [],
        };
    },
    actions: {
        async fill() {
            this.products = (await import("@/data/products.json")).default;
        },
    },
    // getters
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProducStore, import.meta.hot));
}
