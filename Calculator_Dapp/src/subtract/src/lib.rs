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
pub struct MathStuffSubtract {
    pub value1: u32,
    pub value2: u32,
    pub result: u32,
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

    let mut math_stuff = MathStuffSubtract {
        value1: 7,
        value2: 3,
        result: 0,
    };

    math_stuff.result = math_stuff.value1 - math_stuff.value2;
    math_stuff.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("The result of the subtraction is: {}", math_stuff.result);

    Ok(())
}
