import {Contract, providers, utils} from 'ethers'
import {useEffect, useRef, useState} from 'react'
import Web3Modal from 'web3modal'
import {abi, NFT_CONTRACT_ADDRESS} from "../constants"


export const useWeb3 = () => {

const [walletConnected, setWalletConnected] = useState(false)

const [presaleStarted, setPresaleStarted] = useState(false)

const [presaleEnded, setPresaleEnded] = useState(false)

const [loading, setLoading] = useState(false)

const [isOwner, setIsOwner] = useState(false)

const [tokenIdsMinted, setTokenIdsMinted] = useState("0")

const web3ModalRef = useRef()

const nftContract = (providerOrSigner) => new Contract(
    NFT_CONTRACT_ADDRESS,
    abi,
    providerOrSigner
)


const getProviderOrSigner = async (needSigner = false) => {

    const provider = await web3ModalRef.current.connect()

    const web3Provider = new providers.Web3Provider(provider)

    const {chainId} = await web3Provider.getNetwork()

    if (chainId != 5) {
        window.alert("Change network to goerli")
        throw new Error('Change network to goerli')
    }

    if (needSigner) {
        const signer = web3Provider.getSigner()
        return signer
    }


    return web3Provider
}

const connectWallet = async () => {
    try {
        
        await getProviderOrSigner()
        setWalletConnected(true)
    } catch (error) {
        console.error(error);
    }
}

const preSaleMint = async () => {
    try {

        const signer = await getProviderOrSigner(true)

        const contract = nftContract(signer)

        const tx = await contract.presaleMint({
            value: utils.parseEther("0.01")
        })

        setLoading(true)

        await tx.wait()
        setLoading(false)
        window.alert("You successfully minted a Crypto Dev!")
    } catch (error) {
         console.error(error);
    }
}


const publicMint = async () => {
    try {

        const signer = await getProviderOrSigner(true)

        const contract = nftContract(signer)

        const tx = await contract.mint({
            value: utils.parseEther("0.01")
        })

        setLoading(true)

        await tx.wait()
        setLoading(false)
        window.alert("You successfully minted a Crypto Dev!")
    } catch (error) {
        console.error(error); 
    }
}

const startPresale = async () => {
    try {

        const signer = await getProviderOrSigner(true)

        const contract = nftContract(signer)

        const tx = await contract.startPresale()
        setLoading(true)

        await tx.wait()
        setLoading(false)

        await checkIfPresaleStarted()
    } catch (error) {
        console.error(error);
    }
}

const checkIfPresaleStarted = async () => {
    try {
        const provider = await getProviderOrSigner()

        const contract = nftContract(provider)

        const _presaleStarted = await contract.presaleStarted()

        if(!_presaleStarted) {
            await getOwner()
        }

        setPresaleStarted(_presaleStarted)
        return _presaleStarted

    } catch (error) {
        console.error(error);
        return false
    }
}


const checkIfPresaleEnded = async () => {
    try {

        const provider = await getProviderOrSigner()

        const contract = nftContract(provider)

        const _presaleEnded = await contract.presaleEnded()

        const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000))

        if(hasEnded) {
            setPresaleEnded(true)
        }else {
            setPresaleEnded(false)
        }

        return hasEnded
    } catch (error) {
        console.error(error);
        return false
    }
}

const getOwner = async () => {
    try {

        const provider = await getProviderOrSigner()

        const contract = nftContract(provider)

        const _owner = await contract.owner()

        const signer = await getProviderOrSigner(true)

        const address = await signer.getAddress()

        if (address.toLowerCase() === _owner.toLowerCase()) {
            setIsOwner(true)
        }
        
    } catch (error) {
        console.error(error);
    }
}

const getTokenIdsMinted = async () => {
    try {
        const provider = await getProviderOrSigner()

        const contract = nftContract(provider)

        const _tokenIds = await contract.tokenIds()

        setTokenIdsMinted(_tokenIds.toString())
    } catch (error) {
        console.error(error);
    }
}

const onPageLoad = async () => {
     connectWallet()

     const presaleStarted = await checkIfPresaleStarted()
     if(presaleStarted) {
        await checkIfPresaleEnded()
     }

     await getTokenIdsMinted()


     setInterval(async() => {
       await getTokenIdsMinted()
     }, 5000)


     const presaleEndedInterval = setInterval(async function () {
        const _presaleStarted = await checkIfPresaleStarted();
        if (_presaleStarted) {
          const _presaleEnded = await checkIfPresaleEnded();
          if (_presaleEnded) {
            clearInterval(presaleEndedInterval);
          }
        }
      }, 5000);
}

useEffect(() => {
    if(!walletConnected) {
        web3ModalRef.current = new Web3Modal({
            network: "goerli",
            providerOptions: {},
            disableInjectedProvider: false
        })
    }

     onPageLoad()
    
}, [walletConnected])

 return {
    tokenIdsMinted,
    walletConnected,
    loading,
    isOwner,
    presaleStarted,
    presaleEnded,
    connectWallet,
    startPresale,
    preSaleMint,
    publicMint
 }
}