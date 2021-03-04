const canvas_element = document.getElementById('canvas');
const ctx = canvas_element.getContext('2d');

async function loadModel() {
    return await tf.loadLayersModel('./model.json');
}

display_result = (number) => {
    document.getElementById('result').innerText = number;
}

invert_pixel_values = (tensor) => {
    const scalar_255 = tf.scalar(255);
    tensor = tf.abs(tensor.sub(scalar_255));
    return tensor;
}

min_max_scaling = (tensor) => {
    const min_value = -0.1;
    const max_value = 1.175;
    const offset = min_value;
    const total_values = 256;
    const multiplier = (max_value - min_value) / total_values;

    tensor = tensor.mul(tf.scalar(multiplier));
    tensor = tensor.add(tf.scalar(offset));
    return tensor;
}

const predict_button = document.getElementById('predict');
predict_button.addEventListener('click', () => {
    const image_data = ctx.getImageData(0, 0, 256, 256);
    const tf_image = tf.browser.fromPixels(image_data, 1);
    var tf_resized_image = tf.image.resizeBilinear(tf_image, [32, 32]);
    tf_resized_image = invert_pixel_values(tf_resized_image);
    tf_resized_image = min_max_scaling(tf_resized_image);
    tf_resized_image = tf_resized_image.reshape([1, 32, 32, 1]);

    loadModel().then(model => {
        const predictions = model.predict(tf_resized_image).dataSync();
        const number = tf.argMax(predictions).dataSync()[0];
        console.log(number);
        display_result(number);
    })
})