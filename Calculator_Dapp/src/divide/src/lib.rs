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
pub struct MathStuffDivide {
    pub dividend: u32,
    pub divisor: u32,
    pub quotient: u32,
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

    let mut math_stuff = MathStuffDivide {
        dividend: 10,
        divisor: 2,
        quotient: 0,
    };

    math_stuff.quotient = math_stuff.dividend / math_stuff.divisor;
    math_stuff.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("The result of the division is: {}", math_stuff.quotient);

    Ok(())
}
