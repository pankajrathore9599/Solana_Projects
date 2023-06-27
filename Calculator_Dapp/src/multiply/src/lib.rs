use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MathStuffMultiply {
    pub value1: u32,
    pub value2: u32,
    pub product: u32,
}

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    msg!("Debug output:");
    msg!("Account ID: {}", account.key);
    msg!("Executable?: {}", account.executable);
    msg!("Lamports: {:#?}", account.lamports);
    msg!("Debug output complete.");

    let mut math_stuff = MathStuffMultiply {
        value1: 4, // Set the first input value
        value2: 2, // Set the second input value
        product: 0, // The initial product value will be updated later
    };

    math_stuff.product = math_stuff.value1 * math_stuff.value2;
    math_stuff.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Current product is now: {}", math_stuff.product);

    Ok(())
}
