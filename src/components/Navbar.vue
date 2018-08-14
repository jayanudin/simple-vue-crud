<template>
	<nav class="navbar navbar-default">
	  	<div class="container-fluid">
	    	<div class="navbar-header">
	      		<a class="navbar-brand" href="#">WebSiteName</a>
	    	</div>
	    	<ul class="nav navbar-nav">
	      		<li><router-link to="/">Home</router-link></li>
	      		<li><router-link to="/person">Users</router-link></li>
	    	</ul>
	  	</div>
	</nav>
</template>

<script>
    export default {
      	name: 'App'
    }
</script>