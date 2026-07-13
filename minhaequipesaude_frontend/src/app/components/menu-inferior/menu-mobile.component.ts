import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-mobile',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent {

  toggleMenu() {
    console.log('Menu lateral ou opções extras clicado!');
  }

}
