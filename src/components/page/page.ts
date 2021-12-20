import { BaseComponent, Component } from '../component.js';

export interface Composable {
    addChild(child: Component): void;
}
type OnCloseListner = () => void;

type SectionContainerConstructor = { //디펜던시 인젝션
    new(): SectionContainer;
}

type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListner): void;
}
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListner;
    private dragStateListner?: OnDragStateListener<PageItemComponent>;
    constructor() {
        super(`<li draggable="true" class="page-item">
                    <section class="page-item__body"></section>
                    <div class="page-item__controls">
                        <button class="close">&times;</button>
                    </div>
                </li>`);
        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        }
        this.element.addEventListener('dragstart', (event: DragEvent) => {
            this.onDragStart(event);
        })
        this.element.addEventListener('dragend', (event: DragEvent) => {
            this.onDragEnd(event);
        })
    }
    onDragStart(event: DragEvent) {
        this.notifyDragObservers('start')
    }
    onDragEnd(event: DragEvent) {
        this.notifyDragObservers('stop')
    }
    onDragEnter(event: DragEvent) {
        this.notifyDragObservers('enter')
    }
    onDragLeave(event: DragEvent) {
        this.notifyDragObservers('leave')
    }
    notifyDragObservers(state: DragState) {
        this.dragStateListner && this.dragStateListner(this, state);
    }
    addChild(child: Component) {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);
    }
    setOnCloseListener(listener: OnCloseListner) {
        this.closeListener = listener;
    }
    setOnDragStateListner(listener: OnDragStateListener<PageItemComponent>) {
        this.dragStateListner = listener;
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super('<ul class="page"></ul>')
        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        })
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        })
    }
    onDragOver(event: DragEvent) {
        event.preventDefault();
        console.log('dragover', event);
    }
    onDrop(event: DragEvent) {
        event.preventDefault();
        console.log('drop', event);
    }
    addChild(section: Component) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        })
    }

}