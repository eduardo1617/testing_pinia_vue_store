<template>
    <div class="container">
        <TheHeader />
        <div class="mb-5 flex justify-end">
            <AppButton @click="cartStore.undo">Undo</AppButton>
            <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
        </div>
        <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
            <ProductCard
                v-for="product in ProductStore.products"
                :key="product.name"
                :product="product"
                @addToCart="cartStore.addItems($event, product)"
            />
        </ul>
    </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProducStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import AppButton from "@/components/AppButton.vue";

const ProductStore = useProducStore();
const cartStore = useCartStore();

cartStore.$onAction(({ name, args, after, onError }) => {
    if (name === "addItems") {
        after(() => {
            console.log(args[0]);
        });
        onError((error) => {
            console.log("Hello error: ", error.message);
        });
    }
});

ProductStore.fill();
</script>
