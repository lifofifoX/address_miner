const { Worker, isMainThread, parentPort } = require('worker_threads')
const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const ecc = require('tiny-secp256k1')

const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc)

bitcoin.initEccLib(ecc)

// Vowels:  a,e,u
// Consonants: c,d,f,g,h,k,l,m,n,p,q,r,s,v,w,x,y,z
// Numbers: 9,8,2,5,4,0,3,7
const words = ["fuck", "rune"]

function generateTaprootAddress() {
  const mnemonic = bip39.generateMnemonic(128)
  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin)
  const path = "m/86'/0'/0'/0/0"
  const child = root.derivePath(path)

  const pubkey = child.publicKey.slice(1, 33) // x-only

  const { address } = bitcoin.payments.p2tr({ internalPubkey: pubkey, network: bitcoin.networks.bitcoin })
  return { address, mnemonic }
}

function checkAddress() {
  while (true) {
    const { address, mnemonic } = generateTaprootAddress()

    for (const word of words) {
      if (address.endsWith(word)) {
        console.log(`Mnemonic: ${mnemonic}: ${address}`)
      }
    }
  }
}

if (isMainThread) {
  const coreCount = require('os').cpus().length
  const threadsCount = Math.max(1, Math.floor(coreCount / 4))

  for (let i = 0; i < threadsCount; i++) {
    new Worker(__filename)
  }
} else {
  checkAddress()
}
