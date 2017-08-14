export class Animation {
    static start() {
        Animation.isRunning = true;
        Animation._loop();
    }

    static stop() {
        Animation.isRunning = false;
    }

    static _loop() {
        Animation.fns.forEach(fn => fn());
        if (Animation.isRunning) {
            window.requestAnimationFrame(Animation._loop);
        }
    }

    static add(fn) {
        Animation.fns.push(fn);
    }

    static remove(fn) {
        Animation.fns.splice(Animation.fns.indexOf(fn), 1);
    }
}
Animation.isRunning = true;
Animation.fns = [];
Animation.start();