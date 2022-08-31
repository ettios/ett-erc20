// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Standard ERC20 token, with minting and pause functionality.
 *
 */
contract EttiosToken is ERC20 {
    uint8 customDecimals = 18;

    constructor(string memory name, string memory symbol,
        uint256 _initMint, uint8 _decimals) ERC20(name, symbol)
    {
        customDecimals = _decimals;
        //Send initially to deployer
        _mint(msg.sender, _initMint * (10**uint256(decimals())));
    }

    function decimals() public view virtual override returns (uint8) {
        return customDecimals;
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }
}
