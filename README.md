# Distributed Infinity

Distributed Infinity is dapp used to loan any item to people you may not even know, and track it (and your profits) on the Ethereum blockchain. 

The vision: monetize any valuable object you own, physical or digital, into a recurring profit source. 

## Use Case

The inital use case is a distributed library for childerens' books in Ukrainian. Business case: buying and shipping books in Ukrainian is expensive. Solution: enable the local community of parents to exchange books during playgroups and other events. 

## Approach

A book owner establishes a contract with a borrower. The borrower puts up a collateral and a fee for borrowing a book for a set period of time. The borrower can then return the book and get the collateral back, or transfer the responsibility for the book to another parent. When this transaction takes place, the original borrower gets their collateral back, plus get paid finder's fee. The new borrower assumes the responsibility for the book by putting up the collateral and paying two fees: the borrower's fee to the book owner and the finder's fee. The cycle continues until the book is returned to the owner (and collateral is paid back to the last borrower) or there is an exception in the contract and the collateral is paid to the book owner.

## The Vision

Apply this thinking to any other object of value. For example, you have a tent that you use once a year. Rent it out and collect a fee. The finder's fee provides a strong financial incentive for the last borrower to find the next brorrower with zero action from the original owner. The prorated collateral reduces the risk of item loss. And here is an interesting twist. Let the last borrower  store your items at their location until it's rented out again. Now you don't have to worry about storing your inventory. The blockchain backbone provides sufficient privacy to the borrowers and the owners without losing track of the item status. 

## MVP

The initial MVP is just a simple contract between two parties. See the initial state machine. MVP + 1 is the ability to pass the item indefinitely. 

## Getting Started

At the current stage the code is just a shell with initial implementation of the smart contract. You can download the code and load it locally. No database hooks yet. These instructions will be updated as projects progresses.


### Installing

A step by step series of examples will be proided in the future

```
placeholder 1
```



## Running the tests

Once automated tests are in place, this section will be updated.

### Test Set 1

To be proided

```
Example to be provided
```


## Deployment

Insturctions to be provided.

## Built With

* [JavaScript](https://www.javascript.com) 
* [Truffle](http://truffleframework.com/) 
* [Solidity](https://solidity.readthedocs.io/en/develop/) 

## License

The project license TBD. All right reserved. Content is copyrighted.

## Acknowledgments

* Picked-up JavaScript from [Jonas Schmedtmann](https://twitter.com/jonasschmedtman).
