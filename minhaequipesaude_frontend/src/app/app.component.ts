import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { MenuDesktopComponent } from './components/menu-descktop/menu-desktop.component';
// import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuDesktopComponent, MenuMobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Minha Equipe de Saúde';
}
