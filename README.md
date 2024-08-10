# Taproot Address Miner

This Node.js script generates Bitcoin Taproot addresses and checks if the generated address ends with any specified words. It uses parallel processing to speed up the mining process by leveraging multiple CPU cores.

## Prerequisites

- **Node.js** (v12 or later)
- **npm** (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone git@github.com:lifofifoX/address_miner.git
cd address_miner
```

### 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
````

The following dependencies will be installed:

- **bitcoinjs-lib**
- **bip39**
- **tiny-secp256k1**
- **bip32**

### 3. Run the Script

To start the address generation script, run:

```bash
node mine.js
```

The script will continuously generate Bitcoin Taproot addresses in parallel and check if any generated addresses end with the specified words.
