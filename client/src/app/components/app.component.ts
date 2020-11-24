import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {
	title = 'Student Management By Nofar Alfasi';

	// Add few students for initial listing
	studentsList = [
	{	
		id : 1,
		first_name : "Nofar",
		last_name : "Alfasi",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 1
	},
	{
		id : 2,
		first_name : "Oman",
		last_name : "Umir",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 2
	},
	{
		id : 3,
		first_name : "Tina",
		last_name : "Dillon",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 3
	},
	{
		id : 4,
		first_name : "John",
		last_name : "Doe",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 4
	},
	{
		id : 5,
		first_name : "Peter",
		last_name : "Parker",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 5
	}
	];

	constructor() {
		// Save students to localStorage
		localStorage.setItem('students', JSON.stringify(this.studentsList));
	}
}

