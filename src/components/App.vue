<template>

    <!-- header -->
    <header>
        <div class="header-bg">
        </div>
        <div class="header-content">
            <h1>
                <a href="#"><img src="/static/tx.jpg" alt="" /></a>
            </h1>

        </div>

    </header>

    <!-- main -->
    <div class="main">
        <router-view
            class="view"
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>
    </div>

    <div class="bottom-menu">

    </div>

    <footer>
        Copyright © {{ (new Date()).getFullYear() }}
        Powered by <a href="#" target="_blank">VB</a>
        <p>
            「万物之中，希望至美；至美之物，永不凋零」
        </p>
    </footer>

</template>

<style lang="less">

    body {
        color: #34495e;
        margin: 0 auto;
        background: #f3f3f3;
    }

    header {
        .header-bg {
            height: 300px;
            width: 100%;
            background: #42b983;
        }
        .header-content {
            margin-top: -200px;
        }
        border-bottom: 1px solid #eee;

        nav {
            text-align: center;
            a {
                padding: 5px;
            }
        }

        h1 {
            text-align: center;
            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;

            }
        }

        a {
            &, &:link, &:visited, &:active, &.focus {
                color: #222;
            }
            &:hover {
                color: #08c;
                text-decoration: none;
            }
        }
    }
    .main {
        margin: 0 auto;
        width: 800px;
        background: #fff;
        border: 1px solid #f5f5f5;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        z-index: 99;
        padding: 10px;
        .list-view {

        }

    }

    footer {
        text-align: center;
        font-size: .8rem;
        border-top: 1px solid #eee;
        padding-top: 1.5rem;
    }

    .v-transition {
        transition: opacity .2s ease;
    }

    .v-enter, .v-leave {
        opacity: 0;
    }



    ul,
    ol {
        line-height: 2.1;
        padding: 5px 25px;
    }

    ul li {
        padding: 0;
        margin: 0;
        line-height: 2.1rem;
    }

    a {
        color: #34495e;
        overflow-wrap: break-word;
        word-break: break-all;
        text-decoration: none;
        padding: 0 .3rem;

        &:hover, &:active {
            color: #e60900;
            text-decoration: underline;
        }
    }

    .publish-date {
        float: right;
        font-size: .8rem;
        line-height: 4;
        vertical-align: middle;
    }

</style>
