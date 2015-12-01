<template>

    <div class="list-view">

        <!-- loading -->
        <span v-if="!items.length">玩命加载中..</span>

        <!-- loaded -->
        <ul v-if="items.length">
            <li v-for="item in items | orderBy 'name' -1" transition>
                <a v-link="{ name: 'post', params: { title: encodeURI(item.name) }}">
                    {{ item.name | onlyTitle }}
                </a>
                <span class="publish-date">{{ item.name | onlyPublishDate }}</span>
            </li>
        </ul>
        <div class="nav" v-show="items.length > 0">
            <a v-if="page > 1" :href="'#/list/' + (page - 1)">&lt; prev</a>
            <a v-if="page < 4" :href="'#/list/' + (page + 1)">more...</a>
        </div>

    </div>

</template>

<script>

    import store from '../store';
    import { onlyTitle, onlyPublishDate } from '../filters';

    export default {

        name: 'ListView',

        filters: {
            onlyTitle,
            onlyPublishDate
        },

        data () {
            return {

                items: []
            }
        },

        route: {
            data ({ to }) {
                const page = to.params.page;
                document.title = to.setting.blogTitle;

                return {
                    items: store.getListByPage(page).then(items => items)
                };
            }
        }

    }

</script>

<style lang="less">
    ul {
        padding: 0;
        list-style-type: none;
    }
    .list-view {
        li {
            clear: both;
            margin-bottom: 1rem;

            a {
                font-size: 1.4rem;
            }
        }
    }

    @media(max-width: 600px) {
        .publish-date {
            display: none;
        }
    }

</style>
