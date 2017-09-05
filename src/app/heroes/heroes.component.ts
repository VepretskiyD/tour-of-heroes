import { Component, OnInit } from '@angular/core';
import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  constructor(private heroService: HeroService, private router: Router){}
  ngOnInit() {
     this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  selectedHero: Hero;
  onSelectHero(hero: Hero): void{
    this.selectedHero = hero;
  }
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id])
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null;}
      });

}}
