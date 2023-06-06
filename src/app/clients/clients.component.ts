import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit  {

  clients: Client[] = [];
  client: Client = {} as Client;
  isEditing : boolean = false;

  constructor (private ClientService: ClientService){

      }

  ngOnInit(): void {
    this.loadClient();


  }
  loadClient() {
    this.ClientService.getClients().subscribe(
      {
        next : data => this.clients = data
      }
    );
  }

  onCleanEvent(client: Client){
    this.isEditing = false;
  }
  onSaveEvent(client: Client){
      if(this.isEditing){
        this.ClientService.update(client).subscribe(
          {
            next: () => {
            this.loadClient();
            this.isEditing = false;

          }
        }
        )
      }
      else{
        this.ClientService.save(client).subscribe(
          {
            next: data => {
             this.clients.push(data);

            }
          }
        );
     }
    }



  edit(client: Client) {

    this.client = client;
    this.isEditing = true;
  }

  remove(client: Client){
    this.ClientService.remove(client).subscribe({
      next : () => this.loadClient()
    })
  }
}
