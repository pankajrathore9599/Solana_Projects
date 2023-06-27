import * as borsh from 'borsh';
import * as math from './math';

class MathStuffDivide {
  dividend: number;
  divisor: number;
  quotient: number;
  constructor(fields: { dividend: number; divisor: number; quotient: number }) {
    this.dividend = fields.dividend;
    this.divisor = fields.divisor;
    this.quotient = fields.quotient;
  }
}

const MathStuffDivideSchema = new Map([
  [MathStuffDivide, { kind: 'struct', fields: [['dividend', 'u32'], ['divisor', 'u32'], ['quotient', 'u32']] }],
]);

const mathStuff = new MathStuffDivide({ dividend: 10, divisor: 2, quotient: 0 });
const mathStuffData = borsh.serialize(MathStuffDivideSchema, mathStuff);
const MATH_STUFF_SIZE = mathStuffData.length;

async function main() {
  await math.example('divide', MATH_STUFF_SIZE);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
