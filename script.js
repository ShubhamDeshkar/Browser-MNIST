window.addEventListener("load", () => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;

    function startPosition(e) {
        drawing = true;
        draw(e);
    }

    function endPosition() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!drawing) return;
        const canvasClient = canvas.getBoundingClientRect();
        ctx.lineWidth = 10;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX - canvasClient.left, e.clientY - canvasClient.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvasClient.left, e.clientY - canvasClient.top);
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", () => {
        window.navigator.vibrate(100);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const result = document.getElementById('result');
        result.innerHTML = "";
    });

    // code for mobile ;(
    canvas.addEventListener("touchstart", (e) => {
        const touchPoint = e.touches[0];
        canvas.dispatchEvent(new MouseEvent("mousedown", {
            clientX: touchPoint.clientX,
            clientY: touchPoint.clientY
        }));
    }, false);

    canvas.addEventListener("touchend", (e) => {
        canvas.dispatchEvent(new MouseEvent("mouseup", {}));
    }, false);

    canvas.addEventListener("touchmove", (e) => {
        const touchPoint = e.touches[0];
        canvas.dispatchEvent(new MouseEvent("mousedown", {
            clientX: touchPoint.clientX,
            clientY: touchPoint.clientY
        }));
    }, false);
})
