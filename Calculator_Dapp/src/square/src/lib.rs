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
pub struct MathStuffSquare {
    pub value: u32,
    pub square: u32,
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

    let mut math_stuff = MathStuffSquare {
        value: 4, // Set the input value to 2
        square: 0, // The initial square value will be updated later
    };

    math_stuff.square = math_stuff.value * math_stuff.value;
    math_stuff.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Current square is now: {}", math_stuff.square);

    Ok(())
}
