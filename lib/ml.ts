import * as tf from "@tensorflow/tfjs";

export async function trainExpenseModel(data: { amount: number; date: string }[]) {
  const xs = data.map((d, i) => i);
  const ys = data.map((d) => d.amount);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

  const xsTensor = tf.tensor2d(xs, [xs.length, 1]);
  const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

  await model.fit(xsTensor, ysTensor, { epochs: 100 });

  return model;
}

export async function predictExpense(model: tf.LayersModel, futureIndex: number) {
  const input = tf.tensor2d([futureIndex], [1, 1]);
  const prediction = model.predict(input) as tf.Tensor;
  return prediction.dataSync()[0];
}
