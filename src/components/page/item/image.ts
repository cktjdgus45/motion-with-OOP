import { BaseComponent } from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, url: string) {
        super(`
        <section class="image">
            <div class="image__holder"><img class="image__thumbnail"></div>
            <h2 class="page-item__title image__title"></h2>
        </section>`);
        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image__title')! as HTMLHeadElement;
        titleElement.textContent = title;
    }
    //attachTo는 부모에게 상속 , this.element 또한 부모에게 상속.
}