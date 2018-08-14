<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <div class="row">
                <h2>Vue Simple App</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar'

    export default {
        name: 'App',
        components: {
            Navbar
        }
    }

</script>