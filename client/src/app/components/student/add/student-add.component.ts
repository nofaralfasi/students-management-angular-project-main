 import { Component, OnInit, ViewChild } from '@angular/core';
 import {Validators, FormBuilder, FormGroup} from '@angular/forms';
 import { RouterModule, Routes ,Router,ActivatedRoute} from '@angular/router';
 import {Observable, Subject} from 'rxjs';
 import {takeUntil, debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
 import { merge } from 'rxjs/observable/merge';
//  import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

 // Services
 import { ValidationService } from '../../../services/config/config.service';
 import { StudentService } from '../../../services/student/student.service';
 import { StudentsService } from '../../../services/students.service';
 import { routerTransition } from '../../../services/config/config.service';
 
 import { ToastrService } from 'ngx-toastr';

 const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

 @Component({
 	selector: 'app-student-add',
 	templateUrl: './student-add.component.html',
	 styleUrls: ['./student-add.component.css'],
	 styles: [`.form-control { width: 300px; }`],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })

 export class StudentAddComponent implements OnInit {
 	// create studentAddForm of type FormGroup 
 	private studentAddForm : FormGroup;
 	index:any;
	 userCount = 0;
	 destroy$: Subject<boolean> = new Subject<boolean>();
	 
 	constructor(private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute, private studentService:StudentService, private studentsService:StudentsService, private toastr: ToastrService) { 

 		// Check for route params
 		this.route.params.subscribe(params => {
 			this.index = params['id'];
 			// check if ID exists in route & call update or add methods accordingly
 			if (this.index && this.index != null && this.index != undefined) {
 				this.getStudentDetails(this.index);
 			}else{
 				this.createForm(null);
 			}
 		});
 	}

 	ngOnInit() {
 	}

	 createNewStudent() {
		this.studentsService.createStudent(this.studentAddForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
		  console.log('message::::', data);
		  this.userCount = this.userCount + 1;
		  this.studentAddForm.reset();
		});

		let returnData = {
			code : 200,
			message : "Student Successfully Added!!!!",
			data : JSON.parse(localStorage.getItem('students'))
		  }    
		
		return returnData;
	  }

	  updateStudentDetails() {
		this.studentsService.updateStudent(this.studentAddForm.value, this.index).pipe(takeUntil(this.destroy$)).subscribe(data => {
		  console.log('message::::', data);
		  this.studentAddForm.reset();
		});

		let returnData = {
			code : 200,
			message : "Student Successfully Added!!!!",
			data : JSON.parse(localStorage.getItem('students'))
		  }    
		
		return returnData;
	  }

 	// Submit student details form
 	doRegister(){
		let studentRegister;
 		if (this.index && this.index != null && this.index != undefined) {
			 this.studentAddForm.value.id = this.index;
			 studentRegister = this.updateStudentDetails();
 		}else{
			 this.index = null;
			 studentRegister = this.createNewStudent();
		 }
		
		//  let studentsRegister = this.studentsService.doRegisterStudent(this.studentAddForm.value, this.index);
	
 		if(studentRegister) {
 			if (studentRegister.code == 200) {
 				this.toastr.success(studentRegister.message,"Success");
 				this.router.navigate(['/']);
 			}else{
 				this.toastr.error(studentRegister.message,"Failed");
 			}
 		}
 	}

 	// If this is update form, get user details and update form
 	getStudentDetails(index:number){
 		let studentDetail = this.studentsService.getStudentDetails(index);
 		this.createForm(studentDetail);
 	}

 	// If this is update request then auto fill form
 	createForm(data){
 		if (data == null) {
 			this.studentAddForm = this.formBuilder.group({
 				first_name: ['',  [Validators.required,Validators.minLength(2),Validators.maxLength(250)]],
 				last_name: ['',  [Validators.required,Validators.minLength(2),Validators.maxLength(250)]],
 				grade: ['',  [Validators.required,ValidationService.checkLimit(1,12)]],
 				address: ['',  [Validators.required,Validators.minLength(2),Validators.maxLength(250)]],
				city: ['',  [Validators.required,Validators.minLength(2),Validators.maxLength(250)]],
 				state: ['',  [Validators.required,Validators.minLength(2),Validators.maxLength(250)]]
 			});			
 		}else{
 			this.studentAddForm = this.formBuilder.group({
 				first_name: [data.studentData.first_name,  [Validators.required,Validators.minLength(2),Validators.maxLength(250)]],
 				last_name: [data.studentData.last_name,  [Validators.required,Validators.minLength(2),Validators.maxLength(250)]],
 				grade: [data.studentData.grade,  [Validators.required,ValidationService.checkLimit(1,12)]],
				address: [data.studentData.address,  [Validators.required, Validators.minLength(2),Validators.maxLength(250)]],
				city: [data.studentData.city,  [Validators.required, Validators.minLength(2),Validators.maxLength(250)]],
				state: [data.studentData.state,  [Validators.required, Validators.minLength(2),Validators.maxLength(250)]]
 			});
 		}
	 }
	 
	//  @ViewChild('instance') instance: NgbTypeahead;
	 focus$ = new Subject<string>();
	 click$ = new Subject<string>();

	 search = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		// const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;
	
		// return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
		//   map(term => (term === '' ? states
		// 	: states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
		// );
	  }

	 ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	  }

 }
