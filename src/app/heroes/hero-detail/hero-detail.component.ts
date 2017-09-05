import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../shared/hero';
import { HeroService } from '../../shared/hero.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(private route: ActivatedRoute, private location: Location, private heroService: HeroService) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id'))).subscribe(hero => this.hero = hero)
  }
  goBack(): void {
    this.location.back()
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

}
