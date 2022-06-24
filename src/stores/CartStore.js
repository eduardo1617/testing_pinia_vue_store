import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUserStore";
import { useLocalStorage } from "@vueuse/core";

export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
    state: () => {
        return {
            items: useLocalStorage("CartStore:items", []),
        };
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => {
            const grouped = groupBy(state.items, (item) => item.name);
            const sorted = Object.keys(grouped).sort();
            let inOrder = {};
            sorted.forEach((key) => (inOrder[key] = grouped[key]));
            return inOrder;
        },
        groupCount: (state) => {
            return (name) => state.grouped[name].length;
        },
        getTotal: (state) => {
            return state.items.reduce((accumulator, item) => {
                return accumulator + item.price;
            }, 0);
        },
    },
    actions: {
        checkout() {
            const authUserStore = useAuthUserStore();
            alert(
                `${authUserStore.username} just bought ${this.count} items at a total of $${this.getTotal}`
            );
        },
        addItems(count, item) {
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({ ...item });
            }
        },
        clearItem(productName) {
            this.items = this.items.filter((item) => item.name !== productName);
        },
        setItemCount(item, count) {
            this.clearItem(item.name);
            this.addItems(count, item);
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
