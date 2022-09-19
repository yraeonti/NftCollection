import styles from '../styles/Home.module.css'


export default function Buttons (props) {

   if(!props.walletConnected) {
    return (
        <button onClick={props.connectWallet} className={styles.button}>
          Connect your wallet
        </button>
    )
   }

   if(props.loading) {
     return <button className={styles.button}>Loading...</button>;
   }

   if(props.isOwner && !props.presaleStarted) {
    return (
        <button className={styles.button} onClick={props.startPresale}>
          Start Presale!
        </button>
      );
   }

   if(!props.presaleStarted) {
    return (
        <div>
          <div className={styles.description}>Presale hasnt started!</div>
        </div>
      )
   }

   if (props.presaleStarted && !props.presaleEnded) {
    return (
        <div>
          <div className={styles.description}>
            Presale has started!!! If your address is whitelisted, Mint a
            Crypto Dev 🥳
          </div>
          <button className={styles.button} onClick={props.preSaleMint}>
            Presale Mint 🚀
          </button>
        </div>
    )
   }

   if (props.presaleStarted && props.presaleEnded) {
    return (
        <button className={styles.button} onClick={props.publicMint}>
          Public Mint 🚀
        </button>
    )
   }
}

