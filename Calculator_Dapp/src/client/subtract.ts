import * as borsh from 'borsh';
import * as math from './math';

class MathStuffSubtract {
  value1: number;
  value2: number;
  result: number;
  constructor(fields: { value1: number; value2: number; result: number }) {
    this.value1 = fields.value1;
    this.value2 = fields.value2;
    this.result = fields.result;
  }
}

const MathStuffSubtractSchema = new Map([
  [MathStuffSubtract, { kind: 'struct', fields: [['value1', 'u32'], ['value2', 'u32'], ['result', 'u32']] }],
]);

const mathStuff = new MathStuffSubtract({ value1: 7, value2: 3, result: 0 });
const mathStuffData = borsh.serialize(MathStuffSubtractSchema, mathStuff);
const MATH_STUFF_SIZE = mathStuffData.length;

async function main() {
  await math.example('subtract', MATH_STUFF_SIZE);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
