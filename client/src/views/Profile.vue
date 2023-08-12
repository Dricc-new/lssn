<script setup>
import Header from '../components/Header.vue';
import AppLayout from '../layout/AppLayout.vue';
import { Session } from '../sessionController';
const user = Session.User()
</script>
<template>
    <AppLayout>
        <section class="flex justify-center p-6 gap-6">
            <article class="flex flex-col items-center shadow shadow-slate-500 p-6 rounded gap-4">
                <img :src="user?.picture" class="border-gradient rounded-full" alt="">
                <h2 class="text-lg">{{ user?.name }}</h2>
                <h2 class="text-lg">{{ user?.email }}</h2>
            </article>
            <article class="grow shadow shadow-slate-500 p-6 rounded gap-4" >
                <Header class="text-xl">Title</Header>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed molestias earum repellat incidunt minima dolorem error cupiditate voluptas quia corrupti ullam illo corporis modi, id quam tempore aperiam! Esse, animi!
                Accusamus aperiam fugit odit, neque fugiat natus dicta? Aspernatur nam corporis fugiat dolor necessitatibus iusto odio natus unde facilis? Illum et, cupiditate necessitatibus commodi corporis hic error consequuntur qui magnam.
                Labore voluptatibus voluptates eius itaque exercitationem quis eaque magni! Possimus facere, explicabo odit optio incidunt nobis non quidem, aperiam recusandae, magnam doloribus eius sunt illo fugit cumque sint natus molestiae!
                Cupiditate voluptates architecto praesentium doloribus voluptatibus, molestiae natus magni autem! Earum, totam dolore quam odit ducimus vitae repellendus impedit culpa non libero amet perferendis dolorem possimus veniam vel quae suscipit.
                Distinctio voluptate doloribus tempore dolorem repellendus odit eligendi nesciunt corporis quas minima delectus eaque consectetur a cum, sequi qui reprehenderit iure similique, quis ipsum neque dignissimos asperiores soluta illum. Eligendi.</p>
            </article>
        </section>
    </AppLayout>
</template>
<style>
.border-gradient {
    background: linear-gradient(#1313fd, #60028f) padding-box,
        linear-gradient(to right, #1313fd, #60028f) border-box;
    border-radius: 50em;
    border: 2px solid transparent;
}
</style>