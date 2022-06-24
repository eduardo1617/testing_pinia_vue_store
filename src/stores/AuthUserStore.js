import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            username: "oscar_molina17",
        };
    },
    actions: {
        visitTwitterProfile() {
            window.open(`https://twitter.com/${this.username}`, "_blank");
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
}
