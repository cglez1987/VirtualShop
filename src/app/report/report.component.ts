import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { Chart } from 'chart.js';

import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { Product } from '../_models/product';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {

  chartUsers: any = [];
  chartProducts: any = [];
  users_labels = [];
  users_data = [];
  products_labels = [];
  products_data = [];
  topUsers: User[];
  topProducts: Product[];

  constructor(private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadTopUsers();
    this.loadTopProducts();
    this.createGraphUsers();
    this.createGraphProducts();
  }

  ngAfterViewInit() {
  }


  loadTopUsers() {
    this.topUsers = this.route.snapshot.data['topUsers'];
    this.topUsers.forEach(user => {
      this.users_labels.push(user.firstName);
      this.users_data.push(1);
    });
  }

  loadTopProducts() {
    this.topProducts = this.route.snapshot.data['topProducts'];
    this.topProducts.forEach(prod => {
      this.products_labels.push(prod.description);
      this.products_data.push(prod.price);
    });
  }

  createGraphUsers() {
    this.chartUsers = new Chart('reportUsers', {
      type: 'bar',
      data: {
        labels: this.users_labels,
        datasets: [
          {
            data: this.users_data,
            fill: false,
            backgroundColor: 'black'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  createGraphProducts() {
    this.chartProducts = new Chart('reportProducts', {
      type: 'bar',
      data: {
        labels: this.products_labels,
        datasets: [
          {
            data: this.products_data,
            borderColor: "#3cba9f",
            fill: false,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }


}
