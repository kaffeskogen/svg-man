import { Animation } from './animation.js';

export class SvgMan {
    constructor(svg) {
        this.svg = svg;

        this._handleEvents()

        this.viewBox = {
            x1: 0,
            x2: window.innerWidth,
            y1: 0,
            y2: window.innerHeight
        };

        this.origninalMousePos = {
            x: 0,
            y: 0
        };
        this.currentMousePos = {
            x: 0,
            y: 0
        };

        this.updateViewBox();

        this.addRect();
        this.addCircle();
    }

    attr(name, val) {
        if (val) {
            return this.svg.setAttribute(name, val);
        }
        return this.svg.getAttribute(name);
    }

    addRect() {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', this.viewBox.x1 + 100);
        rect.setAttribute('y', this.viewBox.y1 + 100);
        rect.setAttribute('width', this.viewBox.x2 - 200);
        rect.setAttribute('height', this.viewBox.y2 - 200);
        rect.setAttribute('fill', '#fff');
        this.svg.appendChild(rect);
    }

    addCircle() {
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        let xMid = this.width / 2;
        let yMid = this.height / 2;
        circle.setAttribute('cx', Math.round(xMid));
        circle.setAttribute('cy', Math.round(yMid));
        circle.setAttribute('r', '100');
        circle.setAttribute('fill', 'red');
        this.svg.appendChild(circle);
    }

    updateViewBox() {
        this.width = this.viewBox.x2 - this.viewBox.x1;
        this.height = this.viewBox.y2 - this.viewBox.y1;

        let x1 = Math.round(this.viewBox.x1 * 100) / 100;
        let x2 = Math.round(this.viewBox.x2 * 100) / 100;
        let y1 = Math.round(this.viewBox.y1 * 100) / 100;
        let y2 = Math.round(this.viewBox.y2 * 100) / 100;

        this.attr('viewBox', `${x1} ${y1} ${x2} ${y2}`);
    }

    on(name, fn) {
        return this.svg.addEventListener(name, fn.bind(this), true);
    }

    off(name, fn) {
        return this.svg.removeEventListener(name, fn.bind(this), true);
    }

    _handleEvents() {
        this.on('wheel', this._onScroll);
        this.on('mousedown', this._onMouseDown);
        this.on('mouseup', this._onMouseUp);
        this.on('mousemove', this._onMouseMove);
    }

    _update() {
        let xVal = this.currentMousePos.x - this.origninalMousePos.x;
        let yVal = this.currentMousePos.y - this.origninalMousePos.y;

        this.origninalMousePos.x += xVal;
        this.origninalMousePos.y += yVal;

        xVal = xVal / window.outerWidth;
        yVal = yVal / window.outerHeight;

        this.viewBox.x1 -= xVal * this.width;
        this.viewBox.x2 -= xVal * this.width;
        this.viewBox.y1 -= yVal * this.height;
        this.viewBox.y2 -= yVal * this.height;


        this.updateViewBox();

    }

    _onMouseDown(evt) {
        this.mouseDown = true;

        this.origninalMousePos = {
            x: evt.clientX,
            y: evt.clientY
        };
        this.currentMousePos = {
            x: evt.clientX,
            y: evt.clientY
        };

        Animation.add(this._update.bind(this));
    }

    _onMouseMove(evt) {
        this.currentMousePos = {
            x: evt.clientX,
            y: evt.clientY
        };
    }

    _onMouseUp(evt) {
        Animation.remove(this._update.bind(this));
    }

    _onScroll(evt) {
        let xVal = this.width * 0.1;
        let yVal = this.height * 0.1;

        let xRel = 1 - evt.clientX / window.innerWidth;
        let yRel = 1 - evt.clientY / window.innerHeight;

        if (evt.deltaY < 0) {
            xVal *= -1;
            yVal *= -1;

            xRel = 1 - xRel;
            yRel = 1 - yRel;
        }

        this.viewBox.x1 -= (xVal * xRel);
        this.viewBox.x2 += (xVal * (1 - xRel));
        this.viewBox.y1 -= (yVal * yRel);
        this.viewBox.y2 += (yVal * (1 - yRel));

        this.updateViewBox();
    }
}