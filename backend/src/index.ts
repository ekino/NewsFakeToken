import express from 'express';
import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';

dotenv.config();

const cors = require('cors');

const app = express();
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

const corsOptions = {
    origin: ['http://localhost:3000', 'https://NewsFakeToken.com'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/mint', async (req, res) => {
    const json = req.body;

    if (!json) {
        res.status(500).json({ status: false, msg: 'no data provided' });
    } else {
        await pinata
            .testAuthentication()
            .catch((err: Error) => res.status(500).json(JSON.stringify(err)));

        const metadata = {
            name: req.body.title,
            decimals: 0,
            description: "FAKT NFT asset - don't trust, check facts!",
            isBooleanAmout: true,
            identifier: req.body.url,
            listOfSources: req.body.listNFTSources,
            symbol: 'FAKT',
            is_transferable: true,
            shouldPreferSymbol: false,
        };

        const pinnedMetadata = await pinata.pinJSONToIPFS(metadata);

        if (pinnedMetadata.IpfsHash && pinnedMetadata.PinSize > 0) {
            res.status(200).json({
                status: true,
                msg: {
                    metadataHash: pinnedMetadata.IpfsHash,
                },
            });
        } else {
            res.status(500).json({ status: false, msg: 'metadata were not pinned' });
        }
    }
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
