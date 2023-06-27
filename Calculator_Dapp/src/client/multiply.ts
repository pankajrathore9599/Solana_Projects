import * as borsh from 'borsh';
import * as math from './math';

class MathStuffMultiply {
  value1: number;
  value2: number;
  product: number;
  constructor(fields: { value1: number; value2: number; product: number }) {
    this.value1 = fields.value1;
    this.value2 = fields.value2;
    this.product = fields.product;
  }
}

const MathStuffMultiplySchema = new Map([
  [MathStuffMultiply, { kind: 'struct', fields: [['value1', 'u32'], ['value2', 'u32'], ['product', 'u32']] }],
]);

const mathStuff = new MathStuffMultiply({ value1: 4, value2: 2, product: 0 });
const mathStuffData = borsh.serialize(MathStuffMultiplySchema, mathStuff);
const MATH_STUFF_SIZE = mathStuffData.length;

async function main() {
  await math.example('multiply', MATH_STUFF_SIZE);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
