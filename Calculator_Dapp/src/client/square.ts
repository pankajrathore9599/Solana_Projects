import * as borsh from 'borsh';
import * as math from './math';

class MathStuffSquare {
  value: number;
  square: number;
  constructor(fields: { value: number; square: number }) {
    this.value = fields.value;
    this.square = fields.square;
  }
}

const MathStuffSquareSchema = new Map([
  [MathStuffSquare, { kind: 'struct', fields: [['value', 'u32'], ['square', 'u32']] }],
]);

const mathStuff = new MathStuffSquare({ value: 2, square: 0 });
const mathStuffData = borsh.serialize(MathStuffSquareSchema, mathStuff);
const MATH_STUFF_SIZE = mathStuffData.length;

async function main() {
  await math.example('square', MATH_STUFF_SIZE);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
