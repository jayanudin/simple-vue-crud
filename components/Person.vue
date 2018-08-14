<template>
	<div>
		<navbar></navbar>

		<div class="container">

			<button type="button" class="btn btn-info" data-toggle="modal" data-target="#createModal">Create</button>

		  	<h2>Data Person</h2>
		  	<p>The .table-striped class adds zebra-stripes to a table:</p>            
		  	<table class="table table-striped">
			    <thead>
				    <tr>
				        <th>Firstname</th>
				        <th>Lastname</th>
				        <th>Email</th>
				        <th>Action</th>
				    </tr>
				</thead>
			    <tbody>
			      	<tr v-for="person in persons" :key="person.id">
			        	<td>{{ person.firstname }}</td>
						<td>{{ person.lastname }}</td>
						<td>{{ person.email }}</td>
			        	<td>
							<button @click="edit(person.id)" class="btn btn-default">Edit</button>
							<button @click="remove(person.id)" class="btn btn-danger">Delete</button>
			        	</td>
			      	</tr>
			    </tbody>
		  </table>
		</div>

		<div id="createModal" class="modal fade" role="dialog">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Create Person</h4>
					</div>
					<div class="modal-body">
						<form @submit.prevent="save">
						<div class="form-group">
							<label>First Name</label>
							<input type="text" v-model="form.firstname" class="form-control">
						</div>
						<div class="form-group">
							<label>Last Name</label>
							<input type="text" v-model="form.lastname" class="form-control">
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="email" v-model="form.email" class="form-control">
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-success">Submit</button>
						</div>
					</form>
					</div>
				</div>

			</div>
		</div>

	</div>

</template>

<script>
	import axios from 'axios'
	import Navbar from './Navbar'

    export default {
        name: 'App',
        components: {
            Navbar
        },

		data() {
			return {
				form: {
					id: '',
					firstname: '',
					lastname: '',
					email: ''
				},
				persons: []
			}
		},

		async mounted() {
			this.load()
		},

		methods: {
			async load() {
				const response = await axios.get(`http://localhost:3000/persons`)
				this.persons = response.data
			},

			async save() {
				try {
					const response = await axios.post(`http://localhost:3000/persons`, this.form)
					this.persons = response.data
					this.load();
					$('#createModal').modal('hide');

				} catch (e) {
					console.log(e)
				}
				
			},
			
			async remove(id) {
				const response = await axios.delete(`http://localhost:3000/persons/`+ id)
				this.persons = response.data
				this.load()
			},

			async edit(id) {
				const response = await axios.get(`http://localhost:3000/persons/`+ id)
				this.persons = response.data
			}
		}
    }

</script>