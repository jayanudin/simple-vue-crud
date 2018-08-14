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
							<button @click="editPerson(person.id)" class="btn btn-default">Edit</button>
							<button @click="removePerson(person.id)" class="btn btn-danger">Delete</button>
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
						<form @submit.prevent="savePerson">
						<div class="form-group">
							<label>First Name</label>
							<input type="text" v-model="newPerson.firstname" class="form-control">
						</div>
						<div class="form-group">
							<label>Last Name</label>
							<input type="text" v-model=" newPerson.lastname" class="form-control">
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="email" v-model="newPerson.email" class="form-control">
						</div>
						<div class="form-group">
							<button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit">Add New Person</button>

							<button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="updatePerson(newPerson.id)">Update Person</button>
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

	var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    export default {
        name: 'App',
        components: {
            Navbar
        },

		data() {
			return {
				newPerson: {
					id: '',
					firstname: '',
					lastname: '',
					email: ''
				},

				success: false,
				edit: false,

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

			async savePerson() {
				try {
					const response = await axios.post(`http://localhost:3000/persons`, this.newPerson)
					this.persons = response.data
					this.newPerson.firstname = '';
					this.newPerson.lastname = '';
					this.newPerson.email = ''; 
					this.load();

					$('#createModal').modal('hide');


				} catch (e) {
					console.log(e)
				}
				
			},
			
			async removePerson(id) {
				var ConfirmBox = confirm("Are you sure?")
				if(ConfirmBox) await axios.delete('http://localhost:3000/persons/' + id)
				this.load()
			},

			async editPerson(id) {
				this.edit = true
				const response = await axios.get('http://localhost:3000/persons/'+ id)
				this.newPerson = response.data
				

				$('#createModal').modal('show');
			},

			async updatePerson(id) {

				var person = this.newPerson
				await axios.patch('http://localhost:3000/persons/'+ id, person)

				this.load();

				$('#createModal').modal('hide');

				this.newPerson.firstname = '';
				this.newPerson.lastname = '';
				this.newPerson.email = '';

			}

		},

		computed: {
			validation: function () {
				return {
					firstname: !!this.newPerson.firstname.trim(),
					lastname: !!this.newPerson.lastname.trim(),
					email: emailRE.test(this.newPerson.email)
				}
			},

			isValid: function () {
				var validation = this.validation
				return Object.keys(validation).every(function (key) {
					return validation[key]
				})
			}
		}
    }

</script>