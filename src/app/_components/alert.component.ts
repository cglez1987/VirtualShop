import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../_services/alert.service';
import { style } from '@angular/animations';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styles: [`
    div{
        width: 50%;
        align-items: center;
        justify-content: center;
    }
    `]
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
