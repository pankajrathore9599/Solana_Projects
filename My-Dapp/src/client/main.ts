import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js'

import fs from 'mz/fs';
import path from 'path';

// let's import our program keypair which we had build on rust on-chain.
const My_Program_Keypair = path.join(
    path.resolve(__dirname, '../../contract/program'),'program-keypair.json'
);

// Define Main function
async function main() {
    console.log("Hey, We are launching our Dapp.......")

    // Connecting to solana chain
    const local_RPC = new Connection('http://localhost:8899', 'confirmed');

    // Get our program public key
    const secretKeyString = await fs.readFile(My_Program_Keypair, {encoding: 'utf-8'});
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    const programKeypair = Keypair.fromSecretKey(secretKey);    
    let ProgramID: PublicKey = programKeypair.publicKey;

    // Geberating an account keypair to transact with our program
    const accountKeypair = Keypair.generate();
    const airdropRequest = await local_RPC.requestAirdrop(
        accountKeypair.publicKey,
        LAMPORTS_PER_SOL,
    );
    await local_RPC.confirmTransaction(airdropRequest);

    // Let's Execute Transaction with our program
    console.log("----------Calling Program ---------------")
    const Instruction = new TransactionInstruction({
        keys: [{pubkey: accountKeypair.publicKey, isSigner: false, isWritable:true}],
        programId: ProgramID,
        data: Buffer.alloc(0),
    });
    await sendAndConfirmTransaction(
        local_RPC,
        new Transaction().add(Instruction),
        [accountKeypair],
    );
}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);