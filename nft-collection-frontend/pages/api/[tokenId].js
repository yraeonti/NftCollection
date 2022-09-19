
export default async function tokenUri(req, res) {
    const tokenId = req.query.tokenId
    
    const name = `Crypto Zakks ${tokenId}`

    const description = "A breeding cacoon of complex embryos"

    const image = `http://localhost:3000/CryptoDevs/${tokenId - 1}.svg`

    const attributes = [
                        {
                        "trait_type": "Base", 
                        "value": "comodo"
                        }, 
                        {
                        "trait_type": "Eyes", 
                        "value": "Ice"
                        },
                        {
                            "display_type": "boost_percentage", 
                            "trait_type": "Stamina Increase", 
                            "value": 10
                          }
                       ]


    res.status(200).json({
        name,
        description,
        image,
        attributes
    })
}