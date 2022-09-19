import Head from 'next/head'
import Image from 'next/image'
import {Contract, providers, utils} from 'ethers'
import Web3Modal from 'web3modal'
import {abi, NFT_CONTRACT_ADDRESS} from "../constants"
import styles from '../styles/Home.module.css'
import {useWeb3} from "../utils"
import Buttons from '../components/buttons.jsx'

export default function Home() {


  const { tokenIdsMinted,
          walletConnected,
          loading,
          isOwner,
          presaleStarted,
          presaleEnded,
          startPresale,
          preSaleMint,
          connectWallet,
          publicMint
          
        } = useWeb3()

  return (
    <div>
      <Head>
        <title>Crypto Devs</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {tokenIdsMinted}/20 have been minted
          </div>
          
          <Buttons
            walletConnected={walletConnected}
            loading={loading}
            isOwner={isOwner}
            presaleStarted={presaleStarted}
            presaleEnded= {presaleEnded}
            startPresale={startPresale}
            preSaleMint={preSaleMint}
            connectWallet={connectWallet}
            publicMint={publicMint}
          />

        </div>
        <div>
          <img className={styles.image} src="./cryptodevs/0.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  )
}
