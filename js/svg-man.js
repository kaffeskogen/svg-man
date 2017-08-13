export class SvgMan {
    constructor(svg) {
        this.svg = svg;

        this._handleEvents()

        this.viewBox = {
            x: window.outerWidth,
            y: window.outerHeight
        };

        this.updateViewBox();
    }

    attr(name, val) {
        if (val) {
            return this.svg.setAttribute(name, val);
        }

        return this.svg.getAttribute(name);
    }

    updateViewBox() {
        this.attr('viewBox', `0 0 ${this.attr.x} ${this.attr.y}`);
    }

    _handleEvents() {
        this.svg.addEventListener('wheel', e=>this._onScroll(e), true);
    }

    _onScroll(evt) {
        if (evt.deltaY < 0) {
            this.viewBox.x *= 0.9;
            this.viewBox.y *= 0.9;
        }
    }
}