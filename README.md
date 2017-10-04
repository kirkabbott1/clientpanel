# CRMpinpoint

## Objective
Create a client management tracking directory app.

### Live Demo:

[CRMpinpoint](http://www.CRMpinpoint.com/)

### Credits

[Kirk Abbott](https://github.com/kirkabbott1)

### Languages / Frameworks / Technologies used:

* HTML
* CSS
* BOOTSTRAP
* Javascript
* Angular 4
* Firebase

## Description
Users can create an account, login, and keep track of clients and balance totals.

## Usage

1. Securely sign up and log in.

2. Add clients and balances to keep track of.

3. If you are an Admin, change settings to allow new users and money balance according to preferences.

4. Click on client details to see their info

5. Edit or delete client info/balance.

6. click the pencil edit next to balance to update balance.

7. go back to Dashboard with button or navbar.

### Screenshots

##### Register

  Email Address: test@gmail.com
  Password: password

  ![Register](src/images/register.png)

##### Dashboard

  ![Dashboard](src/images/logged_in_dashboard.png)

##### Add New Client
  ![Add New Client](src/images/add_new_client.png)

##### Dashboard (Reflects New Client Added)

  ![Dashboard](src/images/dashboard_new_client_added.png)

##### Client Details Page
  ![Client Details Page](src/images/client_details.png)

##### Client Details Page (Update Balance)

  ![Client Details Page](src/images/client_details_update_balance.png)

##### Edit Client Details Page (Initial State: balance on edit is disabled)

  ![Edit Client Details Page](src/images/edit_client_update_phone_1.png)

##### Edit Client Details Page (Update Phone Number)
  ![Edit Client Details Page](src/images/edit_client_update_phone_1.png)

##### Client Details Page (Updated Phone Number)

  ![Client Details Page](src/images/client_details_new_phone_added.png)

##### Edit Settings Page (Initial State w/ disabled balance on edit)
  ![Edit Settings Page](src/images/edit_settings.png)

##### Edit Settings Page (balance on edit is enabled)

  ![Edit Settings Page](src/images/edit_settings_enable_balance_on_edit.png)

##### Client Details Page

  ![Client Details Page](src/images/client_details_update_balance.png)

##### Edit Client Details Page (Initial State: balance on edit is enabled)
  ![Edit Client Details Page](src/images/edit_client_enable_balance_edit_1.png)

##### Edit Client Details Page (Initial State: balance on edit is enabled w/ updated balance)

  ![Edit Client Details Page](src/images/edit_client_enable_update_balance_edit_2.png)

###  Component Code Snippet


```
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client: Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    // get id
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client.balance > 0) {
        this.hasBalance = true;
      } else {
        this.hasBalance = false;
      }
      this.client = client;

    });
  }

  updateBalance(id:string){
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated', {cssClass:'alert-success', timeout: 3000});
      this.router.navigate(['/client/'+this.id]);

  }

  onDeleteClick(){
    if(confirm("Are you sure you want to delete?")) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted', { cssClass: 'alerty-success', timeout: 3000 });
      this.router.navigate(['/']);
    }
  }
}
```

### Firebase service Snippet

```@Injectable()
export class ClientService {
  clients: FirebaseListObservable<any[]>;
  client: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase    
  ) {
      this.clients = this.af.list('/clients') as FirebaseListObservable<Client[]>;
   }

   getClients() {
     return this.clients;
   }

  newClient(client:Client){
    this.clients.push(client);
  }

  getClient(id:string) {
    this.client = this.af.object('/clients/'+id) as FirebaseObjectObservable<Client>;
    return this.client
  }

  updateClient(id:string, client:Client){
    return this.clients.update(id, client);
  }

  deleteClient(id:string) {
    return this.clients.remove(id);
  }
}```
