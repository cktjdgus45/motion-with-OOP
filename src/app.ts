import { Component } from './components/component.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);









        const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(document.body);

            dialog.setOncloseListener(() => {
                dialog.removeFrom(document.body);
            })
            dialog.setOnsubmitListener(() => {
                const image = new ImageComponent(inputSection.title, inputSection.url);
                this.page.addChild(image);
                dialog.removeFrom(document.body);
            })
        })
        const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(document.body);

            dialog.setOncloseListener(() => {
                dialog.removeFrom(document.body);
            })
            dialog.setOnsubmitListener(() => {
                const video = new VideoComponent(inputSection.title, inputSection.url);
                this.page.addChild(video);
                dialog.removeFrom(document.body);
            })
        })
        const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(document.body);

            dialog.setOncloseListener(() => {
                dialog.removeFrom(document.body);
            })
            dialog.setOnsubmitListener(() => {
                const note = new NoteComponent(inputSection.title, inputSection.body);
                this.page.addChild(note);
                dialog.removeFrom(document.body);
            })
        })
        const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;
        todoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(document.body);

            dialog.setOncloseListener(() => {
                dialog.removeFrom(document.body);
            })
            dialog.setOnsubmitListener(() => {
                const todo = new TodoComponent(inputSection.title, inputSection.body);
                this.page.addChild(todo);
                dialog.removeFrom(document.body);
            })
        })
    }


}

new App(document.querySelector('.document')! as HTMLElement)